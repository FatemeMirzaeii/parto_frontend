import { AppRegistry } from 'react-native';
import { Text } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
