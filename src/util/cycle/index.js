import moment from 'moment';
import jalaali from 'moment-jalaali';

import {
  OVULATION_DAY_NO,
  FORMAT,
  MIN_LENGTH_BETWEEN_PERIODS,
  OVULATION_WINDOW_LENGTH,
  PERIOD_LENGTH,
  PMS_LENGTH,
} from '../../constants/cycle';
import {
  getUserAllPeriodDays,
  getProfileData,
  getLastPeriodDate,
  setLastPeriodDate,
  setBleedingDays,
  getUserAllBleedingDays,
  getCycleSpottingDays,
} from '../database/query';
const today = moment();
// momentjs won't perform verywell and sometimes retruns inconsistant data!
// so I had to use many transform from string to moment object or vice versa

export default async function CycleModule() {
  const pdata = await getProfileData();
  console.log('databse pure data', pdata);
  const lastPeriodDate = pdata.last_period_date
    ? moment(pdata.last_period_date)
    : null;
  const avgCycleLength = pdata.avg_cycle_length;
  const avgPeriodLength = pdata.avg_period_length;
  const pmsLength = pdata.pms_length ?? PMS_LENGTH;
  const isPregnant = pdata.pregnant;

  function periodDayNumber(date) {
    if (!lastPeriodDate) {
      return;
    }
    return Math.abs(date.diff(lastPeriodDate, 'days'));
  }
  function cycleDayNumber(date) {
    if (!lastPeriodDate) {
      return;
    }
    console.log('cycle day number', lastPeriodDate.format(FORMAT));
    return date
      .clone()
      .startOf('day')
      .diff(lastPeriodDate.clone().startOf('day'), 'days', false);
  }
  function determineCyclePhase(date) {
    const cycleDayNo = cycleDayNumber(date);
    console.log(
      'internal cycle phase',
      cycleDayNo,
      avgPeriodLength,
      avgCycleLength,
    );
    switch (true) {
      case cycleDayNo < 0: {
        return -1;
      }
      case !cycleDayNo && cycleDayNo !== 0: {
        return 0;
      }
      case cycleDayNo < avgPeriodLength && cycleDayNo >= 0: {
        return 1;
      }
      case avgPeriodLength <= cycleDayNo && cycleDayNo <= OVULATION_DAY_NO: {
        return 2;
      }
      case (cycleDayNo > OVULATION_DAY_NO && cycleDayNo < avgCycleLength) ||
        cycleDayNo === avgCycleLength: {
        return 3;
      }
      case avgCycleLength < cycleDayNo: {
        return 4;
      }
      default:
        return 'Unknown phase';
    }
  }
  function determinePhaseSentence(date, isTeenager) {
    let phase = determineCyclePhase(date);
    if (isTeenager && phase === 2) phase = 3; // teenager user dont need ovulation data
    const dayNo = cycleDayNumber(date);
    console.log('phase', phase);
    switch (phase) {
      case -1: {
        return { mainSentence: 'دوره قبلی' }; //todo: should find past cycle first period day.
      }
      case 0: {
        return {
          mainSentence: 'تاریخ آخرین پریود خود را وارد کنید',
          // subSentence: 'تا بتوانیم تحلیل درستی از',
          // thirdSentence: 'دوره‌هایتان را نمایش دهیم.',
        };
      }
      case 1: {
        const pDayNo = periodDayNumber(date);
        return {
          mainSentence: `روز ${pDayNo + 1} پریود`,
          subSentence: 'کمترین احتمال بارداری',
          thirdSentence: `روز ${dayNo + 1} دوره`,
        };
      }
      case 2: {
        const daysTo = remainingDaysToOvulation(date);
        return {
          mainSentence:
            daysTo === 0
              ? 'روز اوج تخمک‌گذاری!'
              : `${daysTo} روز به اوج تخمک‌گذاری`,
          subSentence:
            daysTo === 0 ? 'بیشترین احتمال بارداری' : 'احتمال بارداری',
          thirdSentence: `روز ${dayNo + 1} دوره`,
        };
      }
      case 3: {
        const daysNo = remainingDaysToNextPeriod(date);
        return {
          mainSentence:
            daysNo === 0
              ? 'امروز روز پریود شماست'
              : `${daysNo} روز به پریود بعدی`,
          subSentence: 'احتمال بارداری',
          thirdSentence: `روز ${dayNo + 1} دوره`,
        };
      }
      case 4: {
        const days = Math.abs(remainingDaysToNextPeriod(date));
        return {
          mainSentence: `${days} روز پریود عقب افتاده.`,
          subSentence: `روز ${dayNo + 1} دوره`,
        };
      }
      default:
        return 'دوره ماهانه در یک نگاه';
    }
  }
  function nextPeriodDate(pdate) {
    if (isPregnant) return '';
    if (!pdate && !lastPeriodDate) {
      console.log('no last period date is available');
      return;
    } else if (!pdate) {
      pdate = lastPeriodDate;
    }
    return moment(pdate).add(avgCycleLength, 'days').format(FORMAT);
  }
  function remainingDaysToNextPeriod(date) {
    const pd = nextPeriodDate(lastPeriodDate);
    if (!pd) {
      return;
    }
    return moment(pd).diff(date, 'days');
  }
  function nextOvulationDate(pdate) {
    if (!pdate && !lastPeriodDate) {
      console.log('no last period date is available');
      return;
    } else if (!pdate) {
      pdate = lastPeriodDate;
    }
    return moment(pdate).add(OVULATION_DAY_NO, 'days').format(FORMAT);
  }
  function remainingDaysToOvulation(date) {
    const ov = nextOvulationDate(lastPeriodDate);
    if (!ov) {
      return;
    }
    return moment(ov).diff(date, 'days');
  }
  function determineOvulationWindow(pdate) {
    let window = [];
    const od = nextOvulationDate(pdate);
    if (!od) {
      return [];
    }
    // I considered ovulation window from 3 days before ovulation day and 3 days after that.
    // day 11 till 17 of cycle for normal periods
    const firstDay = moment(od).subtract(4, 'days').format(FORMAT);
    for (let i = 0; i < OVULATION_WINDOW_LENGTH; i++) {
      window.push(moment(firstDay).add(i, 'days').format(FORMAT));
    }
    const corrected = correct2farvardin(window);
    return corrected;
  }
  function perdictedPeriodDaysInCurrentYear() {
    if (isPregnant) return [];
    let days = [];
    let perdictedPeriodDate = nextPeriodDate(lastPeriodDate);
    console.log('perdicted', perdictedPeriodDate);
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
    if (isPregnant) return [];
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
    const corrected = correct2farvardin(days);
    return corrected;
  }
  function correct2farvardin(days) {
    const duplicate = days.filter((item, index) => {
      return days.indexOf(item) !== index;
    });
    if (duplicate.length === 1 && duplicate[0] === '2021-03-21') {
      days.push('2021-03-22');
    }
    return days;
  }
  function nextPmsDate() {
    if (!lastPeriodDate) {
      return;
    }
    return moment(lastPeriodDate)
      .add(avgCycleLength - pmsLength, 'days')
      .format(FORMAT);
  }
  ////// this function will return an object with 2 property: date, type.
  ////// date is in moment format and also sorted DESC.
  async function pastBleedingDays() {
    const all = await getUserAllBleedingDays();
    // will return all bleeding days in json {date: string with 'YYYY-MM-DD' format, tracking_option_id: number}.
    // console.log('all', all);
    if (all.length > 0) {
      return all
        .map((d) => {
          return { date: moment(d.date), type: d.tracking_option_id };
        })
        .sort((a, b) => b.date.diff(a.date));
    }
  }
  async function pastPeriodDays() {
    const all = await getUserAllPeriodDays();
    if (all.length > 0) {
      return all.map((d) => moment(d.date)).sort((a, b) => b.diff(a));
    }
  }
  async function determineLastPeriodDate() {
    const pervLastPeriodDate = await getLastPeriodDate();
    const prevPeriodDays = await pastPeriodDays();
    if (!prevPeriodDays) {
      setLastPeriodDate(null);
      return;
    }
    console.log('prevPeriodDays', prevPeriodDays);

    let lpd;
    for (let i = 0; i < prevPeriodDays.length; i++) {
      if (!prevPeriodDays[i + 1]) {
        lpd = prevPeriodDays[i];
      } else if (
        prevPeriodDays[i].diff(prevPeriodDays[i + 1], 'days') >
        MIN_LENGTH_BETWEEN_PERIODS
      ) {
        lpd = prevPeriodDays[i];
        break;
      }
    }
    if (!lpd) {
      return;
    }
    if (!pervLastPeriodDate || pervLastPeriodDate !== lpd) {
      console.log('last period date', lpd);
      setLastPeriodDate(lpd);
    }
    return lpd;
  }

  function setFirstPeriod(plength = PERIOD_LENGTH, lpDate) {
    if (!lpDate) {
      return;
    }
    let days = [];
    for (let i = 0; i < plength; i++) {
      days.push(moment(lpDate).add(i, 'days').format(FORMAT));
    }
    console.log('fist period', days);
    setBleedingDays(days);
  }

  async function determinePeriodIntervals() {
    const prevPeriodDays = await pastPeriodDays();
    let intervals = [];
    for (let i = 0; i <= prevPeriodDays.length; i++) {
      if (!prevPeriodDays[i + 1]) {
        intervals.push(prevPeriodDays.splice(0, i + 1));
        return intervals;
      }
      if (
        prevPeriodDays[i].diff(prevPeriodDays[i + 1], 'days') >
        MIN_LENGTH_BETWEEN_PERIODS
      ) {
        intervals.push(prevPeriodDays.splice(0, i + 1));
        i = -1; // when we splice an array its index will reset.
      }
    }
  }
  async function determineCyclesStartDate() {
    const intervals = await determinePeriodIntervals();
    let cyclesStartDay = [];
    intervals.forEach((interval) => {
      cyclesStartDay.push(cycleStartDate(interval));
    });
    return cyclesStartDay;
  }
  function cycleStartDate(interval) {
    // since each interval array is sorted, I consider last element as first {period/cycle} day.
    // If the sort changed, we should find earlier day in interval array using moment.min().
    // so interval[interval.length - 1] will change to moment.min(interval).
    return {
      startDay: moment(interval[interval.length - 1]).format(FORMAT),
      bleedingDays: interval,
    };
  }
  // important todo: should review these functions.
  async function determineCyclesDetail() {
    const cyclesStartDay = await determineCyclesStartDate();
    let cycles = [];
    for (let i = cyclesStartDay.length - 1; i >= 0; i--) {
      if (!cyclesStartDay[i - 1]) {
        cycles.push({
          ...cyclesStartDay[i],
          length: today.diff(cyclesStartDay[i].startDay, 'days'),
        });
        const spottingDays = await getCycleSpottingDays(
          cyclesStartDay[i].startDay,
          today.format(FORMAT),
        );
        cyclesStartDay[i].bleedingDays.push(
          ...spottingDays.map((s) => moment(s.date)),
        );
        return cycles;
      }
      cycles.push({
        ...cyclesStartDay[i],
        endDay: moment(cyclesStartDay[i - 1].startDay)
          .subtract(1, 'days')
          .format(FORMAT),
        length: moment(cyclesStartDay[i - 1].startDay).diff(
          cyclesStartDay[i].startDay,
          'days',
        ),
      });
      const spottingDays = await getCycleSpottingDays(
        cyclesStartDay[i].startDay,
        cycles[cyclesStartDay.length - 1 - i].endDay,
      );
      cyclesStartDay[i].bleedingDays.push(
        ...spottingDays.map((s) => moment(s.date)),
      );
    }
  }
  async function determineEachCycleDayType() {
    const cyclesDetail = await determineCyclesDetail();
    let d = [];
    cyclesDetail.forEach((cycle) => {
      d.push(cycleDayTypes(cycle));
    });
    return d;
  }
  function cycleDayTypes(cycle) {
    let allDays = [];
    const formatted = cycle.bleedingDays.map((d) => d.format(FORMAT));
    for (let i = 0; i < cycle.length; i++) {
      const date = moment(cycle.startDay).add(i, 'day').format(FORMAT);
      allDays.push({
        cycleId: `از ${jalaali(cycle.startDay).format('jM/jD')} - ${jalaali(
          cycle.endDay,
        ).format('jM/jD')}`,
        date: date,
        type: formatted.includes(date) ? 'period' : 'normal',
      });
    }
    return allDays;
  }
  return {
    cycleDayNumber,
    nextPeriodDate,
    nextOvulationDate,
    nextPmsDate,
    determinePhaseSentence,
    perdictedPeriodDaysInCurrentYear,
    perdictedOvulationDaysInCurrentYear,
    pastBleedingDays,
    determineLastPeriodDate,
    setFirstPeriod,
    determineCyclesStartDate,
    determineCyclesDetail,
    determineEachCycleDayType,
  };
}
