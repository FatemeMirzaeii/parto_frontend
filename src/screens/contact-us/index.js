import React, { useLayoutEffect } from 'react';
import { View, Image, Linking, Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { COLOR } from '../../styles/static';
import styles from './styles';

const ContactUs = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ارتباط با پرتو',
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../../assets/images/letter.png')}
        resizeMode="contain"
      />
      <View style={styles.iconContainer}>
        <Icon
          reverse
          size={25}
          name="telegram"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => Linking.openURL('https://t.me/Partobanoo ')}
        />
        {/* <Icon
          reverse
          size={25}
          name="whatsapp"
          type="fontisto"
          color={COLOR.btn}
          onPress={() => Linking.openURL('http://google.com')}
        /> */}
          <Icon
          reverse
          size={25}
          name="bale"
          type="Bale"
          color={COLOR.btn}
          onPress={() =>
            Linking.openURL('https://ble.ir/partobanoo')
          }
        />
         <Icon
          reverse
          size={25}
          name="linkedin"
          type="entypo"
          color={COLOR.btn}
          onPress={() =>
            Linking.openURL('https://eitaa.com/partobanoo')
          }
        />
        <Icon
          reverse
          size={25}
          name="linkedin"
          type="entypo"
          color={COLOR.btn}
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/company/partoapp')
          }
        />
        <Icon
          reverse
          size={25}
          name="instagram"
          type="antdesign"
          color={COLOR.btn}
          onPress={() => Linking.openURL('https://instagram.com/parto.app')}
        />
      </View>
      <View style={styles.items}>
        <ListItem
          title="09981070258"
          onPress={() => Linking.openURL('tel:09981070258')}
          leftIcon={{ name: 'phone', type: 'font-awesome' }}
          titleStyle={styles.title}
          bottomDivider
        />
        <ListItem
          title="info@partobanoo.com"
          onPress={() => Linking.openURL('mailto:info@partobanoo.com')}
          leftIcon={{ name: 'envelope-open', type: 'font-awesome' }}
          titleStyle={styles.title}
          bottomDivider
        />
      </View>
    </View>
  );
};

export default ContactUs;
