import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from './styles';
import Colors from '../../utils/colors';

const OrggButton = ({
  onPress, label, marginBottom, color = Colors.primary, labelColor = Colors.background, disabled,
}) => (
  <Button
    onPress={onPress}
    marginBottom={marginBottom}
    color={disabled ? Colors.primaryDark : color}
    disabled={disabled}
  >
    <Label labelColor={disabled ? Colors.text.inputLabelDarker : labelColor}>{label}</Label>
  </Button>
);

OrggButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  marginBottom: PropTypes.bool,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  disabled: PropTypes.bool,
};

OrggButton.defaultProps = {
  color: Colors.primary,
  labelColor: Colors.background,
  marginBottom: false,
  disabled: false,
};

export default OrggButton;
