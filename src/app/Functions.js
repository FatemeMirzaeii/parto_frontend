import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid} from 'react-native';
import Realm from 'realm';
import HealthTrackingCategorySchema from '../models/HealthTrackingCategorySchema';
import HealthTrackingOptionSchema from '../models/HealthTrackingOptionSchema';

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
export function seed() {
  //Realm.deleteFile(HealthTrackingCategorySchema);
  Realm.open({
    schema: [HealthTrackingCategorySchema, HealthTrackingOptionSchema],
  })
    .then((realm) => {
      realm.write(() => {
        realm.deleteAll();
        realm.create(HealthTrackingCategorySchema, {id: 1, title: 'خونریزی'});
        realm.create(HealthTrackingCategorySchema, {id: 2, title: 'درد'});
        realm.create(HealthTrackingCategorySchema, {id: 3, title: 'حال عمومی'});
        realm.create(HealthTrackingCategorySchema, {id: 4, title: 'ترشحات'});
        realm.create(HealthTrackingOptionSchema, {
          id: 1,
          title: 'لکه بینی',
          category_id: 1,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 2,
          title: 'سبک',
          category_id: 1,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 3,
          title: 'متوسط',
          category_id: 1,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 4,
          title: 'سنگین',
          category_id: 1,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 5,
          title: 'سردرد',
          category_id: 2,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 6,
          title: 'گرفتگی عضلات',
          category_id: 2,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 7,
          title: 'حساس شدن سینه ها',
          category_id: 2,
        });
        realm.create(HealthTrackingOptionSchema, {
          id: 8,
          title: 'تخمک گذاری',
          category_id: 2,
        });
      });
      realm.close();
    })
    .catch((err) => console.log(err));
}
