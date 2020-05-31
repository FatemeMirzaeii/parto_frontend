import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Theme} from '../../app/Theme';
import {RESTAPI} from '../../hooks/RESTAPI';
import {WebView} from 'react-native-webview';

const {colors, size, fonts} = Theme;
var restapi = new RESTAPI();

const htmlLoader = (props) => {
  const [state, setState] = useState({data: ''});
  useEffect(() => {
    async function htmlPage() {
      // https://api.partobanoo.com/article/getArticleContent/1
      const _html = await restapi.request(
        'https://api.partobanoo.com/article/getArticleContent/fa/2',
        {
          // "name": "fatemek",
          // "email": "emaiqwlo22121sdad2.smn@gmail.com",
          // "password": "123456"
        },
        'GET',
      );
      console.log('x: ', _html._data.data.content);

      setState({data: _html._data.data.content});
    }
    htmlPage();
    console.log('data: ', state.data);
  });

  return (
    <WebView
      style={{
        backgroundColor: 'pink',
        flex: 1,
        marginTop: 50,
        width: '100%',
        height: '100%',
      }}
      source={{html: state.data}}
    />
  );
};
export default htmlLoader;
const styles = StyleSheet.create({
  calendar: {
    width: '100%',
    top: 60,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});
