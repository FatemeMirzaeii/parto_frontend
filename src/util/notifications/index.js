import NotificationService from './NotificationService';

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
}
