import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { tasksContext, TaskStatus, getUserTask } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  ScreenContainer, Container, List, TitleText, SubTitleText,
} from './styles';
import { daysFull } from '../../utils/utils';
import { dayContext, update } from '../../state/day';

const YourDayScreen = () => {
  const { state: taskIDList, dispatch } = useContext(dayContext);
  const { state: tasksDB } = useContext(tasksContext);
  const navigation = useNavigation();

  const tasks = taskIDList.map((id) => getUserTask(id));

  const [doingTasks, setDoingTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const today = new Date().getDay();
  const dayName = daysFull[today].toLowerCase();
  const your = today === 0 || today === 6 ? 'Meu' : 'Minha';

  function handleNavigation(id) {
    navigation.push('Task', { id });
  }

  function filterTasks(filter) {
    return tasks.filter((item) => item.Status === filter);
  }

  useEffect(() => {
    setDoingTasks(filterTasks(TaskStatus.DOING));
    setTodoTasks(filterTasks(TaskStatus.TODO));
    setDoneTasks(filterTasks(TaskStatus.DONE));
  }, [tasksDB, taskIDList]);

  const handleTodoDrag = (data) => {
    const draggedTaskIDList = [...doneTasks, ...doingTasks, ...data].map((task) => task.ID);
    dispatch(update(draggedTaskIDList));
  };

  const handleBegin = () => handleNavigation(
    tasks.find(
      (task) => task.Status !== TaskStatus.DONE,
    ).ID,
  );

  return (
    <ScreenContainer>
      <Container>
        <TitleText>
          {your}
          {' '}
          {dayName}
        </TitleText>
        { doingTasks && doingTasks.length > 0 && (
        <>
          <SubTitleText doing>Fazendo agora</SubTitleText>
          <FlatList
            data={doingTasks}
            renderItem={({
              item, isActive,
            }) => (
              <TaskListItem
                handleNavigation={() => handleNavigation(item.ID)}
                item={item}
                isActive={isActive}
              />
            )}
            keyExtractor={(item) => item.Name}
            showsVerticalScrollIndicator={false}
          />
        </>
        )}
        { todoTasks
      && todoTasks.length > 0 && (
      <>
        <SubTitleText>A fazer</SubTitleText>
        <List
          data={todoTasks}
          renderItem={({
            item, drag, isActive,
          }) => (
            <TaskListItem
              handleNavigation={() => handleNavigation(item.ID)}
              item={item}
              drag={drag}
              isActive={isActive}
            />
          )}
          keyExtractor={(item) => String(item.ID)}
          showsVerticalScrollIndicator={false}
          onDragEnd={({ data }) => handleTodoDrag(data)}
        />
      </>
        )}
        { doneTasks && doneTasks.length > 0 && (
        <>
          <SubTitleText>Finalizadas</SubTitleText>
          <FlatList
            data={doneTasks}
            renderItem={({
              item, isActive,
            }) => (
              <TaskListItem
                handleNavigation={() => handleNavigation(item.ID)}
                item={item}
                isActive={isActive}
              />
            )}
            keyExtractor={(item) => item.Name}
            showsVerticalScrollIndicator={false}
          />
        </>
        )}
      </Container>
      <View style={{ paddingHorizontal: 26 }}>
        <OrggButton label="Começar" onPress={handleBegin} marginBottom />
      </View>
    </ScreenContainer>
  );
};

export default YourDayScreen;
