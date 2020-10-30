import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View` 
  padding-right: 7px;
`;

export const HeaderText = styled.Text` 
  color: ${Colors.text.appHeader};
  font-family: Poppins_500Medium;
`;
