import React, { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  const [showAddTask, setShowAddTask] = useState(false);

  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();
  const route = useRoute();

  // CRITICAL: There is a update anomaly when using the tasks reducer, its resets the
  //  route params property and sets it to undefined. It could be caused by a re-render.
  const today = new Date().getDay();
  const weekDay = new Date(route.params?.selectedDate).getDay() || today;

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
          <OrggAddTask onFinish={() => setShowAddTask(!showAddTask)} />
        </OrggBottomSheet>
      )}
    </Container>
  );
};

export default TaskListScreen;
