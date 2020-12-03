import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getAllUserTasks, getAllUserTasksByPriorityByStatus, TaskStatus } from './tasks';

const initialState = [];
const dayContext = createContext(initialState);
const { Provider } = dayContext;

// Types
export const Types = {
  ORGANIZE: 'day/ORGANIZE',
  UPDATE: 'day/UPDATE',
};

// Action Creators
export const organize = () => ({
  type: Types.ORGANIZE,
});

export const update = (taskIDs) => ({
  type: Types.UPDATE,
  payload: {
    taskIDs,
  },
});

// Priority => Difficulty * EstimatedTime
function organizeByVariables() {
  const newUserDatabase = [];

  for (let i = 3; i >= 0; i--) {
    const arr = getAllUserTasksByPriorityByStatus(i);
    if (arr.length !== 0) {
      const n = arr.length;

      for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (
            (4 - arr[j].Difficulty) * arr[j].EstimatedTime
            < (4 - arr[j + 1].Difficulty) * arr[j + 1].EstimatedTime
          ) {
            const aux = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = aux;
          }
        }
      }

      for (let i = 0; i < n; i++) {
        newUserDatabase.push(arr[i]);
      }
    }
  }

  return newUserDatabase;
}

function POMODORO(UserTask, StartDay, EndDay) {
  if (UserTask.filter((Task) => Task.isTaskFixed === true).length !== 0) {
    const UserTaskFixed = UserTask.filter;
  }

  return UserTask;
}

// TODO: ByDays, WithFixedTime
function ORGANIZE() {
  const newUserDatabase = [];
  const UserDatabaseByTODO = organizeByVariables();
  const days = [];

  for (let i = 0; i < UserDatabaseByTODO.length; i++) {
    if (days.filter((day) => day === UserDatabaseByTODO[i].Day).length === 0) {
      days.push(UserDatabaseByTODO[i].Day);
    }
  }

  for (let i = 0; i < days.length; i++) {
    const UserTaskDay = UserDatabaseByTODO.filter(
      (UserTask) => UserTask.Day === days[i],
    );
    const newOrderTask = POMODORO(UserTaskDay, 6, 22);
    for (let j = 0; j < newOrderTask.length; j++) {
      newUserDatabase.push(newOrderTask[j].ID);
    }
  }

  const arrDOING = getAllUserTasks().filter(
    (item) => item.Status === TaskStatus.DOING,
  ).map((item) => item.ID);

  if (arrDOING.length !== 0) newUserDatabase.push(arrDOING);

  const arrDONE = getAllUserTasks().filter(
    (item) => item.Status === TaskStatus.DONE,
  ).map((item) => item.ID);

  if (arrDONE.length !== 0) newUserDatabase.push(arrDONE);

  return newUserDatabase;
}

// Reducer
const DayProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ORGANIZE:
        return ORGANIZE();
      case Types.UPDATE:
        return [...action.payload];
      default:
        return currentState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

DayProvider.propTypes = {
  children: PropTypes.element,
};

DayProvider.defaultProps = {
  children: null,
};

export { dayContext, DayProvider };
