import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background-color: ${Colors.background};
    width: 100%;
    height: 100%;
`;

export const CalendarContainer = styled.View`
    margin: 0px;
`;

export const TitleText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 25px;
    text-align: center;
    position: absolute;
    top: 50px;
`;
