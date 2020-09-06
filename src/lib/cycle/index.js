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

export default async function CycleModule() {
  const pdata = await getProfileData();
  console.log('databse pure data', pdata);
  const lastPeriodDate = pdata.last_period_date
    ? moment(pdata.last_period_date)
    : null;
  const avgCycleLength = pdata.avg_cycle_length;
  const avgPeriodLength = pdata.avg_period_length;

  function periodDayNumber() {
    if (!lastPeriodDate) {
      return;
    }
    return today.diff(lastPeriodDate, 'days');
  }
  function cycleDayNumber() {
    if (!lastPeriodDate) {
      return;
    }
    console.log('cycle day number', today, lastPeriodDate.format(FORMAT));
    return today.diff(lastPeriodDate, 'days');
  }
  function determineCyclePhase() {
    const cycleDayNo = cycleDayNumber();
    console.log(
      'internal cycle phase',
      cycleDayNo,
      avgPeriodLength,
      avgCycleLength,
    );
    switch (true) {
      case !cycleDayNo: {
        return 0;
      }
      case cycleDayNo < avgPeriodLength && cycleDayNo > 0: {
        return 1;
      }
      case avgPeriodLength < cycleDayNo && cycleDayNo < OVULATION_DAY_NO: {
        return 2;
      }
      case cycleDayNo > OVULATION_DAY_NO && cycleDayNo < avgCycleLength: {
        return 3;
      }
      case avgCycleLength < cycleDayNo: {
        return 4;
      }
      default:
        return 'Unknown phase';
    }
  }
  function determinePhaseText() {
    const phase = determineCyclePhase();
    console.log('phase', phase);
    switch (phase) {
      // case 0: {
      //   return 'تاریخ آخرین پریود خود را وارد کنید تا بتوانیم تحلیل درستی از دوره‌هایتان را نمایش دهیم.';
      // }
      case 1: {
        const dayNo = periodDayNumber();
        return `روز ${dayNo} پریود`;
      }
      case 2: {
        const daysTo = remainingDaysToOvulation();
        return `${daysTo} روز به تخمک گذاری`;
      }
      case 3: {
        const daysNo = remainingDaysToNextPeriod();
        return `${daysNo} روز به پریود بعدی`;
      }
      case 4: {
        const days = remainingDaysToNextPeriod();
        return `${days} روز پریود شما دیر شده است.`;
      }
      default:
        return 'دوره ماهانه در یک نگاه';
    }
  }
  function nextPeriodDate(pdate) {
    if (!pdate) {
      return;
    }
    return moment(pdate).add(avgCycleLength, 'days').format(FORMAT);
  }
  function remainingDaysToNextPeriod() {
    const pd = nextPeriodDate(lastPeriodDate);
    if (!pd) {
      return;
    }
    return moment(pd).diff(today, 'days');
  }
  function nextOvulationDate(pdate) {
    if (!pdate) {
      return;
    }
    return moment(pdate).add(OVULATION_DAY_NO, 'days').format(FORMAT);
  }
  function remainingDaysToOvulation() {
    const ov = nextOvulationDate(lastPeriodDate);
    if (!ov) {
      return;
    }
    return moment(ov).diff(today, 'days');
  }
  function determineOvulationWindow(pdate) {
    let window = [];
    const od = nextOvulationDate(pdate);
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
  function perdictedPeriodDaysInCurrentYear() {
    let days = [];
    let perdictedPeriodDate = nextPeriodDate(lastPeriodDate);
    if (!perdictedPeriodDate) {
      return [];
    }
    for (let i = 0; i < 12; i++) {
      days = [...days, ...determineFutureBleedingDays(perdictedPeriodDate)];
      perdictedPeriodDate = nextPeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  function perdictedOvulationDaysInCurrentYear() {
    let days = determineOvulationWindow(lastPeriodDate);
    let perdictedPeriodDate = nextPeriodDate(lastPeriodDate);
    // console.log('perdicted ov', perdictedPeriodDate);
    if (!perdictedPeriodDate) {
      return [];
    }
    for (let i = 0; i < 12; i++) {
      days = [...days, ...determineOvulationWindow(perdictedPeriodDate)];
      perdictedPeriodDate = nextPeriodDate(perdictedPeriodDate);
    }
    return days;
  }
  function determineFutureBleedingDays(pdate) {
    let days = [];
    for (let i = 0; i < avgPeriodLength; i++) {
      days.push(moment(pdate).add(i, 'days').format(FORMAT));
    }
    return days;
  }
  async function pastBleedingDays() {
    const all = await getUserAllPeriodDays();
    if (all.length > 0) {
      return all.map((d) => moment(d.date)).sort((a, b) => b.diff(a));
    }
  }
  async function determineLastPeriodDate() {
    const pervLastPeriodDate = await getLastPeriodDate();
    const past = await pastBleedingDays();
    if (!past) return null;
    let lpd;
    for (let i = 0; i < past.length - 1; i++) {
      if (past[i].diff(past[i + 1], 'days') > 5) {
        lpd = past[i];
        break;
      }
    }
    if (
      !pervLastPeriodDate ||
      (pervLastPeriodDate && pervLastPeriodDate !== lpd)
    ) {
      console.log('lpd', lpd);
      setLastPeriodDate(lpd);
    }
    return lpd;
  }
  function setFirstPeriod(plength, lpDate) {
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
  return {
    determinePhaseText,
    perdictedPeriodDaysInCurrentYear,
    perdictedOvulationDaysInCurrentYear,
    pastBleedingDays,
    determineLastPeriodDate,
    setFirstPeriod,
  };
}
