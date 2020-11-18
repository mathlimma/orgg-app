import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { format } from 'date-fns';
import { tasksContext } from '../../state/tasks';
import OrggButton from '../../components/OrggButton';
import {
  Container, TitleText, Content, OrdinaryText, TaskNameText, TimeText, PriorityTextBold, TaskContainer, ButtonsContainer, NextTaskButtonContainer, TitleTextBold, PriorityText, DayContainer,
} from './styles';
import { days, months, priorities } from '../../utils/utils';
import TaskProgress from '../../components/OrggTaskProgress';

const TaskScreen = ({ route }) => {
  const { state: tasks } = useContext(tasksContext);
  const [today, setToday] = useState(new Date());
  const navigation = useNavigation();

  const { index } = route.params;
  const item = tasks[index];

  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];

  function nextTask() {
    navigation.replace('Task', { index: index + 1 });
  }

  console.log(tasks.length);

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
          <OrggButton label="Iniciar tarefa" onPress={() => null} />
        </TaskContainer>
      </Content>

      <NextTaskButtonContainer>
        <OrggButton label="Próxima tarefa" onPress={nextTask} marginBottom />
      </NextTaskButtonContainer>

      <ButtonsContainer>
        <OrggButton color={Colors.tertiary} labelColor={Colors.background} label="Ver listagem" onPress={() => null} />
      </ButtonsContainer>

    </Container>
  );
};

export default TaskScreen;
