import moment from 'moment';
import NotificationService from './NotificationService';
import CycleModule from '../../util/cycle';
import {
  OVULATION_DAY_NO,
  FORMAT,
  MIN_LENGTH_BETWEEN_PERIODS,
  OVULATION_WINDOW_LENGTH,
} from '../../constants/cycle';
import {
  getUserAllPeriodDays,
  getProfileData,
  getLastPeriodDate,
  setLastPeriodDate,
  setBleedingDays,
} from '../database/query';

const notification = new NotificationService();

export async function periodInACoupleOfDays() {}
export async function ovulationInACoupleOfDays() {}
export async function pmsInACoupleOfDays() {}
export async function periodLate(lastPeriodDate, periodLength) {
  notification.local(
    diffDays + ' روز از تاریخ آخرین پریود شما گذشته است ',
    'تاریخ جدیدی ثبت کنید',
  );
}

export async function periodStart(daysAgo) {
  // export const periodStart = async (day)=>{
  const lastPeriodDate = await getLastPeriodDate();
  const c = await CycleModule();
  const pd = c.nextPeriodDate(lastPeriodDate);
  console.log(pd);
  const n = moment(d).subtract(daysAgo, 'days').format(FORMAT);
  console.log(n);
  //return d;
  notification.local(n, daysAgo);
}
