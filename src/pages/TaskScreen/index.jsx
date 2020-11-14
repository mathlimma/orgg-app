import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { tasksContext } from '../../state/tasks';
import OrggButton from '../../components/OrggButton';
import {
  Container, TitleText, Content, OrdinaryText, TaskNameText, TimeText, ButtonsContainer, NextTaskButtonContainer, TitleTextBold, PriorityText, DayContainer,
} from './styles';

const TaskScreen = ({ route }) => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  const { item } = route.params;

  // TODO: use date-fns to get current day
  return (
    <Container>
      <DayContainer>
        <TitleTextBold>Segunda,</TitleTextBold>
        <TitleText>26 de outubro</TitleText>
      </DayContainer>

      <Content>
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
        <PriorityText>prioridade super alta</PriorityText>
        <OrggButton label="Iniciar tarefa" onPress={() => null} />
      </Content>

      <NextTaskButtonContainer>
        <OrggButton label="Próxima tarefa" onPress={() => null} marginBottom color={Colors.primary} labelColor={Colors.primary} />
      </NextTaskButtonContainer>

      <ButtonsContainer>
        <OrggButton color={Colors.tertiary} labelColor={Colors.primary} label="Ver listagem" onPress={() => null} />
      </ButtonsContainer>

    </Container>
  );
};

export default TaskScreen;
