import React from 'react';
import PropTypes, { number } from 'prop-types';
import { Picker } from '@react-native-community/picker';
import { Label, Input } from './styles';

// TODO?: Custom picker

const OrggPicker = ({
  children, label, placeholder, onValueChange, selectedValue,
}) => (
  <>
    {label && <Label>{label}</Label>}
    <Input>
      <Picker
        placeholder={placeholder}
        style={{ height: 40 }}
        onValueChange={onValueChange}
        selectedValue={selectedValue}
      >
        {children}
      </Picker>
    </Input>
  </>
);

OrggPicker.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func,
  selectedValue: number.isRequired,
};

OrggPicker.defaultProps = {
  children: null,
  label: null,
  placeholder: null,
  onValueChange: null,
};

export default OrggPicker;
