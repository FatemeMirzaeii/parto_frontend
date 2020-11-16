import { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { getData, storeData } from '../func';
import { AppTour, AppTourSequence } from 'react-native-app-tour';

//to maryam: Tour is undefined.
//using variables without defining them is common in typescript(.ts) but for now we are using .js files so we should define them first.
//this line should be like one of these two:
//1. const Tour =()=>{}
//export default Tour;
//2. export default () => {}.  no name is needed!

//due to our files naming convention in this project its good to name this file as 'index.js'

export default Tour = (appTourTargets, key, storeKey) => {
  const [appTour, setAppTour] = useState(true);

  useEffect(() => {
    registerFinishSequenceEvent();
  }, []);

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
  }, [appTour]);

  useEffect(() => {
    checkIfAppTourIsNeeded();
  }, []);

  const registerFinishSequenceEvent = () => {
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
  };
  const checkIfAppTourIsNeeded = async () => {
    const keyInStore = await getData(storeKey);
    setAppTour(keyInStore);
  };
};
