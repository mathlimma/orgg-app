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

const YourDayScreen = () => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  function handleNavigation(item) {
    navigation.push('Task', { item });
  }

  return (
    <Container>
      <TitleText>Seu dia</TitleText>
      <List
        data={tasks}
        renderItem={(item) => <TaskListItem handleNavigation={handleNavigation} item={item.item} />}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      <OrggButton label="Começar" onPress={() => null} />
    </Container>
  );
};

export default YourDayScreen;
