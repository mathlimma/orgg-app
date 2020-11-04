import React, { useContext, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import OrggTextInput from '../OrggTextInput';
import OrggPicker from '../OrggPicker';
import OrggButton from '../OrggButton';
import { Container, TitleText } from './styles';
import { add, tasksContext, mock } from '../../state/tasks';

const OrggEditTask = ({ onFinish }) => {
  const [task, setTask] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const [priority, setPriority] = useState(1);

  const { dispatch } = useContext(tasksContext);
  const createTask = () => {
    // NEXT_SPRINT: dispatch(add(task, priority));
    dispatch(mock(task, priority));
    onFinish();
  };

  return (
    <Container>
      <TitleText>Editar tarefa</TitleText>

      <OrggTextInput label="Sua tarefa" onChangeText={(text) => setTask(text)} />
      <OrggPicker
        label="Prioridade"
        onValueChange={(value) => setPriority(value)}
        selectedValue={priority}
      >
        <Picker.Item label="Baixa" value={0} />
        <Picker.Item label="Média" value={1} />
        <Picker.Item label="Alta" value={2} />
        <Picker.Item label="Muito alta" value={3} />
      </OrggPicker>
      <OrggTextInput label="Tempo Estimado" onChangeText={(text) => setEstimatedTime(text)} />

      <OrggButton label="Editar" onPress={createTask} />
    </Container>
  );
};

OrggEditTask.propTypes = {
  onFinish: PropTypes.func,
};

OrggEditTask.defaultProps = {
  onFinish: null,
};

export default OrggEditTask;
