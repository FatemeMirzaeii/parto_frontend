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
} from '../../store/actions/goftino';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Assistant = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const goftinoIds = useSelector((state) => state.goftino);

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
    if (!goftinoIds.midwiferyAssistantId) {
      const id = await getGoftinoId(1);
      if (id) dispatch(midwiferyAssistantId(id));
    }
    if (!goftinoIds.nutritionAssistantId) {
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
      uri: 'https://test.parto.app/chat/midwifery-dummy',
      icon: 'stethoscope',
      goftinoId: goftinoIds.midwiferyAssistantId,
    },
    // {
    //   id: '3',
    //   enName: 'treatise',
    //   title: 'احکام',
    //   uri: 'https://test.parto.app/chat/dummy',
    //   goftinoId: goftinoIds.treatiseAssistantId,
    // },
    {
      id: '2',
      enName: 'nutrition',
      title: 'دستیار تغذیه',
      uri: 'https://test.parto.app/chat/nutrition-dummy',
      icon: 'nutrition',
      goftinoId: goftinoIds.nutritionAssistantId,
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
