import React, { useLayoutEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import Ptxt from '../../components/Ptxt';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

const AboutUs = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'داستان پرتو',
      headerTitleStyle: {
        alignSelf: 'flex-end',
        color: 'black',
        fontSize: 17,
        fontFamily: FONT.medium,
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
    <ImageBackground
      source={require('../../../assets/images/about-us.png')}
      style={styles.bg}>
      <Ptxt style={styles.txt}>
        تولید نرم افزار پرتو به عنوان اولین نرم افزار هوش مصنوعی ایرانی مخصوص
        بانوان بر پایه تقویم قاعدگی توسط جمعی از جوانان نخبه و دغدغه مند در حوزه
        علوم رایانه و هوش مصنوعی همچنین پژوهشگران حوزه فرهنگ و سلامت بانوان در
        سال 1398 آغاز شد. آغازی پر از انگیزه و زیبا که به سوی دست یابی به سلامت
        و نشاط جسمانی و روحی همه بانوان ایرانی و مسلمانان جهان به پیش می رود.
      </Ptxt>
    </ImageBackground>
  );
};
export default AboutUs;
