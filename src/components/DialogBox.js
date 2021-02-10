import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

//styles
import { COLOR, FONT, WIDTH } from '../styles/static';

const DialogBox = ({
  isVisible,
  hide,
  icon,
  text,
  twoButtons,
  firstBtnPress,
  firstBtnTitle,
  secondBtnTitle,
  secondBtnPress,
}) => {
  return (
    <Modal
      animationType="fade"
      isVisible={isVisible}
      onRequestClose={hide}
      onBackdropPress={hide}>
      <View style={styles.modal}>
        {icon}
        <Text style={styles.modalTxt}>{text}</Text>
        {twoButtons ? (
          <View style={styles.modalBtnWrapper}>
            <Button
              title={firstBtnTitle}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={firstBtnPress}
            />
            <Button
              title={secondBtnTitle}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              type="solid"
              onPress={secondBtnPress}
            />
          </View>
        ) : (
          <View style={style.oneBtnWrapper}>
            <Button
              title={firstBtnTitle}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={firstBtnPress}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};
DialogBox.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  twoButtons: PropTypes.bool,
  firstBtnPress: PropTypes.func.isRequired,
  firstBtnTitle: PropTypes.string,
  secondBtnTitle: PropTypes.string,
  secondBtnPress: PropTypes.func.isRequired,
};
DialogBox.defaultProps = {
  icon: <Icon type="antdesign" name="warning" color="#aaa" size={50} />,
  twoButtons: false,
  firstBtnTitle: 'بله',
  secondBtnTitle: 'نه',
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLOR.white,
    borderRadius: 15,
    padding: 20,
  },
  modalBtnWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    margin: 3,
  },
  modalTxt: {
    margin: 20,
    fontFamily: FONT.bold,
    fontSize: 15,
    textAlign: 'center',
    color: COLOR.textColorDark,
    lineHeight: 30,
    paddingBottom: 10,
  },
  oneBtnWrapper: {
    alignItems: 'center',
    margin: 3,
  },
  btnContainer: {
    elevation: 5,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  nextButton: {
    height: 40,
    backgroundColor: COLOR.purple,
  },
  prevButton: {
    backgroundColor: COLOR.white,
    width: WIDTH / 3,
    height: 40,
    borderRadius: 40,
  },
  btnTitle: {
    fontFamily: FONT.medium,
    fontSize: 13,
  },
  darkBtnTitle: {
    fontFamily: FONT.medium,
    fontSize: 15,
    color: COLOR.textColor,
  },
  btnSubtitle: {
    fontFamily: FONT.regular,
    fontSize: 11,
    color: COLOR.textColor,
  },
});

export default DialogBox;
