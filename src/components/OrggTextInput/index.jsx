import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from './styles';

const OrggTextInput = ({ label, placeholder }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input placeholder={placeholder} />
  </>
);

OrggTextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

OrggTextInput.defaultProps = {
  label: null,
  placeholder: null,
};

export default OrggTextInput;
