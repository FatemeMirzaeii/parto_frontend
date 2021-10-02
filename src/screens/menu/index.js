import React from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

// components
import UserGoal from './UserGoal';
import UserProfile from './UserProfile';
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';
import MenuSquareItem from '../../components/MenuSquareItem';
import UserWallet from '../../components/UserWallet';

// utils and store
import { removeData, shareContent } from '../../util/func';
import useModal from '../../util/hooks/useModal';
import { CafeBazaarLink, PlayStoreLink, MyketLink } from '../../services/urls';
import { signUp } from '../../store/actions/auth';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Menu = ({ navigation }) => {
  const userId = useSelector((state) => state.user.id);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();

  const {
    isVisible: registrationAlertVisible,
    toggle: toggleRegistrationAlert,
  } = useModal();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const share = () => {
    DeviceInfo.getInstallerPackageName().then((installerPackageName) => {
      let link = '';
      console.log('installerPackageName', installerPackageName);
      switch (installerPackageName) {
        case 'com.android.vending':
          link = PlayStoreLink;
          break;
        case 'com.farsitel.bazaar':
          link = CafeBazaarLink;
          break;
        case 'ir.mservices.market':
          link = MyketLink;
          break;
        default:
          link = 'www.parto.app';
          break;
      }
      shareContent(
        `لینک دانلود اپلیکیشن پرتو (دستیار هوشمند سلامت بانوان):\n${link}`,
      );
    });
  };
  return (
    <ScrollView style={styles.container}>
      <UserProfile onPress={() => navigateTo('Profile')} />
      {template !== 'Teenager' && (
        <Card>
          <UserGoal navigation={navigation} />
        </Card>
      )}
      <UserWallet navigation={navigation} />
      <View style={styles.squareItemsContainer}>
        {template === 'Main' && (
          <MenuSquareItem
            title="کد همسر"
            onPress={() => navigateTo('PartnerVerificationCode')}
            icon="man"
          />
        )}
        <MenuSquareItem
          title="احکام"
          onPress={() => navigateTo('Treatise')}
          icon="ahkam"
        />
        <MenuSquareItem
          title="تنظیمات دوره‌ها"
          onPress={() => navigateTo('CycleSettings')}
          icon="settings"
        />
        <MenuSquareItem
          title="یادآورها"
          onPress={() => navigateTo('Reminders')}
          icon="bell"
        />
        <MenuSquareItem
          title="مشاوره"
          onPress={() => {
            if (userId) navigateTo('Assistant');
            else toggleRegistrationAlert();
          }}
          icon="assistant"
        />
      </View>
      <Card>
        <ListItem
          title="قفل"
          leftIcon={{ type: 'parto', name: 'lock', color: COLOR.icon }}
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('Lock')}
          bottomDivider
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        {/* <ListItem
          title="همگام‌سازی با سرور"
          leftIcon={{ name: 'sync', color: COLOR.tiffany }}
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon ,size: 10,}}
          onPress={() => sync()}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}
        {/* <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon,size: 10, }}
          onPress={() => navigateTo('')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}
        {/* <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard', color: COLOR.icon }}
          bottomDivider
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon,size: 10, }}
          onPress={() => navigateTo('Rating')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}

        <ListItem
          title="معرفی به دوستان"
          leftIcon={{
            type: 'parto',
            name: 'tell-a-friend',
            color: COLOR.icon,
          }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={share}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        <ListItem
          title="پشتیبانی"
          leftIcon={{ type: 'parto', name: 'contact-us', color: COLOR.icon }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        <ListItem
          title="درباره‌ی پرتو"
          leftIcon={{ type: 'parto', name: 'info', color: COLOR.icon }}
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('AboutUs')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
          bottomDivider
        />
        <ListItem
          title="قوانین و مقررات"
          leftIcon={{ type: 'antdesign', name: 'warning', color: COLOR.icon }}
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('TermsOfUse')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
      </Card>
      <DialogBox
        isVisible={registrationAlertVisible}
        hide={toggleRegistrationAlert}
        text="پرتویی عزیز برای کمک گرفتن از دستیارهای پرتو لازمه اول ثبت‌نام کنی."
        firstBtnTitle="ثبت‌نام"
        firstBtnPress={async () => {
          await removeData('@token');
          dispatch(signUp());
        }}
      />
    </ScrollView>
  );
};
export default Menu;
