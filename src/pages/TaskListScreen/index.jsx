import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import {
  Container, List, TitleText, ButtonContainer, ButtonRow,
} from './styles';
import OrggBottomSheet from '../../components/OrggBottomSheet';
import OrggAddTask from '../../components/OrggAddTask';
import OrggButton from '../../components/OrggButton';

// TODO: Implement onPress in "Organizar" OrggButton

const TaskListScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  return (
    <Container>
      <TitleText>Sua Lista</TitleText>
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
        <ButtonContainer>
          <OrggButton label="Organizar" onPress={() => navigation.replace('Organizing')} />
        </ButtonContainer>
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
