import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Form = (props) => {
  return (
    <>
      <Ptxt style={styles.title}>{props.title}</Ptxt>
      {props.phoneInput &&
      <PhoneInput
        containerStyle={{
          width: WIDTH * 0.6,
          borderRadius: 10,
          alignSelf: 'center',
          margin: 20,
        }}
        textContainerStyle={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          marginLeft: -10,
        }}
        textInputStyle={styles.phoneInputTxt}
        codeTextStyle={styles.phoneInputTxt}
        placeholder="۹ - - - - - - - - -"
        defaultCode="IR"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        withShadow
        autoFocus
      />}
      { props.codeField &&
        <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={5}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      }

      <Button
        title={props.btnTxt}
        // disabled={!lastPeriodDate}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        titleStyle={styles.btnTitle}
        // onPress={onNextPress}
      />
    </>
  );
};
// Card.propTypes = {
//   children: PropTypes.node.isRequired,
//   color: PropTypes.string,
// };
// Card.defaultProps = {
//   color: '#fff',
//   children: <View />,
// };
const styles = StyleSheet.create({
  phoneInput: {
    // marginTop:6,
    // margin: 5,
    // marginLeft: 40,
    margin: 10,
    alignSelf: 'center',
    padding: 5,
    height: 50,
    width: 120,
    borderColor: '#9FE6FD',
    borderWidth: 1,
    fontSize: 15,
    fontFamily: FONT.regular,
  },
  phoneInputTxt: {
    fontFamily: FONT.regular,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH *0.6,
    height: 40,
    borderRadius: 40,
    alignSelf:'center'
  },
  button: {
    height: 40,
    backgroundColor: COLOR.btn,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZE[14],
  },
  title: {
    fontSize: SIZE[15],
    color: COLOR.black,
    alignSelf: 'center',
    fontFamily: FONT.medium,
  },
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    width: WIDTH * 0.6,
    alignSelf: 'center',
  },
  cell: {
    fontFamily: FONT.regular,
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default Form;
