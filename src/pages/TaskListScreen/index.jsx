import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  return (
    <Container>
      <TitleText>Sua Lista</TitleText>
      <List
        data={tasks}
        renderItem={TaskListItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      <OrggButton label="Organizar" onPress={() => navigation.replace('Organizing')} />
    </Container>
  );
};

export default TaskListScreen;
