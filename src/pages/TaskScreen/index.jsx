import React, { useContext, useState } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { format } from 'date-fns';
import {
  getUserTask, pauseTask, endTask, tasksContext, startTask, TaskStatus,
} from '../../state/tasks';
import OrggButton from '../../components/OrggButton';
import {
  Container, TitleText, Content, OrdinaryText, TaskNameText, TimeText,
  PriorityTextBold, TaskContainer, ButtonsContainer, ButtonSize, ButtonsContainerRow,
  NextTaskButtonContainer,
  TitleTextBold, PriorityText, DayContainer,
} from './styles';
import { days, months, priorities } from '../../utils/utils';
import TaskProgress from '../../components/OrggTaskProgress';
import dispatchNotification from '../../utils/notification';
import { dayContext } from '../../state/day';

const TaskScreen = () => {
  const { state: taskIDList } = useContext(dayContext);
  const { dispatch } = useContext(tasksContext);

  const tasks = taskIDList.map((id) => getUserTask(id));

  const navigation = useNavigation();
  const route = useRoute();

  const { index } = route.params;
  const item = tasks[index];

  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const [startedTask, setStartedTask] = useState(item.Status === TaskStatus.DOING);

  function nextTask() {
    navigation.replace('Task', { index: index + 1 });
  }

  function handleStart() {
    setStartedTask(true);
    dispatch(startTask(item.ID));

    dispatchNotification(item.Name);
    BackHandler.exitApp();
  }

  const disableNextTask = index === taskIDList.length - 1;

  return (
    <Container>
      <DayContainer>
        <TitleTextBold>
          {dayName}
          ,
        </TitleTextBold>
        <TitleText>{`${format(today, 'dd')} de ${monthName}`}</TitleText>
      </DayContainer>

      <Content>
        <TaskProgress taskList={tasks} />

        <TaskContainer>
          <OrdinaryText>A fazer</OrdinaryText>
          <TaskNameText>{item?.Name}</TaskNameText>
          <TimeText>
            Tempo estimado:
            {' '}
            {Math.floor(item?.EstimatedTime / 60)}
            h
            {item?.EstimatedTime - Math.floor(item?.EstimatedTime / 60) * 60}
            min
          </TimeText>
          <PriorityText>
            Prioridade:
            {' '}
            <PriorityTextBold>
              {priorities[item?.Priority]}
            </PriorityTextBold>
          </PriorityText>
          {startedTask ? (
            <ButtonsContainerRow>
              <ButtonSize>
                <OrggButton label="Pausar" onPress={() => dispatch(pauseTask())} />
              </ButtonSize>
              <ButtonSize>
                <OrggButton label="Finalizar" onPress={() => dispatch(endTask())} />
              </ButtonSize>
            </ButtonsContainerRow>
          ) : <OrggButton label="Iniciar" onPress={handleStart} />}
        </TaskContainer>
      </Content>

      { !disableNextTask && (
      <NextTaskButtonContainer>
        <OrggButton label="Próxima tarefa" onPress={nextTask} marginBottom />
      </NextTaskButtonContainer>
      )}

      <ButtonsContainer>
        <OrggButton color={Colors.tertiary} labelColor={Colors.background} label="Ver listagem" onPress={() => navigation.goBack()} />
      </ButtonsContainer>

    </Container>
  );
};

export default TaskScreen;
