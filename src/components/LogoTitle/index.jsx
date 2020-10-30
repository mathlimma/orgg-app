import React from 'react';
import { Container, LogoContainer, HeaderText } from './styles';
import LogoSVG from '../../../assets/LogoIcon';

const LogoTitle = () => (
  <Container>
    <LogoContainer>
      <LogoSVG />
    </LogoContainer>
    <HeaderText>Orgg</HeaderText>
  </Container>
);

export default LogoTitle;
