import styled from 'styled-components';
import Colors from '../../utils/colors';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
    margin: 26px;
    margin-bottom: 0;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TaskContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TaskButtonContainer = styled.View`
    width: 25%;
    align-self: flex-end;
    height: 50px;
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

export const DifficultyOption = styled.View`
    justify-content: center;
    align-items: center;
`;
