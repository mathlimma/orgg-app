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
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const today = new Date().getDay();
  const weekDay = new Date(route.params.selectedDate).getDay();

  tasks = tasks.filter((task) => (
    isSameDay(new Date(task.Day), new Date(route.params.selectedDate))));

  const handleTaskPress = (item) => {
    setIsEditingTask(true);
    setSelectedTask(item);
    setShowAddTask(!showAddTask);
  };

  const toggleAddTask = () => {
    setIsEditingTask(false);
    setSelectedTask(null);
    setShowAddTask(!showAddTask);
  };

  return (
    <Container>
      <TitleText>{daysFull[weekDay]}</TitleText>
      <List
        data={tasks}
        renderItem={({ item }) => <TaskListItem item={item} onPress={handleTaskPress} />}
        keyExtractor={(item) => item.Name}
        showsVerticalScrollIndicator={false}
      />
      <ButtonRow>
        <ButtonContainer>
          <OrggButton label="+" onPress={toggleAddTask} />
        </ButtonContainer>
        {weekDay === today
        && (
        <ButtonContainer>
          <OrggButton label="Organizar" onPress={() => navigation.replace('Organizing')} />
        </ButtonContainer>
        )}
      </ButtonRow>
      {showAddTask && (
        <OrggBottomSheet onPressOpacity={toggleAddTask}>
          <OrggAddTask
            onFinish={toggleAddTask}
            day={route.params.selectedDate}
            task={selectedTask}
            isEditing={isEditingTask}
          />
        </OrggBottomSheet>
      )}
    </Container>
  );
};

export default TaskListScreen;
