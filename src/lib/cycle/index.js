import moment from 'moment';
import { OVULATION_DAY_NO } from '../../constants/cycle';

export function determineCyclePhase(
  date,
  lastPeriodDate,
  avgCycleLength,
  avgPeriodLength,
) {
  const cycleDayNo = cycleDayNumber(date, lastPeriodDate);
  switch (true) {
    case cycleDayNo < avgPeriodLength: {
      const dayNo = periodDayNumber(date, lastPeriodDate);
      return 1;
    }
    case avgPeriodLength < cycleDayNo && cycleDayNo < OVULATION_DAY_NO: {
      const daysTo = remainingDaysToOvulation(date, lastPeriodDate);
      return 2;
    }
    case cycleDayNo > OVULATION_DAY_NO && cycleDayNo < avgCycleLength: {
      const daysNo = remainingDaysToNextPeriod(
        date,
        lastPeriodDate,
        avgCycleLength,
      );
      return 3;
    }
    case avgCycleLength < cycleDayNo: {
      const days = remainingDaysToNextPeriod(
        date,
        lastPeriodDate,
        avgCycleLength,
      );
      return 4;
    }
    default:
      return 'Hello from nothing!';
  }
}
export function determinePhaseText(
  date,
  lastPeriodDate,
  avgCycleLength,
  avgPeriodLength,
) {
  const phase = determineCyclePhase(
    date,
    lastPeriodDate,
    avgCycleLength,
    avgPeriodLength,
  );
  switch (phase) {
    case 1: {
      const dayNo = periodDayNumber(date, lastPeriodDate);
      return `روز ${dayNo} پریود`;
    }
    case 2: {
      const daysTo = remainingDaysToOvulation(date, lastPeriodDate);
      return `${daysTo} روز به تخمک گذاری`;
    }
    case 3: {
      const daysNo = remainingDaysToNextPeriod(
        date,
        lastPeriodDate,
        avgCycleLength,
      );
      return `${daysNo} روز به پریود بعدی`;
    }
    case 4: {
      const days = remainingDaysToNextPeriod(
        date,
        lastPeriodDate,
        avgCycleLength,
      );
      return `${days} روز پریود شما دیر شده است.`;
    }
    default:
      return 'Hello from nothing!';
  }
}
export function periodDayNumber(date, lastPeriodDate) {
  return date.diff(moment(lastPeriodDate), 'days');
}
export function cycleDayNumber(date, lastPeriodDate) {
  return date.diff(moment(lastPeriodDate), 'days');
}
export function nextPeriodDate(avgCycleLength, lastPeriodDate) {
  return moment(lastPeriodDate).add(avgCycleLength, 'days');
}
export function remainingDaysToNextPeriod(
  date,
  lastPeriodDate,
  avgCycleLength,
) {
  return date.diff(nextPeriodDate(avgCycleLength, lastPeriodDate), 'days');
}
export function nextOvulationDate(lastPeriodDate) {
  return moment(lastPeriodDate).add(14, 'days');
}
export function remainingDaysToOvulation(date, lastPeriodDate) {
  return date.diff(nextOvulationDate(lastPeriodDate), 'days');
}
export function determineOvulationDays() {}
