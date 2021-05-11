import { StyleSheet } from 'react-native';
import { COLOR, FONT } from '../../styles/static';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    right: 40,
  },
  listItemText: {
    color: COLOR.listItemTxt,
    fontFamily: FONT.regular,
    fontSize: 12,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
  field: {
    padding: 20,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    color: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: 'white',
    height: 32,
    fontSize: 14,
    padding: 8,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONT.medium,
    color: '#666666',
    fontSize: 12,
  },
});
