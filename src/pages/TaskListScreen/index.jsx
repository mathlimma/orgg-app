import React, { useContext } from 'react';
import { tasksContext } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  Container, List, TitleText,
} from './styles';

// TODO: Implement onPress in "Organizar" OrggButton
// TODO: User cam add more tasks

const TaskListScreen = () => {
  const { state: tasks } = useContext(tasksContext);

  return (
    <Container>
      <TitleText>Sua Lista</TitleText>
      <List
        data={tasks}
        renderItem={TaskListItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      <OrggButton label="Organizar" onPress={() => null} />
    </Container>
  );
};

export default TaskListScreen;
