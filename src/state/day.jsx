import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  getAllUserTasks,
  getAllUserTasksByPriorityByStatus,
  getUserTask,
  TaskStatus,
} from './tasks';

const initialState = [];
const dayContext = createContext(initialState);
const { Provider } = dayContext;

// Types
export const Types = {
  ORGANIZE: 'day/ORGANIZE',
  CLEANUP: 'day/CLEANUP',
  UPDATE: 'day/UPDATE',
};

// Action Creators
export const organize = () => ({
  type: Types.ORGANIZE,
});

export const cleanup = () => ({
  type: Types.CLEANUP,
});

export const update = (tasksIdList) => ({
  type: Types.UPDATE,
  payload: tasksIdList,
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

// Organize => ByDays, ByFixedTime
function POMODORO(UserTask, StartHours) {
  if (UserTask.filter((Task) => Task.isTaskFixed === true).length !== 0) {
    let UserTaskFixed = [];
    const auxUSerTaskFixed = getAllUserTasks().filter(
      (UserTask) => UserTask.isTaskFixed === true,
    );

    for (let i = 0; i < auxUSerTaskFixed.length; i++) {
      if (UserTaskFixed.length === 0) {
        UserTaskFixed.push(auxUSerTaskFixed[i]);
      } else {
        const UserTaskFixedLength = UserTaskFixed.length;
        for (let j = 0; j < UserTaskFixedLength; j++) {
          const auxUSerTaskFixedTime = auxUSerTaskFixed[i].StartingTime.getHours() * 60
            + auxUSerTaskFixed[i].StartingTime.getMinutes();
          const UserTaskFixedTime = UserTaskFixed[j].StartingTime.getHours() * 60
            + UserTaskFixed[j].StartingTime.getMinutes();

          if (auxUSerTaskFixedTime <= UserTaskFixedTime) {
            const aux = [];

            for (let x = 0; x < j; x++) {
              aux.push(UserTaskFixed[x]);
            }

            while (j < UserTaskFixedLength) {
              const USerTaskFixedTime2 = UserTaskFixed[j].StartingTime.getHours() * 60
                + UserTaskFixed[j].StartingTime.getMinutes();
              if (auxUSerTaskFixedTime === USerTaskFixedTime2) {
                if (auxUSerTaskFixed[i].Priority > UserTaskFixed[j].Priority) {
                  aux.push(auxUSerTaskFixed[i]);
                  break;
                }
                if (
                  auxUSerTaskFixed[i].Priority === UserTaskFixed[j].Priority
                ) {
                  if (
                    (4 - auxUSerTaskFixed[i].Difficulty)
                    * auxUSerTaskFixed[i].EstimatedTime
                    > (4 - UserTaskFixed[j].Difficulty)
                    * UserTaskFixed[j].EstimatedTime
                  ) {
                    aux.push(auxUSerTaskFixed[i]);
                    break;
                  }
                }

                aux.push(UserTaskFixed[j]);
                j++;

                if (j === UserTaskFixedLength) {
                  aux.push(auxUSerTaskFixed[i]);
                  break;
                }
              } else {
                aux.push(auxUSerTaskFixed[i]);
                break;
              }
            }

            for (let x = j; x < UserTaskFixed.length; x++) {
              aux.push(UserTaskFixed[x]);
            }

            UserTaskFixed = aux;
            break;
          }
        }
      }
    }

    let UserTaskNotFixed = UserTask.filter(
      (Task) => Task.isTaskFixed === false,
    );

    if (UserTaskNotFixed.length === 0) {
      return UserTaskFixed;
    }

    for (let i = 0; i < UserTaskFixed.length; i++) {
      let restTime = 0;
      const aux = [];

      if (
        new Date(UserTaskFixed[i].Day).getDay() === new Date().getDay()
        && new Date(UserTaskFixed[i].Day).getMonth() === new Date().getMonth()
        && new Date(UserTaskFixed[i].Day).getFullYear() === new Date().getFullYear()
      ) {
        const date = new Date();
        restTime = UserTaskFixed[i].StartingTime.getHours() * 60
          + UserTaskFixed[i].StartingTime.getMinutes()
          - date.getHours() * 60
          + date.getMinutes();
      } else {
        restTime = UserTaskFixed[i].StartingTime.getHours() * 60
          + UserTaskFixed[i].StartingTime.getMinutes()
          - StartHours * 60;
      }

      for (let j = 0; j < UserTaskNotFixed.length; j++) {
        let taskTime = 0;
        if (UserTaskNotFixed[j].canBeInterrupted === true) {
          taskTime = UserTaskNotFixed[j].EstimatedTime
            + Math.ceil(UserTaskNotFixed[j].EstimatedTime / 25) * 5;
        } else {
          taskTime = UserTaskNotFixed[j].EstimatedTime;
        }

        if (restTime - taskTime <= 0) {
          while (
            UserTaskNotFixed[j].isTaskFixed
            && j < UserTaskNotFixed.length
          ) {
            aux.push(UserTaskNotFixed[j]);
            j++;
          }

          aux.push(UserTaskFixed[i]);

          for (let x = j; x < UserTaskNotFixed.length; x++) {
            aux.push(UserTaskNotFixed[x]);
          }

          break;
        }

        aux.push(UserTaskNotFixed[j]);

        if (j + 1 === UserTaskNotFixed.length) {
          aux.push(UserTaskFixed[i]);
          break;
        }
      }

      UserTaskNotFixed = aux;
    }

    return UserTaskNotFixed;
  }

  return UserTask;
}

function ORGANIZE() {
  const newUserDatabase = [];
  const UserDatabaseByTODO = organizeByVariables();
  const days = [];

  for (let i = 0; i < UserDatabaseByTODO.length; i++) {
    if (days.filter((day) => day === UserDatabaseByTODO[i].Day).length === 0) {
      days.push(UserDatabaseByTODO[i].Day);
    }
  }

  const arrDONE = getAllUserTasks()
    .filter((item) => item.Status === TaskStatus.DONE)
    .map((item) => item.ID);

  if (arrDONE.length !== 0) newUserDatabase.push(...arrDONE);

  const arrDOING = getAllUserTasks()
    .filter((item) => item.Status === TaskStatus.DOING)
    .map((item) => item.ID);

  if (arrDOING.length !== 0) newUserDatabase.push(...arrDOING);

  for (let i = 0; i < days.length; i++) {
    const UserTaskDay = UserDatabaseByTODO.filter(
      (UserTask) => UserTask.Day === days[i],
    );
    const newOrderTask = POMODORO(UserTaskDay, 6, 22);
    for (let j = 0; j < newOrderTask.length; j++) {
      newUserDatabase.push(newOrderTask[j].ID);
    }
  }

  const tasksDay = getAllUserTasks()
    .filter(
      (Task) => new Date(Task.Day).getDay() == new Date().getDay()
        && new Date(Task.Day).getMonth() == new Date().getMonth()
        && new Date(Task.Day).getFullYear() == new Date().getFullYear(),
    )
    .map((Task) => Task.ID);

  return newUserDatabase.filter((Task) => tasksDay.includes(Task));
}

const CLEANUP = (state) => state.filter((elem) => getUserTask(elem) !== undefined);

// Reducer
const DayProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ORGANIZE:
        return ORGANIZE();
      case Types.CLEANUP:
        return CLEANUP(currentState);
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
