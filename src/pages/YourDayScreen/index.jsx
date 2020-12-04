import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext, TaskStatus, getUserTask } from '../../state/tasks';
import TaskListItem from './components/TaskListItem';
import OrggButton from '../../components/OrggButton';
import {
  Container, List, TitleText, SubTitleText,
} from './styles';
import { daysFull } from '../../utils/utils';
import { dayContext } from '../../state/day';

const YourDayScreen = () => {
  const { state: taskIDList } = useContext(dayContext);
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
  }, [tasksDB]);

  const handleBegin = () => handleNavigation(
    tasks.find(
      (task) => task.Status !== TaskStatus.DONE,
    ).ID,
  );

  return (
    <Container>
      <TitleText>
        {your}
        {' '}
        {dayName}
      </TitleText>
      { doingTasks && doingTasks.length > 0 && (
      <>
        <SubTitleText doing>Fazendo agora</SubTitleText>
        <List
          data={doingTasks}
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
              item, drag, isActive,
            }) => (
              <TaskListItem
                handleNavigation={() => handleNavigation(item.ID)}
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
      <OrggButton label="Começar" onPress={handleBegin} marginBottom />
    </Container>
  );
};

export default YourDayScreen;
