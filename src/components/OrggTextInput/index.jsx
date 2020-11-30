import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input, Label } from './styles';

const OrggTextInput = ({
  label, value, placeholder, onChangeText, defaultValue, containerStyle,
}) => (
  <View style={containerStyle}>
    {label && <Label>{label}</Label>}
    <Input
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      value={value}
    />
  </View>
);

OrggTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

OrggTextInput.defaultProps = {
  label: null,
  value: '',
  placeholder: null,
  onChangeText: null,
  defaultValue: '',
  containerStyle: null,
};

export default OrggTextInput;
