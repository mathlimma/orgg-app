import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-native-elements';
import { Label } from './styles';
import Colors from '../../utils/colors';

const OrggOptionGroup = ({
  label, defaultIndex, onPress, options,
}) => {
  const [index, setIndex] = useState(defaultIndex);

  const handlePress = (selectedIndex) => {
    setIndex(selectedIndex);
    onPress(selectedIndex);
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <ButtonGroup
        onPress={handlePress}
        selectedIndex={index}
        buttons={options}
        containerStyle={{ borderColor: 'transparent' }}
        buttonContainerStyle={{ borderColor: 'transparent' }}
        underlayColor="white"
        selectedButtonStyle={{
          backgroundColor: Colors.tertiary,
          opacity: 1,
          borderRadius: 30,
        }}
        buttonStyle={{ opacity: 0.35 }}
      />
    </>
  );
};

OrggOptionGroup.propTypes = {
  label: PropTypes.string,
  defaultIndex: PropTypes.number,
  onPress: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

OrggOptionGroup.defaultProps = {
  label: null,
  defaultIndex: 0,
  onPress: null,
};

export default OrggOptionGroup;
