import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
    justify-content: flex-end;
    align-items: center;
    padding: 26px;
    background-color: ${Colors.background};
    width: 100%;
    height: 100%;
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

export const ButtonContainer = styled.View`
    flex: 1;
    margin: 0 4px;
`;

export const ButtonRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
`;
