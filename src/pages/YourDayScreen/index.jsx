import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  Container, List, TitleText,
} from './styles';
import { daysFull } from '../../utils/utils';

const YourDayScreen = () => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  const today = new Date().getDay();
  const dayName = daysFull[today].toLowerCase();
  const your = today === 0 || today === 6 ? 'Seu' : 'Sua';

  function handleNavigation(index) {
    navigation.push('Task', { index });
  }

  return (
    <Container>
      <TitleText>
        {your}
        {' '}
        {dayName}
      </TitleText>
      <List
        data={tasks}
        renderItem={({
          item, index, drag, isActive,
        }) => (
          <TaskListItem
            handleNavigation={() => handleNavigation(index)}
            item={item}
            drag={drag}
            isActive={isActive}
          />
        )}
        keyExtractor={(item) => item.Name}
        showsVerticalScrollIndicator={false}
        onDragEnd={({ data }) => console.log(data)}
      />
      <OrggButton label="Começar" onPress={() => handleNavigation(0)} />
    </Container>
  );
};

export default YourDayScreen;
