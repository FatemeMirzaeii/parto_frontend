import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Realm from 'realm';
import HealthTrackingCategorySchema from '../../models/HealthTrackingCategorySchema';
import HealthTrackingOptionSchema from '../../models/HealthTrackingOptionSchema';

const TrackingOptions = () => {
  //const [options, setOptions] = useState([]);
  const [state, setState] = useState({
    categories: [],
    options: [],
  });
  useEffect(() => {
    Realm.open({
      schema: [HealthTrackingCategorySchema, HealthTrackingOptionSchema],
    }).then((realm) => {
      setState({
        categories: realm.objects(HealthTrackingCategorySchema),
        options: realm
          .objects(HealthTrackingOptionSchema)
          .filtered('category_id=1'),
      });
    });
  });
  const renderCategories = () => {
    return state.categories.map((c) => {
      return (
        <TouchableOpacity onPress={() => onCategoryPress(c.id)}>
          <View style={styles.category}>
            <Text>{c.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  const onCategoryPress = (id) => {
    Realm.open({
      schema: [HealthTrackingCategorySchema, HealthTrackingOptionSchema],
    }).then((realm) => {
      setState({
        categories: realm.objects(HealthTrackingCategorySchema),
        options: realm
          .objects(HealthTrackingOptionSchema)
          .filtered('category_id=$0', id),
      });
    });
    console.log(state.options);
  };
  const renderOptions = () => {
    return state.options.map((o) => {
      return (
        <TouchableOpacity>
          <View style={styles.option}>
            <Text>{o.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ScrollView horizontal={true}>{renderCategories()}</ScrollView>
        <View style={styles.options}>{renderOptions()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  category: {
    margin: 15,
    width: 70,
    height: 70,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    margin: 15,
    width: Dimensions.get('window').width / 3 - 10,
    height: 70,
    borderRadius: 20,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
export default TrackingOptions;
