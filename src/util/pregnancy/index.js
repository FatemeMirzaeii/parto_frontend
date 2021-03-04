import moment from 'moment';
import { FORMAT, PREGNANCY_WEEKS, NEFAS_DAYS } from '../../constants/cycle';
import {
  getActivePregnancyData,
  getProfileData,
  setBleedingDays,
  updatePregnancyData,
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

  function determinePregnancyWeek(date) {
    if (lastPeriodDate) {
      return pregnancyWeekBasedOnLastPeriodDate(date);
    } else if (conceptionDate) {
      return pregnancyWeekBasedOnConceptionDate(date);
    } else if (dueDate) {
      return pregnancyWeekBasedOnDueDate(date);
    } else return null;
  }
  function pregnancyWeekBasedOnLastPeriodDate(date) {
    const d = date.diff(moment(lastPeriodDate));
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
  function pregnancyWeekBasedOnDueDate(date) {
    const d = moment(dueDate).diff(date);
    const total = moment.duration(d);
    return {
      week: PREGNANCY_WEEKS - Math.floor(total.asWeeks()),
      days: total.days() % 7,
    };
  }
  function pregnancyWeekBasedOnConceptionDate(date) {
    const d = date.diff(moment(conceptionDate));
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
    const d = t.subtract(pregnancyDayNumber, 'days').format(FORMAT);
    // console.log('pregnancyDayNumber', d);
    return d;
  }
  function determineDueDate(pDate) {
    let delivery;
    if (lastPeriodDate || pDate) {
      const lastPeriod = lastPeriodDate || pDate;
      // console.log('lastPeriod', lastPeriod, lastPeriodDate, pDate);
      delivery = moment(lastPeriod)
        .add(PREGNANCY_WEEKS, 'weeks')
        .format(FORMAT);
    } else if (conceptionDate) {
      delivery = conceptionDate.add(38, 'weeks').format(FORMAT);
    }
    // console.log('determineDueDate', delivery);
    updatePregnancyData(delivery);
    return delivery;
  }
  function remainingDaysToDueDate(date) {
    // // if (dueDate) {
    // //   return dueDate.diff(date, 'days');
    // // } else {
    const due = determineDueDate();
    // console.log('due', due);
    return moment(due).diff(date, 'days');
    // }
  }
  function determineNefasDays(date) {
    let days = [];
    for (let i = 0; i < NEFAS_DAYS; i++) {
      days.push(
        moment(date ?? dueDate)
          .add(i, 'days')
          .format(FORMAT),
      );
    }
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
