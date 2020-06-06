import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid} from 'react-native';

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
export function RemoveHTML(Text) {
  const Entities = require('html-entities').AllHtmlEntities;
  const entities = new Entities();
  const regex = /(<([^>]+)>)/gi;
  const result = Text.replace(regex, '');
  return entities.decode(result);
}
export function TextCleaner(i) {
  let filtered = i.filter(function (el) {
    return el != null;
  });
  return filtered.join('، ');
}
export function toPersianNum(num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return num
    .toString()
    .split('')
    .map((x) => farsiDigits[x])
    .join('');
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
