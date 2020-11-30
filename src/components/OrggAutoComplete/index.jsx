import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import {
  Container, InputContainer, Input, Label,
} from './styles';
import Colors from '../../utils/colors';

const OrggAutoComplete = ({
  label, data, placeholder, onChangeText, defaultValue, containerStyle,
}) => (
  <Container style={containerStyle}>
    {label && <Label>{label}</Label>}
    <InputContainer label={label}>
      <Input
        data={data}
        onChangeText={onChangeText}
        keyExtractor={(item) => item.Name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        inputContainerStyle={{ borderWidth: 0 }}
        listStyle={{
          borderColor: Colors.text.inputBorder,
          borderRadius: 8,
          padding: 10,
          width: '100%',
          margin: 0,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        )}
      />
    </InputContainer>
  </Container>
);

OrggAutoComplete.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  data: PropTypes.arrayOf(PropTypes.any),
};

OrggAutoComplete.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  defaultValue: '',
  containerStyle: null,
  data: [],
};

export default OrggAutoComplete;
