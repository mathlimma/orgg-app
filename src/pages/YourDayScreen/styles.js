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
    color: ${Colors.primary};
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
