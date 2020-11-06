import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from './styles';

const OrggTextInput = ({
  label, placeholder, onChangeText, defaultValue,
}) => (
  <>
    {label && <Label>{label}</Label>}
    <Input
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
    />
  </>
);

OrggTextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  defaultValue: PropTypes.string,
};

OrggTextInput.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  defaultValue: '',
};

export default OrggTextInput;
