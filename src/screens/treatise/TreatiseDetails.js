import React, { useLayoutEffect } from 'react';
import { Icon } from 'react-native-elements';
import { Dimensions, Linking, SafeAreaView, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import styles, { HTMLTagsStyles } from './styles';
import { COLOR, FONT } from '../../styles/static';

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
