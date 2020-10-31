import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-community/picker';
import { Label, Input } from './styles';

// TODO?: Custom picker

const OrggPicker = ({ label, placeholder }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input>
      <Picker placeholder={placeholder} style={{ height: 40 }} />
    </Input>
  </>
);

OrggPicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

OrggPicker.defaultProps = {
  label: null,
  placeholder: null,
};

export default OrggPicker;
