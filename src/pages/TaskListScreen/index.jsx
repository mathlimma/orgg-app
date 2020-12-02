import React, { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isSameDay } from 'date-fns';
import { tasksContext } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import {
  Container, List, TitleText, ButtonContainer, ButtonRow,
} from './styles';
import OrggBottomSheet from '../../components/OrggBottomSheet';
import OrggAddTask from '../../components/OrggAddTask';
import OrggButton from '../../components/OrggButton';
import { daysFull } from '../../utils/utils';

const TaskListScreen = () => {
  let { state: tasks } = useContext(tasksContext);

  const [showAddTask, setShowAddTask] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const today = new Date().getDay();
  const weekDay = new Date(route.params.selectedDate).getDay();

  tasks = tasks.filter((task) => (
    isSameDay(new Date(task.Day), new Date(route.params.selectedDate))));

  return (
    <Container>
      <TitleText>{daysFull[weekDay]}</TitleText>
      <List
        data={tasks}
        renderItem={TaskListItem}
        keyExtractor={(item) => item.Name}
        showsVerticalScrollIndicator={false}
      />
      <ButtonRow>
        <ButtonContainer>
          <OrggButton label="+" onPress={() => setShowAddTask(!showAddTask)} />
        </ButtonContainer>
        {weekDay === today
        && (
        <ButtonContainer>
          <OrggButton label="Organizar" onPress={() => navigation.replace('Organizing')} />
        </ButtonContainer>
        )}
      </ButtonRow>
      {showAddTask && (
        <OrggBottomSheet onPressOpacity={() => setShowAddTask(!showAddTask)}>
          <OrggAddTask
            onFinish={() => setShowAddTask(!showAddTask)}
            day={route.params.selectedDate}
          />
        </OrggBottomSheet>
      )}
    </Container>
  );
};

export default TaskListScreen;
