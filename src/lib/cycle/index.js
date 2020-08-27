import moment from 'moment';
import { OVULATION_DAY_NO } from '../../constants/cycle';
import {
  getProfileData,
  getLastPeriodDate,
  setLastPeriodDate,
  setPeriod,
} from '../database/query';

export default class CycleModule {
  constructor() {
    getProfileData().then((profileData) => {
      this.lastPeriodDate = moment(profileData.last_period_date);
      this.avgCycleLength = profileData.avg_cycle_length;
      this.avgPeriodLength = profileData.avg_period_length;
    });
  }

  determineCyclePhase(date) {
    const cycleDayNo = this.cycleDayNumber(date);
    console.log('ffff', cycleDayNo, this.avgPeriodLength);
    switch (true) {
      case cycleDayNo < this.avgPeriodLength: {
        return 1;
      }
      case this.avgPeriodLength < cycleDayNo && cycleDayNo < OVULATION_DAY_NO: {
        return 2;
      }
      case cycleDayNo > OVULATION_DAY_NO && cycleDayNo < this.avgCycleLength: {
        return 3;
      }
      case this.avgCycleLength < cycleDayNo: {
        return 4;
      }
      default:
        return 'Hello from nothingssssss!';
    }
  }
  determinePhaseText(date) {
    const phase = this.determineCyclePhase(date);
    switch (phase) {
      case 1: {
        const dayNo = this.periodDayNumber(date);
        return `روز ${dayNo} پریود`;
      }
      case 2: {
        const daysTo = this.remainingDaysToOvulation(date);
        return `${daysTo} روز به تخمک گذاری`;
      }
      case 3: {
        const daysNo = this.remainingDaysToNextPeriod(date);
        return `${daysNo} روز به پریود بعدی`;
      }
      case 4: {
        const days = this.remainingDaysToNextPeriod(date);
        return `${days} روز پریود شما دیر شده است.`;
      }
      default:
        return 'دوره ماهانه در یک نگاه';
    }
  }
  periodDayNumber(date) {
    return date.diff(this.lastPeriodDate, 'days');
  }
  cycleDayNumber(date) {
    return date.diff(this.lastPeriodDate, 'days');
  }
  nextPeriodDate() {
    return this.lastPeriodDate
      .add(this.avgCycleLength, 'days')
      .format('YYYY-MM-DD');
  }
  nextRelativePeriodDate(date) {
    return moment(date).add(this.avgCycleLength, 'days').format('YYYY-MM-DD');
  }
  remainingDaysToNextPeriod(date) {
    return date.diff(this.nextPeriodDate(), 'days');
  }
  nextOvulationDate() {
    return this.lastPeriodDate.add(OVULATION_DAY_NO, 'days');
  }
  nextRelativeOvulationDate(date) {
    return moment(date).add(OVULATION_DAY_NO, 'days');
  }
  remainingDaysToOvulation(date) {
    return this.nextOvulationDate().diff(date, 'days');
  }
  determineOvulationWindow() {
    let window = [];
    const od = this.nextOvulationDate();
    const firstDay = od.subtract(6, 'days').format('YYYY-MM-DD');
    for (let i = 0; i < 7; i++) {
      window.push(moment(firstDay).add(i, 'days').format('YYYY-MM-DD'));
    }
    return window;
  }
  determineRelativeOvulationWindow(date) {
    let window = [];
    const od = this.nextRelativeOvulationDate(date);
    const firstDay = od.subtract(6, 'days').format('YYYY-MM-DD');
    for (let i = 0; i < 7; i++) {
      window.push(moment(firstDay).add(i, 'days').format('YYYY-MM-DD'));
    }
    return window;
  }
  bleedingDaysFrom(date) {
    let days = [];
    for (let i = 0; i < this.avgPeriodLength; i++) {
      days.push(moment(date).add(i, 'days').format('YYYY-MM-DD'));
    }
    return days;
  }
  perdictedPeriodDaysInCurrentYear() {
    let days = [];
    let perdictedPeriodDate = this.nextPeriodDate();
    for (let i = 0; i < 12; i++) {
      days = [...days, ...this.bleedingDaysFrom(perdictedPeriodDate)];
      perdictedPeriodDate = this.nextRelativePeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  perdictedOvulationDaysInCurrentYear() {
    let days = [];
    let perdictedPeriodDate = this.nextPeriodDate();
    for (let i = 0; i < 12; i++) {
      days = [
        ...days,
        ...this.determineRelativeOvulationWindow(perdictedPeriodDate),
      ];
      perdictedPeriodDate = this.nextRelativePeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  async determineLastPeriodDate(date) {
    const d = await getLastPeriodDate();
    const diff = moment(date).diff(moment(d), 'days');
    if (diff > this.avgPeriodLength + 5 || (diff < 0 && diff > -3)) {
      setLastPeriodDate(date);
    }
  }
  setFirstPeriod(plength, lpDate) {
    let days = [];
    for (let i = 0; i < plength; i++) {
      days.push(moment(lpDate).add(i, 'days').format('YYYY-MM-DD'));
    }
    console.log('fist per', days);
    setPeriod(days);
  }
}
