import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  margin-bottom: ${(props) => (props.marginBottom ? 18 : 0)}px;
`;

export const Label = styled.Text`
  color: ${(props) => props.labelColor};
  font-family: Poppins_700Bold;
  margin: 11.5px;
`;
