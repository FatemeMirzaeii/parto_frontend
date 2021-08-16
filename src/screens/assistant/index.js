import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

//components
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Assistant = ({ navigation }) => {
  const goftinoIds = useSelector((state) => state.goftino);

  const categories = [
    {
      id: '1',
      enName: 'midwifery',
      title: 'مامایی',
      uri: 'https://test.parto.app/chat/midwifery-dummy',
      icon: 'stethoscope',
      goftinoId: goftinoIds.midwiferyAssistantId,
    },
    // {
    //    id: '3',
    //   enName: 'treatise',
    //   title: 'احکام',
    //   uri: 'https://test.parto.app/chat/dummy',
    //  goftinoId: goftinoIds.treatiseAssistantId
    // },
    {
      id: '2',
      enName: 'nutrition',
      title: 'تغذیه',
      uri: 'https://test.parto.app/chat/nutrition-dummy',
      icon: 'nutrition',
      goftinoId: goftinoIds.nutritionAssistantId,
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
                  goftinoId: category.goftinoId,
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
