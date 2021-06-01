import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

// components and utils
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import { getReminders } from '../../util/database/query';

// styles
import globalStyles from '../../styles';
import { COLOR } from '../../styles/static';

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);

  useEffect(() => {
    getReminders().then((r) => {
      if (template === 'Teenager') r.splice(1, 1);
      setReminders(r);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادآور‌ها',
      headerLeft: null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  });

  return (
    <ScrollView>
      <Card>
        {reminders.map((r, index) => {
          return (
            <ListItem
              key={r.id}
              title={r.title}
              onPress={() =>
                navigation.navigate('ReminderSetting', { reminder: r })
              }
              bottomDivider={index === reminders.length - 1 ? false : true}
              disabled={
                r.id !== 1 &&
                (cycle.lastPeriodDate !== '' || cycle.isPregnant !== 0)
                  ? true
                  : false
              }
              leftIcon={{ type: 'parto', name: 'bell', color: COLOR.icon }}
              titleStyle={globalStyles.listItemTitle}
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
            />
          );
        })}
      </Card>
    </ScrollView>
  );
};
export default Reminders;
