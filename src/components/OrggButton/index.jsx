import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from './styles';

const OrggButton = ({ onPress, label }) => (
  <Button onPress={onPress}>
    <Label>{label}</Label>
  </Button>
);

OrggButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default OrggButton;
