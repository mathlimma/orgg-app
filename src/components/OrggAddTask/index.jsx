import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Keyboard } from 'react-native';
import OrggOptionGroup from '../OrggOptionGroup';
import OrggButton from '../OrggButton';
import EditForm from './components/EditForm';
import colors from '../../utils/colors';

import {
  Container, DifficultyOption, OptionText, TaskButtonContainer, TaskContainer, TitleText,
} from './styles';
import {
  getAllOrggTasks, getAllUserTasks, getUserTask, insertUserTask, tasksContext, updateUserTask,
} from '../../state/tasks';

import LowPriorityIcon from '../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../assets/VeryHighPriorityIcon';
import OrggAutoComplete from '../OrggAutoComplete';

const OrggAddTask = ({
  task, onFinish, isEditing, day,
}) => {
  const [displayEditButton, setDisplayEditButton] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(isEditing);
  const [confirmDisabled, setConfirmDisabled] = useState(!isEditing);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [hideAutocompleteList, setHideAutocompleteList] = useState(true);

  const [taskName, setTaskName] = useState(task ? task.Name : '');
  const [difficulty, setDifficulty] = useState(task ? task.Difficulty : 2);
  const [priority, setPriority] = useState(task ? task.Priority : 1);
  const [estimatedTime, setEstimatedTime] = useState(
    new Date((task ? task.EstimatedTime : 30) * 60 * 1000),
  );
  const [isTimeFixed, setIsTimeFixed] = useState(task ? task.isTaskFixed : false);
  const [startingTime, setStartingTime] = useState(new Date(task ? task.StartingTime : 0));
  const [canPause, setCanPause] = useState(task ? task.canBeInterrupted : true);

  const { dispatch } = useContext(tasksContext);

  const removeDuplicatedTasks = (orggDB, userDB) => {
    const userTaskNames = userDB.map((element) => element.Name);
    const filteredOrggDB = orggDB.filter((element) => !userTaskNames.includes(element.Name));
    return [...userDB, ...filteredOrggDB];
  };

  useEffect(() => {
    setFilteredTasks(taskName
      ? removeDuplicatedTasks(getAllOrggTasks(), getAllUserTasks())
        .filter((item) => item.Name.startsWith(taskName))
      : []);
  }, [taskName]);

  const createTask = () => {
    const estimatedMinutes = estimatedTime.getUTCHours() * 60 + estimatedTime.getUTCMinutes();

    dispatch(isEditing
      ? updateUserTask(
        task.ID, taskName, priority, estimatedMinutes, startingTime, undefined,
        isTimeFixed, difficulty, canPause,
      ) : insertUserTask(
        Date.now(), taskName, priority, startingTime, isTimeFixed, estimatedMinutes, difficulty,
        canPause, undefined, day,
      ));
    onFinish();
  };

  const handleTaskName = (input) => {
    setTaskName(input);
  };

  const handleTaskListItemPress = (item) => {
    setHideAutocompleteList(true);
    Keyboard.dismiss();

    setTaskName(item.Name);
    setDifficulty(item.Difficulty || 2);
    setPriority(item.Priority || 1);
    setEstimatedTime(new Date(item.EstimatedTime * 60 * 1000));
    setIsTimeFixed(item.isTaskFixed || false);
    setStartingTime(new Date(item.StartingTime * 60 * 1000 || 0));
    setCanPause(item.canBeInterrupted || true);

    if (item.Difficulty === undefined || item.Priority === undefined
      || item.isTaskFixed === undefined || item.canBeInterrupted === undefined
      || (item.isTaskFixed && item.startingTime === undefined)) {
      setDisplayEditForm(true);
    }

    setConfirmDisabled(false);
  };

  const handleEndEditingTaskName = () => {
    setHideAutocompleteList(true);
    const shouldDisplayEditForm = !getUserTask(taskName);

    setDisplayEditButton(!shouldDisplayEditForm);
    setDisplayEditForm(shouldDisplayEditForm);

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
          containerStyle={{ width: displayEditButton ? '70%' : '100%' }}
          hideResults={hideAutocompleteList}
          onFocus={() => setHideAutocompleteList(false)}
          onEndEditing={handleEndEditingTaskName}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTaskListItemPress(item)}>
              <Text>{item.Name}</Text>
            </TouchableOpacity>
          )}
        />
        {displayEditButton && (
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
    Difficulty: PropTypes.number.isRequired,
    EstimatedTime: PropTypes.number.isRequired,
    StartingTime: PropTypes.number.isRequired,
    isTaskFixed: PropTypes.bool.isRequired,
    canBeInterrupted: PropTypes.bool.isRequired,
  }),
  onFinish: PropTypes.func,
  isEditing: PropTypes.bool,
  day: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

OrggAddTask.defaultProps = {
  task: null,
  onFinish: null,
  isEditing: false,
};

export default OrggAddTask;
