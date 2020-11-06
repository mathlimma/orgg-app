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
import OrggEditTask from '../../../../components/OrggEditTask';
import OrggBottomSheet from '../../../../components/OrggBottomSheet';

const TaskListItem = ({ item, handleNavigation }) => {
  const [showEditTask, setShowEditTask] = useState(false);

  let Icon;
  if (item.priority === 0) Icon = LowPriorityIcon;
  else if (item.priority === 1) Icon = MediumPriorityIcon;
  else if (item.priority === 2) Icon = HighPriorityIcon;
  else if (item.priority === 3) Icon = VeryHighPriorityIcon;

  function toggleEdit() {
    setShowEditTask(!showEditTask);
  }

  return (
    <>
      {showEditTask && (
      <OrggBottomSheet onPressOpacity={toggleEdit}>
        <OrggEditTask task={item} onFinish={toggleEdit} />
      </OrggBottomSheet>
      )}
      <TouchableOpacity onPress={() => handleNavigation(item)}>
        <Container>
          <TopContent>
            <TaskTitle>{item?.name}</TaskTitle>
            <Icon />
          </TopContent>

          <BottomContent>
            <TimeText>{`${item.estimate} minutos`}</TimeText>
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
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    estimate: PropTypes.number.isRequired,
  }).isRequired,
  handleNavigation: PropTypes.func.isRequired,
};

export default TaskListItem;
