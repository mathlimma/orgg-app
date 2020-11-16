import React, { useContext, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import OrggTextInput from '../OrggTextInput';
import OrggPicker from '../OrggPicker';
import OrggButton from '../OrggButton';
import { Container, TitleText } from './styles';
import { insertUserTask, tasksContext } from '../../state/tasks';
import colors from '../../utils/colors';

const OrggAddTask = ({ onFinish }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1);

  const { dispatch } = useContext(tasksContext);
  const createTask = () => {
    dispatch(insertUserTask(task, priority));
    onFinish();
  };

  return (
    <Container>
      <TitleText>Nova tarefa</TitleText>
      <OrggTextInput label="Minha tarefa" onChangeText={(text) => setTask(text)} placeholder="ex: estudar matemática" />
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
      <OrggButton label="Próximo" onPress={createTask} color={colors.primary} />
    </Container>
  );
};

OrggAddTask.propTypes = {
  onFinish: PropTypes.func,
};

OrggAddTask.defaultProps = {
  onFinish: null,
};

export default OrggAddTask;
