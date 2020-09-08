import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'native-base';

const Treatise = () => {
  const rules = [
    {
      title: 'احکام روزه',
      iconType: 'MaterialCommunityIcons',
      nameType: 'food-variant-off',
    },
    { title: 'احکام نماز', iconType: 'FontAwesome5', iconName: 'pray' },
    {
      title: 'احکام تیمم',
      iconType: 'FontAwesome5',
      iconName: 'praying-hands',
    },
    //{title: 'احکام نفاس', iconType: 'Fontisto', iconName: 'blood-drop'},
    {
      title: 'احکام تیمم',
      iconType: 'FontAwesome5',
      iconName: 'praying-hands',
    },
    { title: 'مسائل متفرقه', iconType: 'Foundation', iconName: 'indent-more' },
  ];
  return (
    <>
      <StatusBar
        //backgroundColor="pink" barStyle="light-content"
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.main}>
        {/* <FlatList>
                     <TouchableHighlight>
                         <View>
                            <Text>

                            </Text>
                         </View>
                     </TouchableHighlight>
                 </FlatList> */}

        <FlatList
          data={rules}
          renderItem={({ item }) => (
            <TouchableHighlight style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.txt}>{item.title}</Text>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    backgroundColor: '#86dbd4',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type={item.iconType}
                    name={item.iconName}
                    // onPress={this._shareContent}
                    style={styles.icon}
                  />
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#aaa',
    padding: 10,
  },
  button: {
    // backgroundColor: '#86dbd4',
    backgroundColor: '#f4e0e1',
    // backgroundColor: '#f6a9bd',
    // flex: 1,
    //justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 3,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    //backgroundColor:'yellow'
  },
  txt: {
    // textAlign:'center',
    fontSize: 14,
    fontFamily: 'IRANSansMobile(FaNum)_Medium',
  },
  icon: {
    fontSize: 30,
  },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default Treatise;
