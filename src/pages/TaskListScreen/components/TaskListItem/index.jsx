import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container, TaskTitle } from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';

// TODO: User can delete tasks

const TaskListItem = ({ item }) => {
  let Icon;
  if (item.Priority === 0) Icon = LowPriorityIcon;
  else if (item.Priority === 1) Icon = MediumPriorityIcon;
  else if (item.Priority === 2) Icon = HighPriorityIcon;
  else if (item.Priority === 3) Icon = VeryHighPriorityIcon;

  return (
    <TouchableOpacity>
      <Container>
        <TaskTitle>{item.Name}</TaskTitle>
        <Icon />
      </Container>
    </TouchableOpacity>
  );
};
TaskListItem.propTypes = {
  item: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Priority: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskListItem;
