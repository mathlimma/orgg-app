import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'react-native-elements';
import { Label, LabelContainer, OptionTitle } from './styles';
import Colors from '../../utils/colors';

const OrggOptionGroup = ({
  label, defaultIndex, onPress, options, titles,
}) => {
  const [index, setIndex] = useState(defaultIndex);

  const handlePress = (selectedIndex) => {
    setIndex(selectedIndex);
    onPress(selectedIndex);
  };

  return (
    <>
      <LabelContainer>
        {label && <Label>{label}</Label>}
        {titles && <OptionTitle>{titles[index]}</OptionTitle>}
      </LabelContainer>
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
        textStyle={{ fontSize: 25 }}
      />
    </>
  );
};

OrggOptionGroup.propTypes = {
  label: PropTypes.string,
  defaultIndex: PropTypes.number,
  onPress: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string),
};

OrggOptionGroup.defaultProps = {
  label: null,
  defaultIndex: 0,
  onPress: null,
  titles: null,
};

export default OrggOptionGroup;
