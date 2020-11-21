import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  Container, List, TitleText,
} from './styles';

const YourDayScreen = () => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  function handleNavigation(index) {
    navigation.push('Task', { index });
  }

  return (
    <Container>
      <TitleText>Seu dia</TitleText>
      <List
        data={tasks}
        renderItem={({ item, index }) => <TaskListItem handleNavigation={() => handleNavigation(index)} item={item} />}
        keyExtractor={(item) => item.Name}
        showsVerticalScrollIndicator={false}
      />
      <OrggButton label="Começar" onPress={() => handleNavigation(0)} />
    </Container>
  );
};

export default YourDayScreen;
