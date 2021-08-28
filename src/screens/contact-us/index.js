import React, { useLayoutEffect, useState } from 'react';
import { View, Image, Linking, Modal } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { WebView } from 'react-native-webview';

// components
import BackButton from '../../components/BackButton';
import Loader from '../../components/Loader';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const ContactUs = ({ navigation }) => {
  const [showChat, setShowChat] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ارتباط با پرتو',
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
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
          color={COLOR.pink}
          onPress={() => Linking.openURL('https://t.me/Partobanoo')}
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
          type="parto"
          color={COLOR.pink}
          onPress={() => Linking.openURL('https://ble.ir/partobanoo')}
        />
        <Icon
          reverse
          size={25}
          name="eita"
          type="parto"
          color={COLOR.pink}
          onPress={() => Linking.openURL('https://eitaa.com/partobanoo')}
        />
        <Icon
          reverse
          size={25}
          name="linkedin-square"
          type="font-awesome"
          color={COLOR.pink}
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/company/partoapp')
          }
        />
        <Icon
          reverse
          size={25}
          name="instagram"
          type="antdesign"
          color={COLOR.pink}
          onPress={() => Linking.openURL('https://instagram.com/parto.app')}
        />
      </View>
      <View style={styles.items}>
        {/* <ListItem
          title="09981070258"
          onPress={() => Linking.openURL('tel:09981070258')}
          leftIcon={{ name: 'phone', type: 'font-awesome' }}
          titleStyle={styles.title}
          bottomDivider
        /> */}
        <ListItem
          title="با پشتیبان پرتو صحبت کن!"
          onPress={() => setShowChat(true)}
          rightIcon={{ name: 'assistant', type: 'parto' }}
          titleStyle={[styles.title, { alignSelf: 'flex-end' }]}
          bottomDivider
        />
        <ListItem
          title="info@parto.email"
          onPress={() => Linking.openURL('mailto:info@parto.email')}
          leftIcon={{ name: 'envelope-open', type: 'font-awesome' }}
          titleStyle={styles.title}
          bottomDivider
        />
      </View>
      {showChat && (
        <Modal
          visible={showChat}
          onDismiss={() => setShowChat(false)}
          onRequestClose={() => setShowChat(false)}
          animationType={'slide'}>
          <WebView
            source={{ uri: 'https://goftino.com/c/BdaydR' }}
            style={{ flex: 1 }}
            startInLoadingState
            // renderLoading={() => <Loader type="ActivityIndicator" />}
            // onMessage={onMessage}
          />
        </Modal>
      )}
    </View>
  );
};

export default ContactUs;
