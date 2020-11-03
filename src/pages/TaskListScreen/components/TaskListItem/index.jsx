import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Container, TaskTitle } from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';

// TODO: User can delete tasks

const TaskListItem = ({ item }) => {
  let Icon;
  if (item.priority === 0) Icon = LowPriorityIcon;
  else if (item.priority === 1) Icon = MediumPriorityIcon;
  else if (item.priority === 2) Icon = HighPriorityIcon;
  else if (item.priority === 3) Icon = VeryHighPriorityIcon;

  return (
    <TouchableOpacity>
      <Container>
        <TaskTitle>{item.name}</TaskTitle>
        <View>
          <Icon />
        </View>
      </Container>
    </TouchableOpacity>
  );
};
TaskListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskListItem;
