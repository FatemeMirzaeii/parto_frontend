import moment from 'moment';
import NotificationService from './NotificationService';
import CycleModule from '../../util/cycle';
import { getUserReminders } from '../database/query';
import {
  BREAST_EXAM,
  OVULATION,
  PERIOD_START,
  PMS,
} from '../../constants/reminders';

const notification = new NotificationService();
const today = moment();
let c;
export default async () => {
  const reminders = await getUserReminders(1);
  c = await CycleModule();
  notification.getScheduledLocalNotifications((res) =>
    console.log('dkjvd', res),
  );
  notification.cancelAll();
  userAppChecking();
  periodLate();
  console.log('reminders', reminders);
  reminders.forEach((reminder) => {
    if (reminder.active) {
      switch (reminder.reminder_id) {
        case BREAST_EXAM:
          breastExam(reminder);
          break;
        case OVULATION:
          ovulationInACoupleOfDays(reminder);
          break;
        case PERIOD_START:
          periodInACoupleOfDays(reminder);
          break;
        case PMS:
          pmsInACoupleOfDays(reminder);
          break;

        default:
          break;
      }
    }
  });
};
async function breastExam(reminder) {
  let repeatType;
  switch (reminder.Xdays_ago) {
    case 1:
      return (repeatType = 'day');
    case 7:
      return (repeatType = 'week');
    case 30:
      return (repeatType = 'month');
    default:
      break;
  }
  const date = today.toDate();
  const [hours, minutes] = reminder.custom_time.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  notification.scheduled(date, reminder.custom_message, repeatType); //todo should fix date
  console.log('breast exam set for', date);
}
async function periodInACoupleOfDays(reminder) {
  const nextPeriodDate = c.nextPeriodDate();
  const date = getReminderDateTime(
    nextPeriodDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(date, reminder.custom_message);
  console.log('period reminder set for', date);
}
async function ovulationInACoupleOfDays(reminder) {
  const nextOvulationDate = c.nextOvulationDate();
  const date = getReminderDateTime(
    nextOvulationDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(date, reminder.custom_message);
  console.log('ovulation reminder set for', date);
}
async function pmsInACoupleOfDays(reminder) {
  const nextPmsDate = c.nextPmsDate();
  const date = getReminderDateTime(
    nextPmsDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(date, reminder.custom_message);
  console.log('PMS reminder set for', date);
}
async function periodLate() {
  const nextPeriodDate = c.nextPeriodDate();
  const date = moment(nextPeriodDate).add(10, 'days').toDate();
  date.setHours(10);
  date.setMinutes(0);
  notification.scheduled(
    date,
    '10 روز از زمانی که انتظار داشتیم پریود بشی گذشته.هنوز تاریخ جدید وارد نکردی؟',
  );
}
async function userAppChecking() {
  const date = today.add(90, 'days').toDate();
  date.setHours(10);
  date.setMinutes(0);
  notification.scheduled(
    date,
    'چندوقتی هست که حال و احوالت رو ثبت نکردی! دلمون برات تنگ شده.',
  );
}
function getReminderDateTime(targetDate, time, daysAgo) {
  const date = moment(targetDate).subtract(daysAgo).toDate();
  const [hours, minutes] = time.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}
