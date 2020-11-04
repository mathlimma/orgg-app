import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 26px;
    background-color: ${Colors.background};
    width: 100%;
    height: 100%;
`;

export const Content = styled.View`
    width: 100%;

`;

export const ButtonsContainer = styled.View`
    width: 100%;
`;

export const TitleText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 25px;
    text-align: left;
    align-self: flex-start;
    margin-bottom: 26px;
`;

export const List = styled.FlatList`
    width: 100%;
    margin-bottom: 16px;
    flex-grow: 0;
`;

export const OrdinaryText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 16px;
    text-align: left;
    margin-bottom: 10px;
`;

export const TaskNameText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 28px;
    text-align: left;
    margin-bottom: 20px;
`;

export const TimeText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 20px;
    text-align: left;
    align-self: flex-start;
    margin-bottom: 26px;
`;
