import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import md5 from 'md5';

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
export async function request_READ_PHONE_STATE() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'ReactNativeCode wants to READ_PHONE_STATE',
        message: 'ReactNativeCode App needs access to your personal data. ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Granted.'); //to maryam: Alert is not defined
    } else {
      Alert.alert('Permission Not Granted');
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
    r.push(`${i}`);
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
export const shareContent = async (url) => {
  const shareOptions = {
    title: 'Share file',
    url: url,
    failOnCancel: false,
  };

  try {
    const ShareResponse = await Share.open(shareOptions);
    shareTxt = JSON.stringify(ShareResponse, null, 2);
  } catch (error) {
    console.log('Error =>', error);
    shareTxt = 'error: '.concat(getErrorString(error)); //to maryam: shareTxt and getErrorString are not defined.
  }
};
export const convert2MD5 = (value) => {
  return md5(value);
};

export const calendarMarkedDatesObject = (color, dashed) => {
  return {
    // periods: [
    //   {
    //     startingDay: dashed,
    //     color: color,
    //     endingDay: dashed,
    //     textColor: color,
    //   },
    // ],
    customStyles: {
      container: {
        width: !dashed ? '100%' : '75%',
        borderBottomWidth: 3,
        borderColor: color,
        borderRadius: 0,
      },
      text: {
        color: color,
      },
    },
  };
};

export const e2p = (s) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
export const a2p = (s) =>
  s.replace(/[٠-٩]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
