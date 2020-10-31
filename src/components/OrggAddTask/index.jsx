import React, { useState } from 'react';
import OrggTextInput from '../OrggTextInput';
import OrggPicker from '../OrggPicker';
import OrggButton from '../OrggButton';
import { Container, TitleText } from './styles';

const OrggAddTask = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('normal');

  return (
    <Container>
      <TitleText>Nova tarefa</TitleText>
      <OrggTextInput label="Sua tarefa" />
      <OrggPicker label="Prioridade" />
      <OrggButton label="Próximo" />
    </Container>
  );
};

export default OrggAddTask;
