import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Database from '../../components/Database';
import { Theme, Width, Height } from '../../app/Theme';
import TopAgenda from '../../components/TopAgenda';
import {Icon, Overlay, ButtonGroup} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
const TrackingOptions = ({navigation}) => {
  const [date, setDate] = useState(navigation.getParam('date'));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'خونریزی',
      hasMultipleChoice: false,
      color: '#FF360C',
      options: [
        { id: 1, title: 'لکه بینی', selected: [] },
        { id: 2, title: 'سبک', selected: [] },
        { id: 3, title: 'متوسط', selected: [] },
        { id: 4, title: 'سنگین', selected: [] },
      ],
    },
    {
      id: 2,
      title: 'درد',
      hasMultipleChoice: true,
      color: '#1170A8',
      options: [
        { id: 5, title: 'سردرد', selected: [] },
        { id: 6, title: 'کمردرد', selected: [] },
        { id: 7, title: 'حساس شدن سینه', selected: [] },
        { id: 8, title: 'تخمک گذاری', selected: [] },
      ],
    },
    {
      id: 3,
      title: 'حال عمومی',
      hasMultipleChoice: true,
      color: '#FF780C',
      options: [
        { id: 9, title: 'خوشحال', selected: [{ id: 1 }] },
        { id: 10, title: 'ناراحت', selected: [] },
        { id: 11, title: 'بی تفاوت', selected: [] },
        { id: 12, title: 'عصبانی', selected: [] },
      ],
    },
    {
      id: 4,
      title: 'ترشحات',
      hasMultipleChoice: false,
      color: '#FFDE0C',
      options: [
        { id: 13, title: 'چسبنده', selected: [{ id: 2 }] },
        { id: 14, title: 'کرمی', selected: [] },
        { id: 15, title: 'تخم مرغی', selected: [] },
        { id: 16, title: 'آبکی', selected: [] },
      ],
    },
  ]);
  var db = new Database();
  useEffect(() => {
    setDetailPageId(null);
    // db.rawQuery(
    //   "SELECT JSON_OBJECT('id',id,'title',title) AS data FROM health_tracking_category",
    // ).then((b) => {
    //   //setCategories(b);
    //   console.log(b);
    // });
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
    // "from user_tracking_option where tracking_option_id = o.id AND date=date))))"+
    // "from health_tracking_option o where category_id = c.id)))"+
    // "from health_tracking_category c;"

  }, [db, categories, date]);
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
  const renderItem = ({ item }) => {
    const clr = getRandomColor();

  }, [categories, date]);
  const renderItem = ({item}) => {

    return (
      <View style={styles.sliderItem}>
        <TouchableOpacity
          style={[
            styles.category,
            {
              borderColor: item.color,
            },
          ]}>
          <Text style={styles.txt}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleOverlay}
          style={[styles.more, {backgroundColor: item.color}]}>
          <Icon name="ios-flash" type="ionicon" size={17} color="white" />
          <Text style={styles.moreText}>
            {'   '}
            در مورد {item.title} بیشتر بدانید.
          </Text>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>در دست تعمیر!</Text>
          </Overlay>
        </TouchableOpacity>
        <View style={styles.options}>{renderOptions(item, item.color)}</View>
        <View style={styles.detailPage}>
          {item.id === detailPageId ? renderDetailPage() : null}
        </View>
      </View>
    );
  };
  const loadIcon = (option, color) => {
    db.rawQuery(
      `select * from health_tracking_option where id=${option.id}`,
    ).then((a) => {
      console.log(a);
    });
    return `<svg version="1.1" id="Layer_1" xmlns="http:www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="566.93px" height="566.93px" viewBox="0 0 566.93 566.93" enable-background="new 0 0 566.93 566.93" xml:space="preserve"><path fill="${
      option.selected.length > 0 ? 'white' : color
    }" d="M292.582,163.253c-67.26,79.579-104.81,130.191-90.255,186.318c17.784,68.598,154.958,66.55,164.804-4.848c3.339-24.215-7.852-53.012-28.548-78.343C307.908,228.845,281.966,209.672,292.582,163.253L292.582,163.253z"/></svg>`;
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
              { borderColor: color },
              {
                backgroundColor: option.selected.length > 0 ? color : 'white',
              },
            ]}>
            <SvgXml width="70%" height="70%" xml={loadIcon(option)} />
            <Text style={styles.txt}>{option.title}</Text>
          </TouchableOpacity>
        );
      });
  };
  const updateIndex = (i) => {
    setSelectedIndex(i);
  };
  const renderDetailPage = () => {
    switch (detailPageId) {
      case 1:
        return (
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={['روز', 'َشب']}
            vertical={true}
            containerStyle={{alignSelf: 'center', height: 75, width: 50}}
            selectedButtonStyle={{backgroundColor: '#FF360C'}}
          />
        );
      case 2:
        return <Text>اینجا مختص جزئیات است.</Text>;
      case 3:
        return <Text>اینجا مختص جزئیات است.</Text>;
      case 4:
        return <Text>اینجا مختص جزئیات است.</Text>;
      case 5:
        return <Text>اینجا مختص جزئیات است.</Text>;
      case 6:
        return <Text>اینجا مختص جزئیات است.</Text>;

      default:
    }
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
      setDetailPageId(category.id);
    }
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <View style={{ height: 70, marginTop: 50, backgroundColor: 'pink' }}>

        <TopAgenda
          onDayPress={(day) => {
            setDate(day.dateString);
          }}
        />

      </View>
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
  detailPage: {},
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
  more: {
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[10],
    color: 'white',
  },
});
export default TrackingOptions;
