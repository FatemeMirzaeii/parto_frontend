import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

//components
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import AxAPI from '../../services/AxAPI';
import {
  midwiferyAssistantId,
  nutritionAssistantId,
  treatiseAssistantId,
} from '../../store/actions/goftino';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Assistant = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const goftino = useSelector((state) => state.goftino);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'مشاوره',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    searchForGoftinoIds();
  }, []);

  const searchForGoftinoIds = async () => {
    if (!goftino.midwiferyAssistantId) {
      const id = await getGoftinoId(1);
      if (id) dispatch(midwiferyAssistantId(id));
    }
    if (!goftino.nutritionAssistantId) {
      const id = await getGoftinoId(2);
      if (id) dispatch(nutritionAssistantId(id));
    }
  };

  const getGoftinoId = async (categoryId) => {
    try {
      const ax = await AxAPI();
      const res = await ax.get(
        `/message/messageInfo/${userId}/${categoryId}/goftinoId/fa`,
      );
      if (!res) return false;
      return res.data.data.goftinoId;
    } catch (err) {
      switch (err.response.status) {
        case 404:
          return false;
        default:
          break;
      }
    }
  };

  const categories = [
    {
      id: '1',
      enName: 'midwifery',
      title: 'دستیار مامایی',
      uri: 'https://my.parto.app/chat/midwifery-dummy',
      icon: 'stethoscope',
      goftinoId: goftino.midwiferyAssistantId,
      // dispatchFunc: () => midwiferyAssistantId(),
    },
    // {
    //   id: '3',
    //   enName: 'treatise',
    //   title: 'احکام',
    //   uri: 'https://my.parto.app/chat/dummy',
    //   goftinoId: goftinoIds.treatiseAssistantId,
    // dispatchFunc: () => treatiseAssistantId,
    // },
    {
      id: '2',
      enName: 'nutrition',
      title: 'دستیار تغذیه',
      uri: 'https://my.parto.app/chat/nutrition-dummy',
      icon: 'nutrition',
      goftinoId: goftino.nutritionAssistantId,
      // dispatchFunc: () => nutritionAssistantId(),
    },
  ];

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
                  title: category.title,
                  uri: category.uri,
                  goftinoId: category.goftinoId,
                  // dispatchFunc: () => category.dispatchFunc(),
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
