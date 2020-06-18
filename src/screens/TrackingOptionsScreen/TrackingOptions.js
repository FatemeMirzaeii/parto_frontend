<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, {useEffect, useState, useCallback} from 'react';
>>>>>>> 7934469c4ac81721088c27c38470e0b5918467f9
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
<<<<<<< HEAD
import SQLite from 'react-native-sqlite-storage';
// import Database from '../../components/Database';
import { Theme, Width, Height } from '../../app/Theme';
import TopAgenda from '../../components/TopAgenda';
import { Icon, Overlay, ButtonGroup, Input } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
const TrackingOptions = ({ navigation }) => {
  let db = SQLite.openDatabase({
    name: 'parto.db',
    createFromLocation: '~sqlite.db',
  });
  const [icn, setIcn] = useState();
  const [cic, setCic] = useState();
=======
import Database from '../../components/Database';
import {Theme, Width, Height} from '../../app/Theme';
import TopAgenda from '../../components/TopAgenda';
import {Icon, Overlay, ButtonGroup, Input} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
let db = new Database();
const TrackingOptions = ({navigation}) => {
>>>>>>> 7934469c4ac81721088c27c38470e0b5918467f9
  const [date, setDate] = useState(navigation.getParam('date'));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
<<<<<<< HEAD
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'خونریزی',
      hasMultipleChoice: false,
      color: '#F1719D',
      options: [
        { id: 1, title: 'لکه بینی', selected: [] },
        { id: 2, title: 'سبک', selected: [] },
        { id: 3, title: 'متوسط', selected: [] },
        { id: 4, title: 'سنگین', selected: [] },
      ],
    },
    {
      id: 2,
      title: 'ترشحات',
      hasMultipleChoice: false,
      color: '#FFDE0C',
      options: [
        { id: 9, title: 'چسبنده', selected: [{ id: 2 }] },
        { id: 10, title: 'کرمی', selected: [] },
        { id: 11, title: 'تخم مرغی', selected: [] },
        { id: 12, title: 'غیرمعمول', selected: [] },
      ],
    },
    {
      id: 3,
      title: 'درد',
      hasMultipleChoice: true,
      color: '#00AEEF',
      options: [
        { id: 5, title: 'سردرد', selected: [] },
        { id: 6, title: 'حساس شدن سینه', selected: [] },
        { id: 7, title: 'تخمک گذاری', selected: [] },
        { id: 8, title: 'گرفتگی عضلات', selected: [] },
      ],
    },
    {
      id: 4,
      title: 'حال عمومی',
      hasMultipleChoice: true,
      color: '#F1719D',
      options: [
        { id: 13, title: 'شاد', selected: [{ id: 1 }] },
        { id: 14, title: 'معمولی', selected: [] },
        { id: 15, title: 'غمگین', selected: [] },
        { id: 16, title: 'سندروم پیش از قاعدگی', selected: [] },
      ],
    },
    {
      id: 5,
      title: 'خواب',
      hasMultipleChoice: false,
      color: '#B6D442',
      options: [
        { id: 17, title: '0 تا 3 ساعت', selected: [{ id: 2 }] },
        { id: 18, title: '3 تا 6 ساعت', selected: [] },
        { id: 19, title: '6 تا 9 ساعت', selected: [] },
        { id: 20, title: 'بیش از 9 ساعت', selected: [] },
      ],
    },
    {
      id: 6,
      title: 'ورزش',
      hasMultipleChoice: true,
      color: '#00AEEF',
      options: [
        { id: 21, title: 'دو', selected: [{ id: 2 }] },
        { id: 22, title: 'شنا', selected: [] },
        { id: 23, title: 'باشگاه', selected: [] },
        { id: 24, title: 'نرمش', selected: [] },
      ],
    },
    {
      id: 7,
      title: 'همسرانگی',
      hasMultipleChoice: false,
      color: '#EF719C',
      options: [
        { id: 25, title: 'محافظت شده', selected: [{ id: 2 }] },
        { id: 26, title: 'محافظت نشده', selected: [] },
      ],
    },
  ]);
  const getData = async () => {
    const b = await db.executeSql(
      "SELECT JSON_OBJECT('id',id,'title',title) AS data FROM health_tracking_category",
    );
    console.log('jjjjjjj', b);
  };
  useEffect(() => {
    getData();
    // db.rawQuery('select * from health_tracking_option').then((a) => {
    //   setIcn(a);
    // });
    // db.rawQuery('select * from health_tracking_category').then((a) => {
    //   setCic(a);
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
  });
  const renderItem = ({ item }) => {
=======
  const [categories, setCategories] = useState([]);
  const getData = useCallback(() => {
    db.rawQuery(
      `SELECT JSON_OBJECT('id',id,'title',title,'hasMultipleChoice',has_multiple_choice,
      'color',color,'icon',icon,'options',(
        SELECT JSON_GROUP_ARRAY(
                JSON_OBJECT('id',id,'title',title,'icon',icon,'selected',(
                          SELECT JSON_GROUP_ARRAY(
                                  JSON_OBJECT('id',id,'tracking_option_id',tracking_option_id)
                                              )
                              FROM user_tracking_option u WHERE u.tracking_option_id = o.id AND date=${date}
                        )
                      )
                    ) 
            FROM health_tracking_option o WHERE o.category_id = c.id
          )         
        )
        AS data FROM health_tracking_category c`,
      'health_tracking_category',
    ).then((res) => {
      console.log(res);
      setCategories(res);
    });
  }, [date]);
  useEffect(() => {
    getData();
  }, [getData]);
  const renderItem = ({item}) => {
>>>>>>> 7934469c4ac81721088c27c38470e0b5918467f9
    return (
      <View style={styles.sliderItem}>
        <TouchableOpacity
          style={[
            styles.category,
            {
              borderColor: item.color,
            },
          ]}>
          <SvgXml width="70%" height="70%" xml={item.icon} />
          <Text style={styles.txt}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleOverlay}
          style={[styles.more, { backgroundColor: item.color }]}>
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
            <SvgXml width="70%" height="70%" xml={option.icon} />
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
          <View style={{ flexDirection: 'row' }}>
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={['روز', 'َشب']}
              vertical={true}
              containerStyle={{ alignSelf: 'center', height: 75, width: 50 }}
              selectedButtonStyle={{ backgroundColor: '#FF360C' }}
            />
            <Input
              placeholder="ساعت شروع پریود"
              containerStyle={{
                backgroundColor: 'white',
                width: Width / 2,
                borderRadius: 15,
              }}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="black" type="ionicon" />
              }
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Input
              placeholder="مدت زمان ورزش"
              containerStyle={{
                backgroundColor: 'white',
                width: Width / 1.5,
                borderRadius: 15,
              }}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="black" type="ionicon" />
              }
            />
          </View>
        );
      default:
    }
  };
  const onOptionPress = (category, option) => {
    if (option.selected.length > 0) {
      // db.rawQuery(
      //   `delete from user_tracking_option where tracking_option_id=${option.id}`,
      // ).then((res) => {
      //   console.log('ressss', res);
      // });
      categories
        .find((o) => o.id === category.id)
        .options.find((o) => o.id === option.id)
        .selected.pop();
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
          .options.find((o) => o.id === option.id).selected.length = 0;
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
<<<<<<< HEAD
      <View style={{ height: 70, marginTop: 50 }}>
=======
      <View style={{height: 100, marginTop: 50}}>
>>>>>>> 7934469c4ac81721088c27c38470e0b5918467f9
        <TopAgenda
          onDayPress={(day) => {
            console.log(day.dateString);
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
    //elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 5,
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
    textAlign: 'center',
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
