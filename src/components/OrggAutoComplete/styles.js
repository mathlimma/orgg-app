import Autocomplete from 'react-native-autocomplete-input';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  margin-bottom: 50px;
`;

export const Label = styled.Text`
  color: ${Colors.text.inputLabel};
  font-family: Inter_600SemiBold;
  font-size: 14px;
  margin: 3px 0;
`;

export const InputContainer = styled.View`
  position: absolute;
  top: ${(props) => (props.label ? '26px' : '0')};
  left: 0;
  right: 0;
  z-index: 10;
`;

export const Input = styled(Autocomplete)`
  border: 1px solid ${Colors.text.inputBorder};
  border-radius: 8px;
  height: 40px;
  padding: 0 8px;
`;
