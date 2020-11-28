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

export const TaskContainer = styled.View`
    width: 100%;
    background-color: ${Colors.secondary};
    padding: 30px;
    border-radius: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
`;

export const Content = styled.View`
    width: 100%;
`;

export const DayContainer = styled.View`
    align-self: flex-start;
`;

export const ButtonsContainer = styled.View`
    width: 100%;
`;

export const ButtonsContainerRow = styled.View`
    width: 100%
    flex-direction: row;
    justify-content: space-between;
`;

export const ButtonSize = styled.View`
    width: 45%;
`;
export const NextTaskButtonContainer = styled.View`
    align-self: flex-end;
    width: 50%;
`;

export const TitleText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 20px;
    text-align: left;
    align-self: flex-start;
`;

export const TitleTextBold = styled(TitleText)`
    font-weight: bold;
`;

export const List = styled.FlatList`
    width: 100%;
    margin-bottom: 16px;
    flex-grow: 0;
`;

export const OrdinaryText = styled.Text`
    color: ${Colors.text.header};
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
    font-weight: bold;
`;

export const TimeText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 16px;
    text-align: left;
    align-self: flex-start;
    margin-bottom: 5px;
`;

export const PriorityText = styled(TimeText)`
    margin-bottom: 20px;
`;

export const PriorityTextBold = styled(TimeText)`
    font-weight: bold;
`;
