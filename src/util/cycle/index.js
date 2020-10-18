import moment from 'moment';
import jalaali from 'moment-jalaali';

import {
  OVULATION_DAY_NO,
  FORMAT,
  MIN_LENGTH_BETWEEN_PERIODS,
  OVULATION_WINDOW_LENGTH,
} from '../../constants/cycle';
import { OPTIONS } from '../../constants/health-tracking-info';
import {
  getUserAllPeriodDays,
  getProfileData,
  getLastPeriodDate,
  setLastPeriodDate,
  setBleedingDays,
} from '../database/query';
const today = moment();
//momentjs won't perform verywell and sometimes retruns inconsistant data!
//so I had to use many transform from string to moment object or vice versa

export default async function CycleModule() {
  const pdata = await getProfileData();
  console.log('databse pure data', pdata);
  const lastPeriodDate = pdata.last_period_date
    ? moment(pdata.last_period_date)
    : null;
  const avgCycleLength = pdata.avg_cycle_length;
  const avgPeriodLength = pdata.avg_period_length;

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
    console.log('cycle day number', date, lastPeriodDate.format(FORMAT));
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
      case avgPeriodLength < cycleDayNo && cycleDayNo <= OVULATION_DAY_NO: {
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
  function determinePhaseSentence(date) {
    const phase = determineCyclePhase(date);
    const dayNo = cycleDayNumber(date);
    console.log('phase', phase);
    switch (phase) {
      case -1: {
        return { mainSentence: 'دوره قبلی' }; //todo: should find past cycle first period day.
      }
      case 0: {
        return {
          mainSentence: 'تاریخ آخرین پریود خود را وارد کنید',
          subSentence: 'تا بتوانیم تحلیل درستی از دوره‌هایتان را نمایش دهیم.',
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
          subSentence: 'احتمال بارداری',
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
          subSentence: 'کمترین احتمال بارداری',
          thirdSentence: `روز ${dayNo + 1} دوره`,
        };
      }
      case 4: {
        const days = Math.abs(remainingDaysToNextPeriod(date));
        return {
          mainSentence: `${days} روز از زمان پریود شما گذشته است.`,
          subSentence: `روز ${dayNo + 1} دوره`,
        };
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
  function remainingDaysToNextPeriod(date) {
    const pd = nextPeriodDate(lastPeriodDate);
    if (!pd) {
      return;
    }
    return moment(pd).diff(date, 'days');
  }
  function nextOvulationDate(pdate) {
    if (!pdate) {
      return;
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
    //I considered ovulation window from 3 days before ovulation day and 3 days after that.
    //day 11 till 17 of cycle for normal periods
    const firstDay = moment(od).subtract(4, 'days').format(FORMAT);
    for (let i = 0; i < OVULATION_WINDOW_LENGTH; i++) {
      window.push(moment(firstDay).add(i, 'days').format(FORMAT));
    }
    return window;
  }
  function perdictedPeriodDaysInCurrentYear() {
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

  ////// this function will return an object with 2 property: date, type.
  ////// date is in moment format and also sorted DESC.
  async function pastBleedingDays() {
    const all = await getUserAllPeriodDays();
    //will return all bleeding days in json {date: string with 'YYYY-MM-DD' format, tracking_option_id: number}.
    console.log('all', all);
    if (all.length > 0) {
      return all
        .map((d) => {
          return { date: moment(d.date), type: d.tracking_option_id };
        })
        .sort((a, b) => b.date.diff(a.date));
    }
  }
  async function determineLastPeriodDate() {
    const pervLastPeriodDate = await getLastPeriodDate();
    const prevBleedingDays = await pastBleedingDays();
    if (!prevBleedingDays) {
      setLastPeriodDate(null);
      return;
    }
    const dates = prevBleedingDays.map((d) => d.date);
    console.log('pastDayssss', dates, prevBleedingDays);

    let lpd;
    for (let i = 0; i < dates.length; i++) {
      if (!dates[i + 1]) {
        lpd = dates[i];
      } else if (
        dates[i].diff(dates[i + 1], 'days') > MIN_LENGTH_BETWEEN_PERIODS &&
        dates[i].type !== OPTIONS.SPOTTING
      ) {
        lpd = dates[i];
        break;
      }
    }
    if (!lpd) {
      return;
    }
    if (!pervLastPeriodDate || pervLastPeriodDate !== lpd) {
      console.log('lpd', lpd);
      setLastPeriodDate(lpd);
    }
    return lpd;
  }

  function setFirstPeriod(plength = 7, lpDate) {
    if (!lpDate) {
      return;
    }
    let days = [];
    for (let i = 0; i < plength; i++) {
      days.push(moment(lpDate).add(i, 'days').format(FORMAT));
    }
    console.log('fist per', days);
    setBleedingDays(days);
  }

  async function determinePeriodIntervals() {
    const bdays = await pastBleedingDays();
    const bleedingdates = bdays ? bdays.map((d) => d.date) : [];
    let intervals = [];
    for (let i = 0; i <= bleedingdates.length; i++) {
      if (!bleedingdates[i + 1]) {
        intervals.push(bleedingdates.splice(0, i + 1));
        return intervals;
      }
      if (
        bleedingdates[i].diff(bleedingdates[i + 1], 'days') >
          MIN_LENGTH_BETWEEN_PERIODS &&
        bleedingdates[i].type !== OPTIONS.SPOTTING
      ) {
        intervals.push(bleedingdates.splice(0, i + 1));
        i = -1;
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
    //since each interval array is sorted, I consider last element as first {period/cycle} day.
    //If the sort changed, we should find earlier day in interval array using moment.min().
    //so interval[interval.length - 1] will change to moment.min(interval).
    return {
      startDay: moment(interval[interval.length - 1]).format(FORMAT),
      bleedingDays: interval,
    };
  }
  async function determineCyclesDetail() {
    const cyclesStartDay = await determineCyclesStartDate();
    let cycles = [];
    for (let i = cyclesStartDay.length - 1; i >= 0; i--) {
      if (!cyclesStartDay[i - 1]) {
        cycles.push({
          ...cyclesStartDay[i],
          length: today.diff(cyclesStartDay[i].startDay, 'days'),
        });
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
