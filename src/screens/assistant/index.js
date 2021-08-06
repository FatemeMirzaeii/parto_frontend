import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';

//components
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Assistant = ({ navigation }) => {
  const categories = [
    {
      id: '1',
      enName: 'midwifery',
      title: 'مامایی',
      uri: 'https://test.parto.app/chat/midwifery-dummy',
      icon: 'stethoscope',
    },
    // {
    //    id: '3',
    //   enName: 'treatise',
    //   title: 'احکام',
    //   uri: 'https://test.parto.app/chat/dummy',
    // },
    {
      id: '2',
      enName: 'nutrition',
      title: 'تغذیه',
      uri: 'https://test.parto.app/chat/nutrition-dummy',
      icon: 'nutrition',
    },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'دستیار',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
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
                navigation.navigate('Chat', {
                  id: category.id,
                  enName: category.enName,
                  uri: category.uri,
                });
              }}
              bottomDivider={categories.length - 1 !== i}
              leftIcon={{
                type: 'parto',
                name: category.icon,
                color: COLOR.icon,
              }}
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
