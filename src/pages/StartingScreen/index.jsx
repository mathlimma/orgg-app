import React from 'react';
import StartingAddButtonIcon from '../../../assets/StartingAddButtonIcon';

import {
  Container, AddButtonContainer, BodyText, TitleText,
} from './styles';

const StartingScreen = () => (
  <Container>
    <TitleText>O que você precisa fazer hoje?</TitleText>
    <AddButtonContainer>
      <StartingAddButtonIcon />
      <BodyText>Inserir uma tarefa</BodyText>
    </AddButtonContainer>
  </Container>
);

export default StartingScreen;
