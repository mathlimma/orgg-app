import React, { useContext } from 'react';
import { tasksContext } from '../../state/tasks';
import { Container, RoundSquare } from './styles';

const OrggTaskProgress = () => {
  const { state: tasks } = useContext(tasksContext);

  function getColor(task) {
    if (task.isTaskFixed) {
      return '#62DBDB';
    }
    return '#C9D8D8';
  }

  return (
    <Container>
      {tasks && tasks.map((task) => <RoundSquare color={getColor(task)} key={task.Name} />)}
    </Container>
  );
};

export default OrggTaskProgress;
