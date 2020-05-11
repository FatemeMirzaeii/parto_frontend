import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, } from "react-native"

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
  num = num.toString()
  num = num.replace("00", "۰۰");
  num = num.replace("11", "۱۱");
  num = num.replace("22", "۲۲");
  num = num.replace("33", "۳۳");
  num = num.replace("44", "۴۴");
  num = num.replace("55", "۵۵");
  num = num.replace("66", "۶۶");
  num = num.replace("77", "۷۷");
  num = num.replace("88", "۸۸");
  num = num.replace("99", "۹۹");
  num = num.replace("0", "۰");
  num = num.replace("1", "۱");
  num = num.replace("2", "۲");
  num = num.replace("3", "۳");
  num = num.replace("4", "۴");
  num = num.replace("5", "۵");
  num = num.replace("6", "۶");
  num = num.replace("7", "۷");
  num = num.replace("8", "۸");
  num = num.replace("9", "۹");
  return num;
}
export function PersianDateToArray(PDate) {
  const Splitted = PDate.split(' ')
  switch (Splitted.length) {
    case 1:
      return Splitted[0].split('/').map(digit => parseInt(digit))
    case 2:
      return Splitted[0].split('/').concat(Splitted[1].split(':')).map(digit => parseInt(digit))
  }
}
export function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}