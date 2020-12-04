import styled from 'styled-components/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Colors from '../../utils/colors';

export const ScreenContainer = styled.View`
    justify-content: space-between;
    background-color: ${Colors.background};
    width: 100%;
    height: 100%;
  `;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
    padding-horizontal: 26px;
    background-color: ${Colors.background};
    width: 100%;
`;

export const TitleText = styled.Text`
    color: ${Colors.primary};
    font-family: Rubik_400Regular;
    font-weight: bold;
    font-size: 25px;
    text-align: left;
    align-self: flex-start;
`;

export const SubTitleText = styled.Text`
    color: ${(props) => (props.doing ? Colors.primary : 'black')};
    font-family: Rubik_400Regular;
    font-size: 22px;
    text-align: left;
    align-self: flex-start;
    margin-top: 26px;
`;

export const List = styled(DraggableFlatList)`
    margin-bottom: 16px;
    flex-grow: 0;
`;
