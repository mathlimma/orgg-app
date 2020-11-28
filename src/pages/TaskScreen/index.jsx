import React, { useContext } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { format } from 'date-fns';
import { tasksContext } from '../../state/tasks';
import OrggButton from '../../components/OrggButton';
import {
  Container, TitleText, Content, OrdinaryText, TaskNameText, TimeText,
  PriorityTextBold, TaskContainer, ButtonsContainer, NextTaskButtonContainer,
  TitleTextBold, PriorityText, DayContainer,
} from './styles';
import { days, months, priorities } from '../../utils/utils';
import TaskProgress from '../../components/OrggTaskProgress';
import dispatchNotification from '../../utils/notification';

const TaskScreen = () => {
  const { state: tasks } = useContext(tasksContext);

  const navigation = useNavigation();
  const route = useRoute();

  const { index } = route.params;
  const item = tasks[index];

  const today = new Date();
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];

  function nextTask() {
    navigation.replace('Task', { index: index + 1 });
  }

  function startTask() {
    dispatchNotification(item.Name);
    BackHandler.exitApp();
  }

  console.log(item);

  const disableNextTask = index === tasks.length - 1;

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
          <OrggButton label="Iniciar tarefa" onPress={startTask} />
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
