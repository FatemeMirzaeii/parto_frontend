import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Realm from 'realm';
import HealthTrackingCategorySchema from '../../models/HealthTrackingCategorySchema';
import HealthTrackingOptionSchema from '../../models/HealthTrackingOptionSchema';
import UserTrackingOptionSchema from '../../models/UserTrackingOptionSchema';
import SQLite from 'react-native-sqlite-storage';

const TrackingOptions = () => {
  const [state, setState] = useState({
    categories: [],
    options: [],
  });
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'خونریزی',
      options: [
        {id: 1, title: 'لکه بینی'},
        {id: 2, title: 'سبک'},
        {id: 3, title: 'متوسط'},
        {id: 4, title: 'سنگین'},
      ],
    },
    {
      id: 2,
      title: 'درد',
      options: [
        {id: 5, title: 'سردرد'},
        {id: 6, title: 'کمردرد'},
        {id: 7, title: 'حساس شدن سینه'},
        {id: 8, title: 'تخمک گذاری'},
      ],
    },
    {
      id: 3,
      title: 'حال عمومی',
      options: [
        {id: 9, title: 'خوشحال'},
        {id: 10, title: 'ناراحت'},
        {id: 11, title: 'بی تفاوت'},
        {id: 12, title: 'عصبانی'},
      ],
    },
    {
      id: 4,
      title: 'ترشحات',
      options: [
        {id: 13, title: 'چسبنده'},
        {id: 14, title: 'کرمی'},
        {id: 15, title: 'تخم مرغی'},
        {id: 16, title: 'آبکی'},
      ],
    },
  ]);
  //const realm = useRef();
  useEffect(() => {
    var db = SQLite.openDatabase({
      name: 'master',
      createFromLocation: '~sqlite.db',
    });
    db.transaction((tx) => {
      tx.executeSql(
        // "select json_object('id',c.id,'title',c.title,'options'," +
        //   "json_array((select GROUP_CONCAT(json_object('id',id,'title',title))" +
        //   ' from health_tracking_option o where category_id = c.id))) ' +
        //   'from health_tracking_category c;',
        // "select json_object('id',id,'title',title) from health_tracking_category;",
        'select * from health_tracking_category;',
        [],
        (trx, results) => {
          console.log('Query completed');
          // Get rows with Web SQL Database spec compliance.
          var len = results.rows.length;
          console.log(`lllll: ${JSON.stringify(results)}`);
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Record: ${row.title}`);
          }
        },
        (err) => {
          console.log('Error: ' + (err.message || err));
        },
      );
    });
    // realm.current = new Realm({
    //   schema: [
    //     HealthTrackingCategorySchema,
    //     HealthTrackingOptionSchema,
    //     UserTrackingOptionSchema,
    //   ],
    // });
    // setState({
    //   categories: realm.current.objects(HealthTrackingCategorySchema),
    //   options: realm.current
    //     .objects(HealthTrackingOptionSchema)
    //     .filtered('category_id=1'),
    // });
  }, []);
  const getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };
  const renderItem = ({item}) => {
    const clr = getRandomColor();
    return (
      <View style={styles.sliderItem}>
        <TouchableOpacity>
          <View
            style={[
              styles.category,
              {
                borderColor: clr,
              },
            ]}>
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>{renderOptions(item.id, clr)}</View>
      </View>
    );
  };
  const renderOptions = (categoryId, color) => {
    return (
      <View style={styles.options}>
        {categories
          .find((c) => c.id === categoryId)
          .options.map((op) => {
            return (
              <TouchableOpacity onPress={() => onOptionPress(op)}>
                <View style={[styles.option, {borderColor: color}]}>
                  <Text>{op.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    );
    // return (
    //   <ButtonGroup
    //     onPress={(id) => onOptionPress(id)}
    //     selectedIndex={selectedIndex}
    //     buttons={state.options.map((o) => o.title)}
    //     containerStyle={styles.option}
    //   />
    // );
  };
  const onOptionPress = (option) => {
    console.log(option);
    // switch (option.category_id) {
    //   case 1:
    //   // const o = realm.current
    //   //   .objects(UserTrackingOptionSchema)
    //   //   .filtered('category_id=1 && date=$0', new Date());
    //   // o == null
    //   //   ? insertOption(option.id)
    //   //   : (o.tracking_option_id = option.id);
    //   case 2:
    //   case 3:
    // }
  };
  const insertOption = (id) => {
    // realm.current.write(() => {
    //   realm.current.create(UserTrackingOptionSchema, {
    //     user_id: 1,
    //     tracking_option_id: id,
    //     date: new Date(),
    //   });
    //   console.log(realm.current.objects(UserTrackingOptionSchema));
    // });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Carousel
          layout={'default'}
          data={categories}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 100}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    margin: 15,
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
  option: {
    margin: 15,
    width: Dimensions.get('window').width / 3 - 15,
    height: Dimensions.get('window').height / 5 - 10,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 5,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
export default TrackingOptions;
