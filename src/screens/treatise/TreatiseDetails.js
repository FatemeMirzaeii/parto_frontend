import React, { useLayoutEffect } from 'react';
import { Dimensions, Linking, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import { HTMLTagsStyles } from '../../styles/commonStyles';

const TreatiseDetails = ({ route, navigation }) => {
  
  const { treatiseContent } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: treatiseContent.title,
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
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.contentContiner}>
        <HTML
          tagsStyles={HTMLTagsStyles}
          html={treatiseContent.body.storage.value.toString()}
          ignoredStyles={['height', 'width']}
          imagesMaxWidth={Dimensions.get('window').width}
          style={styles.HTML}
          onLinkPress={(event, url) => {
            Linking.openURL(url);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TreatiseDetails;
