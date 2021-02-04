import React, { useLayoutEffect } from 'react';
import { Text, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Ptxt from '../../components/Ptxt';
import { COLOR } from '../../styles/static';
import styles from './styles';

const AboutUs = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'درباره پرتو',
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
        />
      ),
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/about-us.png')}
      style={styles.bg}>
      <ScrollView style={{ marginBottom: 53 }}>
        <Text style={[styles.question, { textAlign: 'center' }]}>
          به نام خدای مهربان
          {'\n'}
        </Text>
        <Text style={styles.question}>
          {'  '}
          پرتو برای چه اهدافی ساخته شده است؟{' '}
        </Text>
        <Ptxt style={styles.txt}>
          نرم افزار پرتو برای راحت تر سپری شدن دوره ی قاعدگی شما طراحی شده است.
          برای رسیدن به این هدف مهم، پرتو در حفظ سلامت جسم و روان از شما
          پشتیبانی میکند. این پشتیبانی به شکل های متنوعی در سراسر نرم افزار و
          محتوای علمی و فرهنگی شبکه های اجتماعی پرتو تهیه شده است. پیگیری
          اختلالات هورمونی از طریق مشخص کردن دوره های قاعدگی در تقویم، ثبت شرح
          حال روزانه و در نهایت ارائه مقالات مورد نیاز شما از امکانات تخصصی این
          دستیار سلامت است. تقویم هوشمند پرتو پیش بینی و تحلیل های ارزشمندی از
          پریود آینده و پنجره ی باروری به شما نشان دهد. این قابلیت می‌تواند برای
          کاربر در حال اقدام به بارداری بسیار راهگشا باشد. امکان جالب و منحصر به
          فرد دیگر پرتو راهنمایی کاربران در مسائل عبادی و شرعی به طور 24 ساعته
          است.
        </Ptxt>
        <Text style={styles.question}>
          {'  '}
          سازندگان پرتو چه کسانی هستند؟{' '}
        </Text>
        <Ptxt style={styles.txt}>
          سازندگان پرتو گروهی از دانش‌آموختگان دانشگاه صنعتی شریف، علم و صنعت و
          تهران و الزهرا و تربیت‌مدرس با همکاری جمعی از کادر پزشکی و سلامت شامل
          پزشکان، ماماها، کارشناسان ارشد تغذیه و فیزیوتراپی هستند که نرم‌افزار
          پرتو را ساخته و بر محتوای علمی آن نظارت مستقیم دارند.
        </Ptxt>
        <Text style={styles.question}>
          {'  '}
          محتوای علمی پرتو چه منابعی دارد؟{' '}
        </Text>
        <Ptxt style={styles.txt}>
          منابع پرتو، به روز ترین مقالات و کتب مرجع علمی انگلیسی و فارسی زبان
          است که توسط کارشناسان سلامت تحقیق، جمع آوری و بازنویسی شده است. تولید
          محتوای علمی متناسب با نیاز کاربر برای تیم پرتو یک فرایند بومی سازی شده
          با گذراندن مراحلی شامل تحقیق، تدوین، بازنویسی و ویرایش است. این تلاش
          برای قابل فهم تر شدن مطالب علمی و پزشکی برای مخاطبان عزیز پرتوست.
          تولید پرتو برای همه‌ی اعضا با هدف ارزشمند آگاهی بخشی و ارائه محتوای
          علمی دقیق و سالم به زنان ایران زمین انجام شده است. سلامتی روح و جسم
          همه ی زنان جهان آرزوی قلبی ماست.
          {'\n'}
          منبع بخش پزشکی - سلامت: https://parto.app
        </Ptxt>
      </ScrollView>
    </ImageBackground>
  );
};
export default AboutUs;
