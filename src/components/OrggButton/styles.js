import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.buttonBackground};
  border-radius: 8px;
`;

export const Label = styled.Text`
  color: ${Colors.text.button};
  font-family: Poppins_700Bold;
  margin: 11.5px;
`;
