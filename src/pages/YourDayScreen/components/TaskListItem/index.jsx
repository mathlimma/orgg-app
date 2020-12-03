import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import addMinutes from 'date-fns/addMinutes';

import {
  Container, TaskTitle, TopContent, BottomContent, TimeText, EditButtonText,
} from './styles';
import LowPriorityIcon from '../../../../../assets/LowPriorityIcon';
import ClockIcon from '../../../../../assets/ClockIcon';
import MediumPriorityIcon from '../../../../../assets/MediumPriorityIcon';
import HighPriorityIcon from '../../../../../assets/HighPriorityIcon';
import VeryHighPriorityIcon from '../../../../../assets/VeryHighPriorityIcon';
import OrggCreateTask from '../../../../components/OrggAddTask';
import OrggBottomSheet from '../../../../components/OrggBottomSheet';

const TaskListItem = ({
  item, handleNavigation, drag,
}) => {
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
        <OrggCreateTask task={item} onFinish={toggleEdit} isEditing day={new Date()} />
      </OrggBottomSheet>
      )}
      <TouchableOpacity onPress={() => handleNavigation(item)} onLongPress={drag}>
        <Container>
          <TopContent>
            <TaskTitle>{item?.Name}</TaskTitle>
            {item?.isTaskFixed ? <ClockIcon /> : <Icon />}
          </TopContent>

          <BottomContent>
            {item?.isTaskFixed ? (
              <TimeText>
                {/* TODO(mathlimma): Better formatting of beginning and end times */}
                Iniciar:
                {` ${new Date(item.StartingTime).getHours()} h ${new Date(item.StartingTime).getMinutes()} m `}
                Finalizar:
                {` ${new Date(addMinutes(item.StartingTime, item.EstimatedTime)).getHours()} h ${new Date(addMinutes(item.StartingTime, item.EstimatedTime)).getMinutes()} m`}
              </TimeText>
            ) : <TimeText>{`Tempo utilizado: ${item.EstimatedTime} minutos`}</TimeText>}
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
    StartingTime: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
    ]).isRequired,
    isTaskFixed: PropTypes.bool.isRequired,
  }).isRequired,
  handleNavigation: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
};

export default TaskListItem;
