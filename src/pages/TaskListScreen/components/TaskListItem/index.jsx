import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container, TaskTitle } from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';
import ClockIcon from '../../../../../assets/ClockIcon';

// TODO: User can delete tasks

const TaskListItem = ({ item, onPress }) => {
  let Icon;
  if (item.Priority === 0) Icon = LowPriorityIcon;
  else if (item.Priority === 1) Icon = MediumPriorityIcon;
  else if (item.Priority === 2) Icon = HighPriorityIcon;
  else if (item.Priority === 3) Icon = VeryHighPriorityIcon;

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Container>
        <TaskTitle>{item.Name}</TaskTitle>
        {item?.isTaskFixed ? <ClockIcon /> : <Icon />}
      </Container>
    </TouchableOpacity>
  );
};
TaskListItem.propTypes = {
  item: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Priority: PropTypes.number.isRequired,
    isTaskFixed: PropTypes.bool.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TaskListItem;
