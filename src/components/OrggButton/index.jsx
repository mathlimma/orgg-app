import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from './styles';
import colors from '../../utils/colors';

const OrggButton = ({
  onPress, label, marginBottom, color = colors.primary, labelColor = colors.background,
}) => (
  <Button onPress={onPress} marginBottom={marginBottom} color={color}>
    <Label labelColor={labelColor}>{label}</Label>
  </Button>
);

OrggButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  marginBottom: PropTypes.bool,
  color: PropTypes.string,
  labelColor: PropTypes.string,
};

OrggButton.defaultProps = {
  color: colors.primary,
  labelColor: colors.background,
  marginBottom: false,
};

export default OrggButton;
