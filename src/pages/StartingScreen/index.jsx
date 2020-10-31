import React, { useState } from 'react';
import StartingAddButtonIcon from '../../../assets/StartingAddButtonIcon';
import OrggAddTask from '../../components/OrggAddTask';
import OrggBottomSheet from '../../components/OrggBottomSheet';

import {
  Container, AddButtonContainer, BodyText, TitleText,
} from './styles';

const StartingScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <Container>
      <TitleText>O que você precisa fazer hoje?</TitleText>
      <AddButtonContainer onPress={() => setShowAddTask(!showAddTask)}>
        <StartingAddButtonIcon />
        <BodyText>Inserir uma tarefa</BodyText>
      </AddButtonContainer>
      {showAddTask && (
        <OrggBottomSheet onPressOpacity={() => setShowAddTask(!showAddTask)}>
          <OrggAddTask />
        </OrggBottomSheet>
      )}
    </Container>
  );
};

export default StartingScreen;
