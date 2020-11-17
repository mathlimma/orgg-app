import styled from 'styled-components';
import Colors from '../../../../utils/colors';

export const FixedTimeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const OptionText = styled.Text`
    color: ${Colors.text.inputLabel};
    font-family: Poppins_700Bold;
    font-size: 10px;
`;
