import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Database from '../../app/Database';
import {Theme, Width, Height} from '../../app/Theme';

const TrackingOptions = (props) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'خونریزی',
      hasMultipleChoice: false,
      options: [
        {id: 1, title: 'لکه بینی', selected: []},
        {id: 2, title: 'سبک', selected: []},
        {id: 3, title: 'متوسط', selected: []},
        {id: 4, title: 'سنگین', selected: []},
      ],
    },
    {
      id: 2,
      title: 'درد',
      hasMultipleChoice: true,
      options: [
        {id: 5, title: 'سردرد', selected: []},
        {id: 6, title: 'کمردرد', selected: []},
        {id: 7, title: 'حساس شدن سینه', selected: []},
        {id: 8, title: 'تخمک گذاری', selected: []},
      ],
    },
    {
      id: 3,
      title: 'حال عمومی',
      hasMultipleChoice: true,
      options: [
        {id: 9, title: 'خوشحال', selected: [{id: 1}]},
        {id: 10, title: 'ناراحت', selected: []},
        {id: 11, title: 'بی تفاوت', selected: []},
        {id: 12, title: 'عصبانی', selected: []},
      ],
    },
    {
      id: 4,
      title: 'ترشحات',
      hasMultipleChoice: false,
      options: [
        {id: 13, title: 'چسبنده', selected: [{id: 2}]},
        {id: 14, title: 'کرمی', selected: []},
        {id: 15, title: 'تخم مرغی', selected: []},
        {id: 16, title: 'آبکی', selected: []},
      ],
    },
  ]);
  var db = new Database();
  useEffect(() => {
    db.rawQuery('select * from health_tracking_category;').then((b) => {
      //setCategories(b);
    });
    // "select json_object('id',c.id,'title',c.title,'options'," +
    // "json_array((select GROUP_CONCAT(json_object('id',id,'title',title))" +
    // ' from health_tracking_option o where category_id = c.id))) ' +
    // 'from health_tracking_category c;',
    ////////
    //"select json_object('id',id,'title',title) from health_tracking_category;",
    ///////
    // "select json_object('id',c.id,'title',c.title,"+
    // "'options',json_array((select GROUP_CONCAT(json_object('id',id,'title',title,"+
    // "'selected',json_array((select GROUP_CONCAT(json_object('id',id,'tracking_option_id',tracking_option_id))"+
    // "from user_tracking_option where tracking_option_id = o.id AND date=props.navigation.getParam('date')))))"+
    // "from health_tracking_option o where category_id = c.id)))"+
    // "from health_tracking_category c;"
  }, [db, categories]);
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
        <TouchableOpacity
          style={[
            styles.category,
            {
              borderColor: clr,
            },
          ]}>
          <Text style={styles.txt}>{item.title}</Text>
        </TouchableOpacity>
        <View style={styles.options}>{renderOptions(item, clr)}</View>
      </View>
    );
  };
  const renderOptions = (category, color) => {
    return categories
      .find((c) => c.id === category.id)
      .options.map((option) => {
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onOptionPress(category, option)}
            style={[
              styles.option,
              {borderColor: color},
              {
                backgroundColor: option.selected.length > 0 ? color : 'white',
              },
            ]}>
            <Text style={styles.txt}>{option.title}</Text>
          </TouchableOpacity>
        );
      });
  };
  const onOptionPress = (category, option) => {
    if (option.selected.length > 0) {
      // db.rawQuery(
      //   `delete from user_tracking_option where tracking_option_id=${option.id} and date='2020-05-16'`,
      // );
      categories
        .find((o) => o.id === category.id)
        .options.find((o) => o.id === option.id)
        .selected.pop();
      setCategories(categories);
    } else {
      if (category.hasMultipleChoice) {
        // db.rawQuery(
        //   `insert into user_tracking_option tracking_option_id=${option.id} and date='2020-05-16'`,
        // );
        categories
          .find((o) => o.id === category.id)
          .options.find((o) => o.id === option.id)
          .selected.push(option);
        setCategories(categories);
      } else {
        // db.rawQuery(`delete from user_tracking_option where `)
        categories
          .find((o) => o.id === category.id)
          .options.find((o) => o.id === option.id)
          .selected.splice(
            0,
            categories
              .find((o) => o.id === category.id)
              .options.find((o) => o.id === option.id).selected.length,
          );
        categories
          .find((o) => o.id === category.id)
          .options.find((o) => o.id === option.id)
          .selected.push(option);
        setCategories(categories);
      }
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Carousel
          layout={'default'}
          data={categories}
          renderItem={renderItem}
          sliderWidth={Width}
          itemWidth={Width - 110}
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
    margin: 10,
    width: Width / 3 - 15,
    height: Height / 5 - 10,
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
  txt: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[15],
  },
});
export default TrackingOptions;
