import { TouchableOpacity } from 'react-native-gesture-handler';
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

export const AddButtonContainer = styled(TouchableOpacity)`
    padding-top: 50px;
    align-items: center;
`;

export const TitleText = styled.Text`
    color: ${Colors.text.screenTitle};
    font-family: Rubik_400Regular;
    font-size: 25px;
    text-align: center;
`;

export const BodyText = styled.Text`
    color: ${Colors.text.screenBody};
    font-family: Rubik_400Regular;
    margin-top: 16px;
`;
