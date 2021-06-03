import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

//redux
import { useDispatch, useSelector } from 'react-redux';

//components
import Card from '../../components/Card';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Assistant = ({ navigation }) => {
  const categories = [
    {
      title: 'مامایی',
      uri: 'https://test.parto.app/chat/nutrition',
    },
    {
      title: 'احکام',
      uri: 'https://test.parto.app/chat/nutrition',
    },
    {
      title: 'تغذیه',
      uri: 'https://test.parto.app/chat/nutrition',
    },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'دستیار',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.listItemTxt}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        {categories.map((category, i) => {
          return (
            <ListItem
              key={category.title}
              title={category.title}
              onPress={() => {
                navigation.navigate('Chat', { uri: category.uri });
              }}
              bottomDivider={categories.length - 1 !== i}
              leftIcon={{ type: 'parto', name: 'health', color: COLOR.icon }}
              titleStyle={globalStyles.listItemTitle}
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
            />
          );
        })}
      </Card>
    </SafeAreaView>
  );
};

export default Assistant;
