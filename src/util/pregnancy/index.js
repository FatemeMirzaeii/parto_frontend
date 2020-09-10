import moment from 'moment';
import { FORMAT, PREGNANCY_WEEKS } from '../../constants/cycle';
import {
  getPregnancyData,
  getProfileData,
  setBleedingDays,
} from '../database/query';
const today = moment();

export default async function CycleModule() {
  const profileDate = await getProfileData();
  const lp = await getProfileData();
  const pdata = await getPregnancyData();
  const lastPeriodDate = lp.last_period_date
    ? moment(lp.last_period_date)
    : null;
  const conceptionDate = pdata.conception_date
    ? moment(pdata.conception_date)
    : null;
  const dueDate = pdata.due_date ? moment(pdata.due_date) : null;

  console.log('databse pure data', lp, pdata, profileDate);

  function determinePregnancyWeek() {
    if (lastPeriodDate) {
      return pregnancyWeekBasedOnLastPeriodDate();
    } else if (conceptionDate) {
      return pregnancyWeekBasedOnConceptionDate();
    } else if (dueDate) {
      return pregnancyWeekBasedOnDueDate();
    }
  }
  function pregnancyWeekBasedOnLastPeriodDate() {
    const d = today.diff(lastPeriodDate, 'weeks');
    console.log('weeeek', lastPeriodDate, lp, today, d);
    return d;
  }
  function pregnancyWeekBasedOnDueDate() {
    return PREGNANCY_WEEKS - dueDate.diff(today, 'weeks');
  }
  function pregnancyWeekBasedOnConceptionDate() {
    return today.diff(conceptionDate, 'weeks') + 2;
  }
  function determenineLastPeriodDateBasedOnPregnancyWeek(
    pregnancyWeek,
    pregnancyWeekDay,
  ) {
    const pregnancyDayNumber = pregnancyWeek * 7 + pregnancyWeekDay;
    const t = moment();
    console.log(
      'pregnancyDayNumber',
      pregnancyWeek,
      pregnancyWeekDay,
      pregnancyDayNumber,
      t,
    );
    const d = t.subtract(pregnancyDayNumber, 'days').format(FORMAT);
    console.log('pregnancyDayNumber', d);
    return d;
  }
  function determineDueDate() {
    if (lastPeriodDate) {
      return lastPeriodDate.add(PREGNANCY_WEEKS, 'weeks').format(FORMAT);
    }
    if (conceptionDate) {
      return conceptionDate.add(38, 'weeks').format(FORMAT);
    }
  }
  function remainingDaysToDueDate() {
    if (dueDate) {
      return dueDate.diff(today, 'days');
    } else {
      const due = determineDueDate();
      console.log('due', due);
      return moment(due).diff(today, 'days');
    }
  }
  function determineNefasDays() {
    let days = [];
    for (let i = 0; i < 8; i++) {
      console.log('nefas days', i, dueDate.format(FORMAT));
      days.push(dueDate.add(i, 'days').format(FORMAT));
    }
    console.log('nefas days', days);
    setBleedingDays(days);
  }
  return {
    determenineLastPeriodDateBasedOnPregnancyWeek,
    determinePregnancyWeek,
    remainingDaysToDueDate,
    determineNefasDays,
  };
}
