import NotificationService from './NotificationService';
import { toPersianNum } from '../func';

const notification = new NotificationService();

export async function periodInACoupleOfDays() {}
export async function ovulationInACoupleOfDays() {}
export async function pmsInACoupleOfDays() {}
export async function periodLate(lastPeriodDate, periodLength) {
  var str = lastPeriodDate.toString().split('', 4).join('');
  var str1 = lastPeriodDate.toString().replace(str.toString(), '');
  var str2 = str1.toString().split('', 2).join('');
  var str3 = str1.toString().replace(str2.toString(), '');
  var last = new Date(
    str2.toString() + '/' + str3.toString() + '/' + str.toString(),
  );
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const diffTime = Math.abs(today - last);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > periodLength - 1) {
    console.log('diffrentdDay: ', diffDays);
    notification.local(
      toPersianNum(diffDays) + ' روز از تاریخ آخرین پریود شما گذشته است ',
      'تاریخ جدیدی ثبت کنید',
    );
  }
}
