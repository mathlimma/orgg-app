import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OrggOptionGroup from '../OrggOptionGroup';
import OrggButton from '../OrggButton';
import EditForm from './components/EditForm';
import colors from '../../utils/colors';

import {
  Container, DifficultyOption, OptionText, TaskButtonContainer, TaskContainer, TitleText,
} from './styles';
import {
  getAllOrggTasks, insertUserTask, tasksContext, updateUserTask,
} from '../../state/tasks';

import LowPriorityIcon from '../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../assets/VeryHighPriorityIcon';
import OrggAutoComplete from '../OrggAutoComplete';

const OrggAddTask = ({ task, onFinish, isEditing }) => {
  const [taskExists, setTaskExists] = useState(!!task);
  const [displayEditForm, setDisplayEditForm] = useState(isEditing);
  const [confirmDisabled, setConfirmDisabled] = useState(!isEditing);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [taskName, setTaskName] = useState(task ? task.Name : '');
  const [difficulty, setDifficulty] = useState(2);
  const [priority, setPriority] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(task ? String(task.EstimatedTime) : '');
  const [isTimeFixed, setIsTimeFixed] = useState(false);
  const [startingTime, setStartingTime] = useState('12h');
  const [canPause, setCanPause] = useState(true);

  const { dispatch } = useContext(tasksContext);

  useEffect(() => {
    setFilteredTasks(taskName
      ? getAllOrggTasks().filter((item) => item.Name.startsWith(taskName))
      : []);
  }, [taskName]);

  const createTask = () => {
    dispatch(isEditing
      ? updateUserTask(
        task.Name, taskName, priority, Number(estimatedTime),
      ) : insertUserTask(
        taskName, priority, startingTime, isTimeFixed, estimatedTime,
      ));
    onFinish();
  };

  const handleTaskName = (input) => {
    setTaskName(input);
    // Search for task, if it exists update component state from database
    // Placeholders:
    setTaskExists(true);
    setConfirmDisabled(false);
  };

  const priorityOptions = [
    {
      element: () => (
        <DifficultyOption>
          <LowPriorityIcon height={25} width={25} />
          <OptionText>Baixa</OptionText>
        </DifficultyOption>
      ),
    },
    {
      element: () => (
        <DifficultyOption>
          <MediumPriorityIcon height={25} width={25} />
          <OptionText>Média</OptionText>
        </DifficultyOption>
      ),
    },
    {
      element: () => (
        <DifficultyOption>
          <HighPriorityIcon height={25} width={25} />
          <OptionText>Alta</OptionText>
        </DifficultyOption>
      ),
    },
    {
      element: () => (
        <DifficultyOption>
          <VeryHighPriorityIcon height={25} width={25} />
          <OptionText>Muito Alta</OptionText>
        </DifficultyOption>
      ),
    }];

  return (
    <Container>
      <TitleText>Nova tarefa</TitleText>
      <TaskContainer>
        <OrggAutoComplete
          label="Minha tarefa"
          data={filteredTasks}
          onChangeText={handleTaskName}
          keyExtractor={(item) => item.Name}
          placeholder="Estudar matemática"
          defaultValue={taskName}
          containerStyle={{ width: displayEditForm || !taskExists ? '100%' : '70%' }}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.Name}</Text>
            </TouchableOpacity>
          )}
        />
        {!displayEditForm && taskExists && (
        <TaskButtonContainer>
          <OrggButton
            label="⚙️"
            marginBottom
            onPress={() => setDisplayEditForm(true)}
          />
        </TaskButtonContainer>
        )}
      </TaskContainer>
      {displayEditForm && (
      <EditForm
        difficultyState={[difficulty, setDifficulty]}
        estimatedTimeState={[estimatedTime, setEstimatedTime]}
        isTimeFixedState={[isTimeFixed, setIsTimeFixed]}
        startingTimeState={[startingTime, setStartingTime]}
        canPauseState={[canPause, setCanPause]}
      />
      )}
      <OrggOptionGroup
        label="Qual a prioridade disto?"
        onPress={setPriority}
        defaultIndex={priority}
        options={priorityOptions}
      />
      <OrggButton
        label="Próximo"
        onPress={createTask}
        color={colors.primary}
        disabled={confirmDisabled}
      />
    </Container>
  );
};

OrggAddTask.propTypes = {
  task: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Priority: PropTypes.number.isRequired,
    EstimatedTime: PropTypes.number.isRequired,
  }),
  onFinish: PropTypes.func,
  isEditing: PropTypes.bool,
};

OrggAddTask.defaultProps = {
  task: null,
  onFinish: null,
  isEditing: false,
};

export default OrggAddTask;
