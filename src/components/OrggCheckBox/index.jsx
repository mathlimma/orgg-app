import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import Colors from '../../utils/colors';

const OrggCheckBox = ({ checked, onPress, title }) => (
  <CheckBox
    checkedColor={Colors.primary}
    checked={checked}
    onPress={onPress}
    title={title}
    containerStyle={{
      backgroundColor: Colors.background,
      borderWidth: 0,
      paddingLeft: 0,
      marginLeft: 0,
    }}
    titleProps={{
      style: {
        color: Colors.text.inputLabel,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
      },
    }}
  />
);

OrggCheckBox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

OrggCheckBox.defaultProps = {
  checked: false,
  onPress: null,
  title: null,
};

export default OrggCheckBox;
