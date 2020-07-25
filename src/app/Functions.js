import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
    }
    return value;
  } catch (e) {
    console.error(e);
  }
}
export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
}
export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
}
export async function requestSTORAGEPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('You can use the EXTERNAL_STORAGE');
    } else {
      // console.log('EXTERNAL_STORAGE permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
// export function RemoveHTML(Text) {
//   const Entities = require('html-entities').AllHtmlEntities;
//   const entities = new Entities();
//   const regex = /(<([^>]+)>)/gi;
//   const result = Text.replace(regex, '');
//   return entities.decode(result);
// }
export function TextCleaner(i) {
  let filtered = i.filter(function (el) {
    return el != null;
  });
  return filtered.join('، ');
}
export function toPersianNum(num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return num
    ? num
      .toString()
      .split('')
      .map((x) => farsiDigits[x])
      .join('')
    : '';
}

export function toEnglishNumber(num) {
  var persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return num.replace(/[\u06F0-\u06F90]/g, function (m) {
    const englishNumber = persianDigits.indexOf(m);
    return parseInt(englishNumber);
  });
}

export function setPickerRange(min, max) {
  let r = [];
  for (let i = min; i <= max; i++) {
    r.push(toPersianNum(i));
  }
  return r;
}

export function PersianDateToArray(PDate) {
  const Splitted = PDate.split(' ');
  switch (Splitted.length) {
    case 1:
      return Splitted[0].split('/').map((digit) => parseInt(digit));
    case 2:
      return Splitted[0]
        .split('/')
        .concat(Splitted[1].split(':'))
        .map((digit) => parseInt(digit));
  }
}
export function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
export async function SendNotification(lastPeriodDate, periodLength) {
  var str = lastPeriodDate.toString().split('', 4).join('');
  var str1 = lastPeriodDate.toString().replace(str.toString(), '');
  var str2 = str1.toString().split('', 2).join('');
  var str3 = str1.toString().replace(str2.toString(), '');
  var last = new Date(
    str2.toString() + '/' + str3.toString() + '/' + str.toString(),
  );
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const diffTime = Math.abs(today - last);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > periodLength - 1) {
    console.log('diffrentdDay: ', diffDays);
    PushNotification.localNotification({
      vibrate: true,
      vibration: 1000,
      title: toPersianNum(diffDays) + " روز از تاریخ آخرین پریود شما گذشته است ",
      playSound: true,
      visibility: 'public',
      message: 'تاریخ جدیدی ثبت کنید',
    });
  }
}