import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from './styles';

const OrggTextInput = ({ label, placeholder, onChangeText }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input placeholder={placeholder} onChangeText={onChangeText} />
  </>
);

OrggTextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

OrggTextInput.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
};

export default OrggTextInput;
