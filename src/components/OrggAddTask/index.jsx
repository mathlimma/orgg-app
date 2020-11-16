import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import OrggTextInput from '../OrggTextInput';
import OrggOptionGroup from '../OrggOptionGroup';
import OrggButton from '../OrggButton';
import { Container, TitleText } from './styles';
import { insertUserTask, tasksContext } from '../../state/tasks';
import colors from '../../utils/colors';
import LowPriorityIcon from '../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../assets/VeryHighPriorityIcon';

const OrggAddTask = ({ onFinish }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1);

  const { dispatch } = useContext(tasksContext);
  const createTask = () => {
    dispatch(insertUserTask(task, priority));
    onFinish();
  };

  const options = [
    { element: () => <LowPriorityIcon height={25} width={25} /> },
    { element: () => <MediumPriorityIcon height={25} width={25} /> },
    { element: () => <HighPriorityIcon height={25} width={25} /> },
    { element: () => <VeryHighPriorityIcon height={25} width={25} /> }];

  return (
    <Container>
      <TitleText>Nova tarefa</TitleText>
      <OrggTextInput label="Minha tarefa" onChangeText={(text) => setTask(text)} placeholder="ex: Estudar matemática" />
      <OrggOptionGroup
        label="Prioridade"
        onPress={setPriority}
        defaultIndex={priority}
        options={options}
      />
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
