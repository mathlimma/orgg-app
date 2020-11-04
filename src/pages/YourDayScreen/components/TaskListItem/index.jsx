import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container, TaskTitle } from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';

// TODO: Add time estimation and "Editar" button

const TaskListItem = ({ item, handleNavigation }) => {
  let Icon;
  if (item.priority === 0) Icon = LowPriorityIcon;
  else if (item.priority === 1) Icon = MediumPriorityIcon;
  else if (item.priority === 2) Icon = HighPriorityIcon;
  else if (item.priority === 3) Icon = VeryHighPriorityIcon;

  return (
    <TouchableOpacity onPress={() => handleNavigation(item)}>
      <Container>
        <TaskTitle>{item?.name}</TaskTitle>
        <Icon />
      </Container>
    </TouchableOpacity>
  );
};
TaskListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
  handleNavigation: PropTypes.func.isRequired,
};

export default TaskListItem;
