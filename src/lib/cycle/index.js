import moment from 'moment';
import { OVULATION_DAY_NO, FORMAT } from '../../constants/cycle';
import {
  getUserAllPeriodDays,
  getProfileData,
  getLastPeriodDate,
  setLastPeriodDate,
  setBleedingDays,
} from '../database/query';
const today = moment();

export default class CycleModule {
  lastPeriodDate;
  avgCycleLength;
  avgPeriodLength;

  constructor() {
    getProfileData().then((profileData) => {
      console.log('databse pure data', profileData);
      this.lastPeriodDate = profileData.last_period_date
        ? moment(profileData.last_period_date)
        : null;
      this.avgCycleLength = profileData.avg_cycle_length;
      this.avgPeriodLength = profileData.avg_period_length;
    });
  }
  periodDayNumber() {
    if (!this.lastPeriodDate) {
      return;
    }
    return today.diff(this.lastPeriodDate, 'days');
  }
  cycleDayNumber() {
    if (!this.lastPeriodDate) {
      return;
    }
    console.log('cycle day number', today, this.lastPeriodDate.format(FORMAT));
    return today.diff(this.lastPeriodDate, 'days');
  }
  determineCyclePhase() {
    const cycleDayNo = this.cycleDayNumber();
    console.log(
      'internal cycle phase',
      cycleDayNo,
      this.avgPeriodLength,
      this.avgCycleLength,
    );
    switch (true) {
      case !cycleDayNo: {
        return 0;
      }
      case cycleDayNo < this.avgPeriodLength && cycleDayNo > 0: {
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
        return 'Unknown phase';
    }
  }
  determinePhaseText() {
    const phase = this.determineCyclePhase();
    console.log('phase', phase);
    switch (phase) {
      // case 0: {
      //   return 'تاریخ آخرین پریود خود را وارد کنید تا بتوانیم تحلیل درستی از دوره‌هایتان را نمایش دهیم.';
      // }
      case 1: {
        const dayNo = this.periodDayNumber();
        return `روز ${dayNo} پریود`;
      }
      case 2: {
        const daysTo = this.remainingDaysToOvulation();
        return `${daysTo} روز به تخمک گذاری`;
      }
      case 3: {
        const daysNo = this.remainingDaysToNextPeriod();
        return `${daysNo} روز به پریود بعدی`;
      }
      case 4: {
        const days = this.remainingDaysToNextPeriod();
        return `${days} روز پریود شما دیر شده است.`;
      }
      default:
        return 'دوره ماهانه در یک نگاه';
    }
  }
  nextPeriodDate(lastPeriodDate) {
    if (!lastPeriodDate) {
      return;
    }
    return moment(lastPeriodDate)
      .add(this.avgCycleLength, 'days')
      .format(FORMAT);
  }
  remainingDaysToNextPeriod() {
    const pd = this.nextPeriodDate(this.lastPeriodDate);
    if (!pd) {
      return;
    }
    return moment(pd).diff(today, 'days');
  }
  nextOvulationDate(lastPeriodDate) {
    if (!lastPeriodDate) {
      return;
    }
    return moment(lastPeriodDate).add(OVULATION_DAY_NO, 'days').format(FORMAT);
  }
  remainingDaysToOvulation() {
    const ov = this.nextOvulationDate(this.lastPeriodDate);
    if (!ov) {
      return;
    }
    return moment(ov).diff(today, 'days');
  }
  determineOvulationWindow(lastPeriodDate) {
    let window = [];
    const od = this.nextOvulationDate(lastPeriodDate);
    if (!od) {
      return [];
    }
    //Based on Flo ovulation calculation,
    //I considered ovulation window from 6 day before ovulation day and a day after that
    const firstDay = moment(od).subtract(6, 'days').format(FORMAT);
    for (let i = 0; i < 7; i++) {
      window.push(moment(firstDay).add(i, 'days').format(FORMAT));
    }
    return window;
  }
  perdictedPeriodDaysInCurrentYear() {
    let days = [];
    let perdictedPeriodDate = this.nextPeriodDate(this.lastPeriodDate);
    if (!perdictedPeriodDate) {
      return [];
    }
    for (let i = 0; i < 12; i++) {
      days = [
        ...days,
        ...this.determineFutureBleedingDays(perdictedPeriodDate),
      ];
      perdictedPeriodDate = this.nextPeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  perdictedOvulationDaysInCurrentYear() {
    let days = this.determineOvulationWindow(this.lastPeriodDate);
    let perdictedPeriodDate = this.nextPeriodDate(this.lastPeriodDate);
    // console.log('perdicted ov', perdictedPeriodDate);
    if (!perdictedPeriodDate) {
      return [];
    }
    for (let i = 0; i < 12; i++) {
      days = [...days, ...this.determineOvulationWindow(perdictedPeriodDate)];
      perdictedPeriodDate = this.nextPeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  determineFutureBleedingDays(lastPeriodDate) {
    let days = [];
    for (let i = 0; i < this.avgPeriodLength; i++) {
      days.push(moment(lastPeriodDate).add(i, 'days').format(FORMAT));
    }
    return days;
  }
  async pastBleedingDays() {
    const all = await getUserAllPeriodDays();
    return all.map((d) => moment(d.date)).sort((a, b) => b.diff(a));
  }
  async determineLastPeriodDate() {
    const pervLastPeriodDate = await getLastPeriodDate();
    const pastBleedingDays = await this.pastBleedingDays();
    let lpd;
    for (let i = 0; i < pastBleedingDays.length - 1; i++) {
      if (pastBleedingDays[i].diff(pastBleedingDays[i + 1], 'days') > 5) {
        lpd = pastBleedingDays[i];
        break;
      }
    }
    if (
      !pervLastPeriodDate ||
      (pervLastPeriodDate && pervLastPeriodDate !== lpd)
    ) {
      console.log(
        'cond',
        !pervLastPeriodDate ||
          (pervLastPeriodDate && pervLastPeriodDate !== lpd),
      );
      setLastPeriodDate(lpd);
    }
    return lpd;
  }
  setFirstPeriod(plength, lpDate) {
    if (!plength || !lpDate) {
      return;
    }
    let days = [];
    for (let i = 0; i < plength; i++) {
      days.push(moment(lpDate).add(i, 'days').format(FORMAT));
    }
    console.log('fist per', days);
    setBleedingDays(days);
  }
}
