import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: ${Colors.text.inputLabelDarker};
  font-family: Inter_600SemiBold;
  font-size: 14px;
  margin: 3px 0;
`;

export const OptionTitle = styled.Text`
  color: ${Colors.text.inputLabel};
  font-family: Inter_600SemiBold;
  font-size: 14px;
  margin: 3px 0;
`;
