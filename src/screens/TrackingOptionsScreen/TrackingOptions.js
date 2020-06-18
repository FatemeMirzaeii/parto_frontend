import React, {useEffect, useState, useCallback, createRef} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Database from '../../components/Database';
import TopAgenda from '../../components/TopAgenda';
import {Theme, Width, Height} from '../../app/Theme';
import Carousel from 'react-native-snap-carousel';
import {Icon, Overlay, ButtonGroup, Input} from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import {SvgXml} from 'react-native-svg';

const db = new Database();
const detailPageRef = createRef();

const TrackingOptions = ({navigation}) => {
  const [date, setDate] = useState(navigation.getParam('date'));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getData();
  }, [getData]);
  const getData = useCallback(() => {
    console.log('I get data for you again!');
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
        AS data FROM health_tracking_category c ORDER By id DESC`,
      'health_tracking_category',
    ).then((res) => {
      setCategories(res);
    });
  }, [date]);
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
          <SvgXml width="70%" height="70%" xml={item.icon} />
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
        {/* {item.id === detailPageId ? renderDetailPage() : null} */}
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
            <SvgXml width="70%" height="70%" xml={option.icon} />
            <Text style={styles.txt}>{option.title}</Text>
          </TouchableOpacity>
        );
      });
  };
  const renderDetailPage = () => {
    switch (detailPageId) {
      case 1:
        return (
          <View style={{flexDirection: 'row'}}>
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={['روز', 'َشب']}
              vertical={true}
              containerStyle={styles.buttonGroup}
              selectedButtonStyle={{backgroundColor: '#F1719D'}}
            />
            <Input
              placeholder="ساعت شروع پریود"
              containerStyle={styles.input}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="gray" type="ionicon" />
              }
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Input
              placeholder="مدت زمان ورزش"
              containerStyle={styles.input}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="gray" type="ionicon" />
              }
            />
          </View>
        );
      default:
    }
  };
  const onOptionPress = (category, option) => {
    if (option.selected.length > 0) {
      db.rawQuery(
        `DELETE FROM user_tracking_option WHERE tracking_option_id=${option.id} AND date=${date}`,
        'user_tracking_option',
      ).then((res) => {
        console.log('ressss', res);
        getData();
      });
      // categories
      //   .find((o) => o.id === category.id)
      //   .options.find((o) => o.id === option.id)
      //   .selected.pop();
    } else {
      if (category.hasMultipleChoice) {
        db.rawQuery(
          `INSERT INTO user_tracking_option (tracking_option_id, date) VALUES (${option.id}, ${date})`,
          'user_tracking_option',
        ).then((res) => {
          console.log('ressss', res);
          getData();
        });
        // categories
        //   .find((o) => o.id === category.id)
        //   .options.find((o) => o.id === option.id)
        //   .selected.push(option);
        // setCategories(categories);
      } else {
        db.rawQuery(
          `DELETE FROM user_tracking_option WHERE date=${date};
          INSERT INTO user_tracking_option (tracking_option_id, date) VALUES (${option.id}, ${date})`,
          'user_tracking_option',
        ).then((res) => {
          getData();
        });
        // categories
        //   .find((o) => o.id === category.id)
        //   .options.find((o) => o.id === option.id).selected.length = 0;
        // categories
        //   .find((o) => o.id === category.id)
        //   .options.find((o) => o.id === option.id)
        //   .selected.push(option);
        // setCategories(categories);
      }
      setDetailPageId(category.id);
      if ((category.id === 1 && option.id !== 1) || category.id === 6) {
        detailPageRef.current?.setModalVisible();
      }
    }
  };
  const updateIndex = (i) => {
    setSelectedIndex(i);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <View style={{height: 100, marginTop: 50}}>
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
      <ActionSheet
        ref={detailPageRef}
        gestureEnabled={true}
        bounceOnOpen={true}>
        <View style={styles.detailPage}>{renderDetailPage()}</View>
      </ActionSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailPage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    margin: 15,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    margin: 10,
    width: Width / 3 - 15,
    height: Height / 5 - 10,
    borderRadius: 20,
    borderWidth: 5,
    elevation: 5,
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
  input: {
    width: Width / 1.5,
  },
  buttonGroup: {
    borderRadius: 10,
    alignSelf: 'center',
    height: 75,
    width: 50,
  },
});
export default TrackingOptions;
