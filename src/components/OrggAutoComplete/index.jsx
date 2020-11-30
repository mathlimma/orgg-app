import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, InputContainer, Input, Label,
} from './styles';
import Colors from '../../utils/colors';

const OrggAutoComplete = ({
  label, data, placeholder, onChangeText, defaultValue, containerStyle, renderItem, hideResults,
  onFocus, onEndEditing,
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
        hideResults={hideResults}
        onFocus={onFocus}
        onEndEditing={onEndEditing}
        listStyle={{
          borderColor: Colors.text.inputBorder,
          borderRadius: 8,
          padding: 10,
          width: '100%',
          margin: 0,
        }}
        renderItem={renderItem}
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
  renderItem: PropTypes.func,
  hideResults: PropTypes.bool,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

OrggAutoComplete.defaultProps = {
  label: null,
  placeholder: null,
  onChangeText: null,
  defaultValue: '',
  containerStyle: null,
  data: [],
  renderItem: null,
  hideResults: false,
  onFocus: null,
  onEndEditing: null,
};

export default OrggAutoComplete;
