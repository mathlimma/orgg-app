import styled from 'styled-components';
import Colors from '../../utils/colors';

export const Container = styled.View`
    margin: 26px;
`;

export const FixedTimeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TitleText = styled.Text`
    color: ${Colors.primary};
    font-family: Rubik_400Regular;
    font-size: 25px;
    margin-bottom: 26px;
`;

export const OptionText = styled.Text`
    color: ${Colors.text.inputLabel};
    font-family: Poppins_700Bold;
    font-size: 10px;
`;
