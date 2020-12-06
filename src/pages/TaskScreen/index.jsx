import React, { useContext } from 'react';
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

  const { id } = route.params;
  const itemIndex = taskIDList.findIndex((currentId) => currentId === id);
  const item = tasks[itemIndex];

  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];

  const disableNextTask = itemIndex === taskIDList.length - 1;

  function nextTask() {
    if (itemIndex + 1 < taskIDList.length) {
      navigation.replace('Task', { id: taskIDList[itemIndex + 1] });
    }
  }

  function handleStart() {
    dispatch(startTask(item.ID));

    dispatchNotification(item.Name);
    const type = 'end';
    dispatchNotification(item.Name, type);
    BackHandler.exitApp();
  }

  const handleEnd = () => {
    dispatch(endTask());
    nextTask();
  };

  const handleStatusText = () => {
    switch (item.Status) {
      case TaskStatus.TODO: return 'A fazer';
      case TaskStatus.DOING: return 'Fazendo';
      case TaskStatus.DONE: return 'Feito';
      default: return '';
    }
  };

  const handleCardButtons = () => {
    switch (item.Status) {
      case TaskStatus.TODO: return (
        <OrggButton label="Iniciar" onPress={handleStart} />
      );
      case TaskStatus.DOING: return item.canBeInterrupted ? (
        <ButtonsContainerRow>
          <ButtonSize>
            <OrggButton label="Pausar" onPress={() => dispatch(pauseTask())} />
          </ButtonSize>
          <ButtonSize>
            <OrggButton label="Finalizar" onPress={handleEnd} />
          </ButtonSize>
        </ButtonsContainerRow>
      ) : (
        <OrggButton label="Finalizar" onPress={handleEnd} />
      );
      default: return null;
    }
  };

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
          <OrdinaryText>{handleStatusText()}</OrdinaryText>
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
          {handleCardButtons()}
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
