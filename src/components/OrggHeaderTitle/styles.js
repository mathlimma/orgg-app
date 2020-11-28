import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 26px;
`;

export const LogoContainer = styled.View` 
  padding-right: 7px;
`;

export const HeaderText = styled.Text` 
  color: ${Colors.text.appHeader};
  font-family: Poppins_500Medium;
`;
