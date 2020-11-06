import React, { useContext, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import OrggTextInput from '../OrggTextInput';
import OrggPicker from '../OrggPicker';
import OrggButton from '../OrggButton';
import { Container, TitleText } from './styles';
import { update, tasksContext } from '../../state/tasks';

const OrggEditTask = ({ task, onFinish }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [priority, setPriority] = useState(task.priority);
  const [estimatedTime, setEstimatedTime] = useState(task.estimate);

  const { dispatch } = useContext(tasksContext);
  const updateTask = () => {
    dispatch(update(0, taskName, priority, Number(estimatedTime)));
    onFinish();
  };

  return (
    <Container>
      <TitleText>Editar tarefa</TitleText>

      <OrggTextInput label="Sua tarefa" onChangeText={(text) => setTaskName(text)} defaultValue={taskName} />
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
      <OrggTextInput
        label="Tempo Estimado"
        onChangeText={(text) => setEstimatedTime(text)}
        defaultValue={String(estimatedTime)}
      />

      <OrggButton label="Editar" onPress={updateTask} />
    </Container>
  );
};

OrggEditTask.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    estimate: PropTypes.number.isRequired,
  }).isRequired,
  onFinish: PropTypes.func,
};

OrggEditTask.defaultProps = {
  onFinish: null,
};

export default OrggEditTask;
