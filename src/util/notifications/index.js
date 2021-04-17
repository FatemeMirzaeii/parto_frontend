import moment from 'moment';
import NotificationService from './NotificationService';
import CycleModule from '../../util/cycle';
import { getUserReminders } from '../database/query';
import {
  BREAST_EXAM,
  OVULATION,
  PERIOD_START,
  PMS,
  PERIOD_LATE,
  CHECK_THE_APP,
} from '../../constants/reminders';
import { FORMAT } from '../../constants/cycle';

const notification = new NotificationService();
const today = moment().format(FORMAT);
let c;

export const setupNotifications = async () => {
  const reminders = await getUserReminders(1);
  c = await CycleModule();
  notification.getScheduledLocalNotifications((res) =>
    console.log('scheduled notifs', res),
  );
  //userAppChecking();
  // periodLate();
  console.log('reminders', reminders);
  reminders.forEach((reminder) => {
    if (reminder.active === 1) {
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
    } else {
      notification.cancel(reminder.reminder_id);
    }
  });
};

async function breastExam(reminder) {
  let repeatType;
  switch (reminder.Xdays_ago) {
    case 1:
      repeatType = 'day';
      break;
    case 7:
      repeatType = 'week';
      break;
    case 30:
      repeatType = 'month';
      break;
    default:
      break;
  }
  const [date, time] = reminder.custom_time.split(/_/);
  const [hours, minutes] = time.split(/:/);
  const d = moment(date).toDate();
  d.setHours(hours);
  d.setMinutes(minutes);
  notification.scheduled(BREAST_EXAM, d, reminder.custom_message, repeatType);
  // notification.scheduled(
  //   BREAST_EXAM,
  //   new Date(Date.now()),
  //   reminder.custom_message,
  //   'minute',
  // );
  console.log('breast exam reminder set for', d);
}

async function periodInACoupleOfDays(reminder) {
  notification.cancel(PERIOD_START);
  const nextPeriodDate = c.nextPeriodDate();
  const date = getReminderDateTime(
    nextPeriodDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(PERIOD_START, date, reminder.custom_message);
  console.log('period reminder set for', date);
}

async function ovulationInACoupleOfDays(reminder) {
  notification.cancel(OVULATION);
  const nextOvulationDate = c.nextOvulationDate();
  const date = getReminderDateTime(
    nextOvulationDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(OVULATION, date, reminder.custom_message);
  console.log('ovulation reminder set for', date);
}

async function pmsInACoupleOfDays(reminder) {
  notification.cancel(PMS);
  const nextPmsDate = c.nextPmsDate();
  const date = getReminderDateTime(
    nextPmsDate,
    reminder.custom_time,
    reminder.Xdays_ago,
  );
  if (moment(date).isBefore(today)) return;
  notification.scheduled(PMS, date, reminder.custom_message);
  console.log('PMS reminder set for', date);
}

export async function periodLate() {
  notification.cancel(PERIOD_LATE);
  const nextPeriodDate = c.nextPeriodDate();
  if (nextPeriodDate === '') return;
  const date = moment(nextPeriodDate).add(10, 'days').toDate();
  date.setHours(10);
  date.setMinutes(0);
  if (moment(date).isBefore(today)) return;
  notification.scheduled(
    PERIOD_LATE,
    date,
    'بیشتر از 10 روز از زمانی که انتظار داشتیم پریود بشی گذشته.هنوز تاریخ جدید وارد نکردی؟',
  );
}

export async function userAppChecking() {
  notification.cancel(CHECK_THE_APP);
  const date = moment(today).add(90, 'days').toDate();
  date.setHours(10);
  date.setMinutes(0);
  notification.scheduled(
    CHECK_THE_APP,
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
