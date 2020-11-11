import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tasksContext } from '../../state/tasks';
import OrggButton from '../../components/OrggButton';
import {
  Container, TitleText, Content, OrdinaryText, TaskNameText, TimeText, ButtonsContainer,
} from './styles';

const TaskScreen = ({ route }) => {
  const { state: tasks } = useContext(tasksContext);
  const navigation = useNavigation();

  const { item } = route.params;

  return (
    <Container>
      <TitleText>Segunda, 26 de outubro</TitleText>

      <Content>
        <OrdinaryText>Fazendo agora</OrdinaryText>
        <TaskNameText>{item?.Name}</TaskNameText>
        <TimeText>Tempo estimado: {Math.floor(item?.EstimatedTime/60)}h{item?.EstimatedTime - Math.floor(item?.EstimatedTime/60)*60}min</TimeText>

        <OrggButton label="Iniciar pomodoro" onPress={() => null} />
      </Content>

      <ButtonsContainer>
        <OrggButton label="Próxima tarefa" onPress={() => null} marginBottom />
        <OrggButton label="Ver listagem" onPress={() => null} />
      </ButtonsContainer>

    </Container>
  );
};

export default TaskScreen;
