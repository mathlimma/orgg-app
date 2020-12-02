import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext, TaskStatus } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  Container, List, TitleText, SubTitleText,
} from './styles';
import { daysFull } from '../../utils/utils';

const YourDayScreen = () => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  const [doingTasks, setDoingTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const today = new Date().getDay();
  const dayName = daysFull[today].toLowerCase();
  const your = today === 0 || today === 6 ? 'Seu' : 'Sua';

  function handleNavigation(index) {
    navigation.push('Task', { index });
  }

  function filterTasks(filter) {
    return tasks.filter((item) => item.Status === filter);
  }

  useEffect(() => {
    setDoingTasks(filterTasks(TaskStatus.DOING));
    setTodoTasks(filterTasks(TaskStatus.TODO));
    setDoneTasks(filterTasks(TaskStatus.DONE));
  }, []);

  return (
    <Container>
      <TitleText>
        {your}
        {' '}
        {dayName}
      </TitleText>
      { doingTasks
      && doingTasks.length > 0 && (
      <>
        <SubTitleText doing>Fazendo agora</SubTitleText>
        <List
          data={doingTasks}
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
      </>
      )}
      { todoTasks
      && todoTasks.length > 0 && (
      <>
        <SubTitleText>A fazer</SubTitleText>
        <List
          data={todoTasks}
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
      </>
      )}
      { doneTasks && doneTasks.length > 0 && (
        <>
          <SubTitleText>Finalizadas</SubTitleText>
          <List
            data={doneTasks}
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
        </>
      )}
      <OrggButton label="Começar" onPress={() => handleNavigation(0)} />
    </Container>
  );
};

export default YourDayScreen;
