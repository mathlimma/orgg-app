import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMinutes, subMinutes, format } from 'date-fns';
import { Input, Label, Text } from './styles';

const OrggDateTimePicker = ({
  label, value, onChange, mode, containerStyle,
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (_, selectedDate) => {
    setShow(false);

    const currentDate = selectedDate || value;
    onChange(mode === 'duration'
      ? subMinutes(currentDate, value.getTimezoneOffset())
      : currentDate);
  };

  const formatDuration = (time, timeUnit) => (
    time
      ? `${String(time)} ${timeUnit}`
      : ''
  );

  const formatValue = () => (
    mode === 'duration'
      ? `${formatDuration(value.getUTCHours(), 'horas')} ${formatDuration(value.getMinutes(), 'minutos')}`
      : `${format(value, 'hh:mm')}`
  );

  return (
    <View style={containerStyle}>
      {label && <Label>{label}</Label>}
      <Input
        onPress={() => setShow(true)}
      >
        <Text>
          {formatValue()}
        </Text>
      </Input>
      {show && (
        <DateTimePicker
          value={mode === 'duration'
            ? addMinutes(value, value.getTimezoneOffset())
            : value}
          onChange={handleChange}
          mode="time"
          display="spinner"
          is24Hour
        />
      )}
    </View>
  );
};

OrggDateTimePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['duration', 'time']),
  containerStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

OrggDateTimePicker.defaultProps = {
  label: null,
  value: new Date(0),
  mode: 'duration',
  containerStyle: null,
};

export default OrggDateTimePicker;
