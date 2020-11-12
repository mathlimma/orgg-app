import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: ${Colors.background};
    width: 100%;
    height: 100%;
`;

export const TitleText = styled.Text`
    color: ${Colors.primary};
    font-family: Rubik_400Regular;
    font-size: 32px;
    text-align: center;
`;

export const SubtitleText = styled.Text`
    color: ${Colors.text.screenSubtitle};
    font-family: Rubik_400Regular;
    font-size: 20px;
    margin-top: 16px;
`;

export const BoldTitleText = styled(TitleText)`
    font-weight: bold;
`;
