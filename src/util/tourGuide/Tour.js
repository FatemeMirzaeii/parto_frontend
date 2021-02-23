import { useEffect, useState, useCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { getData, storeData } from '../func';
import { AppTour, AppTourSequence } from 'react-native-app-tour';

const Tour = (appTourTargets, key, storeKey) => {
  const [appTour, setAppTour] = useState(true);

  useEffect(() => {
    registerFinishSequenceEvent();
  }, [registerFinishSequenceEvent]);

  useEffect(() => {
    if (!appTour) {
      let appTourSequence = new AppTourSequence();
      setTimeout(() => {
        appTourTargets.forEach((appTourTarget) => {
          appTourSequence.add(appTourTarget);
        });
        AppTour.ShowSequence(appTourSequence);
      }, 100);
      return () => clearTimeout(appTourSequence);
    }
  }, [appTour, appTourTargets]);

  useEffect(() => {
    checkIfAppTourIsNeeded();
  }, [checkIfAppTourIsNeeded]);

  const registerFinishSequenceEvent = useCallback(() => {
    if (finishSequenceListener) {
      finishSequenceListener.remove();
    }
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      async (e) => {
        console.log(e);
        const t = appTourTargets.filter((i) => {
          i.key === key;
        });
        console.log('t', t);
        await storeData(storeKey, 'true');
      },
    );
  }, [appTourTargets, key, storeKey]);

  const checkIfAppTourIsNeeded = useCallback(async () => {
    const keyInStore = await getData(storeKey);
    setAppTour(keyInStore);
  }, [storeKey]);
};

export default Tour;
