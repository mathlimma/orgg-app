import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import {
  Container, TaskTitle, TopContent, BottomContent, TimeText, EditButtonText,
} from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';
import OrggCreateTask from '../../../../components/OrggAddTask';
import OrggBottomSheet from '../../../../components/OrggBottomSheet';

const TaskListItem = ({ item, handleNavigation }) => {
  const [showEditTask, setShowEditTask] = useState(false);

  let Icon;
  if (item.Priority === 0) Icon = LowPriorityIcon;
  else if (item.Priority === 1) Icon = MediumPriorityIcon;
  else if (item.Priority === 2) Icon = HighPriorityIcon;
  else if (item.Priority === 3) Icon = VeryHighPriorityIcon;

  function toggleEdit() {
    setShowEditTask(!showEditTask);
  }

  return (
    <>
      {showEditTask && (
      <OrggBottomSheet onPressOpacity={toggleEdit}>
        <OrggCreateTask task={item} onFinish={toggleEdit} isEditing />
      </OrggBottomSheet>
      )}
      <TouchableOpacity onPress={() => handleNavigation(item)}>
        <Container>
          <TopContent>
            <TaskTitle>{item?.Name}</TaskTitle>
            <Icon />
          </TopContent>

          <BottomContent>
            <TimeText>{`${item.EstimatedTime} minutos`}</TimeText>
            <TouchableOpacity onPress={toggleEdit}>
              <EditButtonText>
                Editar
              </EditButtonText>
            </TouchableOpacity>
          </BottomContent>
        </Container>
      </TouchableOpacity>
    </>

  );
};
TaskListItem.propTypes = {
  item: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Priority: PropTypes.number.isRequired,
    EstimatedTime: PropTypes.number.isRequired,
  }).isRequired,
  handleNavigation: PropTypes.func.isRequired,
};

export default TaskListItem;
