import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Label = styled.Text`
  color: ${Colors.text.inputLabel};
  font-family: Inter_600SemiBold;
  font-size: 14px;
  margin: 3px 0;
`;

export const Text = styled.Text`
  color: ${Colors.text.inputLabel};
  font-family: Inter_600SemiBold;
  font-size: 14px;
  margin: 3px 0;
`;

export const Input = styled.TouchableOpacity`
  align-content: center;
  justify-content: center;
  border: 1px solid ${Colors.text.inputBorder};
  border-radius: 8px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 8px;
`;
