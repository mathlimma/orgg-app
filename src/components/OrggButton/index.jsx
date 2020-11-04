import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from './styles';

const OrggButton = ({ onPress, label, marginBottom = false }) => (
  <Button onPress={onPress} marginBottom={marginBottom}>
    <Label>{label}</Label>
  </Button>
);

OrggButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  marginBottom: PropTypes.bool,
};

export default OrggButton;
