import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Button = styled(RectButton)`
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
