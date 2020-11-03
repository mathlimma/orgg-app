import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import StartingAddButtonIcon from '../../../assets/StartingAddButtonIcon';
import OrggAddTask from '../../components/OrggAddTask';
import OrggBottomSheet from '../../components/OrggBottomSheet';
import { tasksContext } from '../../state/tasks';

import {
  Container, AddButtonContainer, BodyText, TitleText,
} from './styles';

const StartingScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (tasks.length > 0) navigation.replace('TaskList');
  }, [tasks]);

  return (
    <Container>
      <TitleText>O que você precisa fazer hoje?</TitleText>
      <AddButtonContainer onPress={() => setShowAddTask(!showAddTask)}>
        <StartingAddButtonIcon />
        <BodyText>Inserir uma tarefa</BodyText>
      </AddButtonContainer>
      {showAddTask && (
        <OrggBottomSheet onPressOpacity={() => setShowAddTask(!showAddTask)}>
          <OrggAddTask onFinish={() => setShowAddTask(!showAddTask)} />
        </OrggBottomSheet>
      )}
    </Container>
  );
};

export default StartingScreen;
