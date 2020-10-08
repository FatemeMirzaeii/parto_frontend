import moment from 'moment';
import { FORMAT, PREGNANCY_WEEKS, NEFAS_DAYS } from '../../constants/cycle';
import {
  getActivePregnancyData,
  getProfileData,
  setBleedingDays,
} from '../database/query';
const today = moment();

export default async function PregnancyModule() {
  const lp = await getProfileData();
  const pdata = await getActivePregnancyData();
  const lastPeriodDate = lp.last_period_date
    ? moment(lp.last_period_date)
    : null;
  const conceptionDate = pdata.conception_date
    ? moment(pdata.conception_date)
    : null;
  const dueDate = pdata.due_date ? moment(pdata.due_date) : null;

  console.log('databse pure data', lp, pdata);

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
    const d = today.diff(lastPeriodDate);
    const total = moment.duration(d);
    // the result of this is: 5 months, 1 weeks, 5 days.
    // console.log(
    //   total.months() +
    //     ' months, ' +
    //     total.weeks() +
    //     ' weeks, ' +
    //     (total.days() % 7) +
    //     ' days.',
    // );
    return {
      week: Math.floor(total.asWeeks()),
      days: total.days() % 7,
    };
  }
  function pregnancyWeekBasedOnDueDate() {
    const d = dueDate.diff(today);
    const total = moment.duration(d);
    return {
      week: PREGNANCY_WEEKS - Math.floor(total.asWeeks()),
      days: total.days() % 7,
    };
  }
  function pregnancyWeekBasedOnConceptionDate() {
    const d = today.diff(conceptionDate);
    const total = moment.duration(d);
    return {
      week: Math.floor(total.asWeeks()) + 2,
      days: total.days() % 7,
    };
  }
  function determineLastPeriodDateBasedOnPregnancyWeek(
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
  function determineDueDate(pDate) {
    if (lastPeriodDate || pDate) {
      const lastPeriod = lastPeriodDate || pDate;
      console.log('lastPeriod', lastPeriod, lastPeriodDate, pDate);
      return moment(lastPeriod).add(PREGNANCY_WEEKS, 'weeks').format(FORMAT);
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
    for (let i = 0; i < NEFAS_DAYS; i++) {
      days.push(moment(dueDate).add(i, 'days').format(FORMAT));
    }
    console.log('nefas days', days);
    setBleedingDays(days);
  }
  return {
    determineLastPeriodDateBasedOnPregnancyWeek,
    determinePregnancyWeek,
    remainingDaysToDueDate,
    determineNefasDays,
    determineDueDate,
  };
}
