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

  function determinePregnancyWeek() {
    return today.diff(lastPeriodDate, 'weeks');
  }
  function determenineLastPeriodDateBasedOnPregnancyWeek(
    pregnancyWeek,
    pregnancyWeekDay,
  ) {
    const pregnancyDayNumber = pregnancyWeek * 7 + pregnancyWeekDay;
    return today.subtract(pregnancyDayNumber, 'days').format(FORMAT);
  }

  return {
    determenineLastPeriodDateBasedOnPregnancyWeek,
    determinePregnancyWeek,
  };
}
