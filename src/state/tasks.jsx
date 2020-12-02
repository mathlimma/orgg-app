import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from '@react-native-community/async-storage';
import * as db from '../db/orgg-database.json';

let OrggDatabase = db.OrggDB;
let UserDatabase = db.UserDB;

// Store and Read database
storeDatabase = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};
/*
readDatabase = async (key) => {
  try {
    const db = await AsyncStorage.getItem(key);
    if (db !== null) {
      return JSON.parse(db);
    }
  } catch (error) { }
};
*/
getKeys = async () => {
  try {
    await AsyncStorage.getAllKeys().then((result) => result);
  } catch (error) {}
};

initialize = async () => {
  const databases = ['OrggDB', 'UserDB'];

  const log = {
    OrggDB: false,
    UserDB: false,
  };

  const keys = getKeys();

  for (key in keys) {
    log[keys[key]] = true;
  }

  for (i in databases) {
    // if (!log[databases[i]]) {
    switch (databases[i]) {
      case 'OrggDB':
        storeDatabase(key, db.OrggDB);
        OrggDatabase = db.OrggDB;
        break;
      case 'UserDB':
        storeDatabase(key, db.UserDB);
        UserDatabase = db.UserDB;
        break;
      default:
        break;
    }
    /* } else {
      switch (databases[i]) {
        case 'OrggDB': OrggDatabase = readDatabase('OrggDB'); break;
        case 'UserDB': UserDatabase = readDatabase('UserDB'); break;
        default: break;
      }
    } */
  }
};

initialize();

const initialState = db.UserDB;
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Orgg database functions
export const getAllOrggTasks = () => OrggDatabase;

export const getEstimatedTimeOrggTask = (name) => {
  const OrggTask = getAllOrggTasks().filter(
    (OrggTask) => OrggTask.Name.toLowerCase() === name.toLowerCase()
  );

  if (OrggTask !== 0) return OrggTask.EstimatedTime;

  return 90;
};

// User database functions
export const updateUserDB = () => {
  storeDatabase('UserDB', UserDatabase);
};

export const getAllUserTasks = () => UserDatabase;

export const getUserTask = (name) => {
  const UserTask = getAllUserTasks().filter(
    (UserTask) => UserTask.Name.toLowerCase() === name.toLowerCase()
  );

  if (UserTask !== 0) return UserTask[0];

  return null;
};

export const isExistsUserTask = (name) => {
  if (getUserTask(name) != null) {
    return true;
  }
  return false;
};

export const getIndexUserTask = (name) => {
  const UserTasks = getAllUserTasks();

  for (let i = 0; i < UserTasks.length; i++) {
    if (UserTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return i;
    }
  }

  return null;
};

export const getAllUserTasksByPriorityByStatus = (priority) => {
  const databaseByPriority = [];
  const database = getAllUserTasks().filter(
    (item) => item.Status === TaskStatus.TODO
  );

  for (let i = 0; i < database.length; i++) {
    if (database[i].Priority == priority) {
      databaseByPriority.push(database[i]);
    }
  }

  return databaseByPriority;
};

// Diff in minutes
export const updateElapsedTime = (Name, CurrentTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(Name)].ElapsedTime =
    newUserDatabase[getIndexUserTask(Name)].ElapsedTime +
    Math.floor(
      Math.abs(
        CurrentTime - newUserDatabase[getIndexUserTask(Name)].StartingTime
      ) /
        (1000 * 60)
    );
  UserDatabase = newUserDatabase;

  updateUserDB();
};

export const updateEstimatedTime = (Name, CurrentTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(Name)].EstimatedTime =
    newUserDatabase[getIndexUserTask(Name)].EstimatedTime -
    Math.floor(
      Math.abs(
        CurrentTime - newUserDatabase[getIndexUserTask(Name)].StartingTime
      ) /
        (1000 * 60)
    );
  UserDatabase = newUserDatabase;

  updateUserDB();
};

// --------
function ADDUSER(payload) {
  ORGANIZE();
  if (!isExistsUserTask(payload.Name)) {
    const task = {
      Name: payload.Name,
      Priority: payload.Priority,
      Difficulty: payload.Difficulty == undefined ? 2 : payload.Difficulty,
      EstimatedTime:
        payload.EstimatedTime == undefined || payload.EstimatedTime == ''
          ? getEstimatedTimeOrggTask(payload.Name)
          : payload.isTaskFixed != true
          ? payload.EstimatedTime
          : Math.floor(
              Math.abs(payload.EstimatedTime - payload.StartingTime) /
                (1000 * 60)
            ),
      StartingTime:
        payload.StartingTime == undefined || payload.isTaskFixed != true
          ? 0
          : payload.StartingTime,
      ElapsedTime: 0,
      isTaskFixed:
        payload.isTaskFixed == undefined ? false : payload.isTaskFixed,
      canBeInterrupted:
        payload.canBeInterrupted == undefined
          ? false
          : payload.canBeInterrupted,
      Day: payload.Day == undefined ? new Date() : payload.Day,
      Status: payload.Status == undefined ? TaskStatus.TODO : payload.Status,
    };

    UserDatabase.push(task);
    updateUserDB();
  }

  return UserDatabase;
}

function UPDATEUSER(payload) {
  ORGANIZE();
  if (
    !isExistsUserTask(payload.Name) ||
    payload.index.toLowerCase() == payload.Name.toLowerCase()
  ) {
    const newUserDatabase = UserDatabase;

    newUserDatabase[getIndexUserTask(payload.index)] = {
      Name:
        payload.Name == undefined
          ? getUserTask(payload.index).Name
          : payload.Name,
      Priority:
        payload.Priority == undefined
          ? getUserTask(payload.index).Priority
          : payload.Priority,
      EstimatedTime:
        payload.EstimatedTime == undefined
          ? getUserTask(payload.index).EstimatedTime
          : payload.isTaskFixed != true
          ? payload.EstimatedTime
          : Math.floor(
              Math.abs(payload.EstimatedTime - payload.StartingTime) /
                (1000 * 60)
            ),
      StartingTime:
        payload.StartingTime == undefined
          ? getUserTask(payload.index).StartingTime
          : payload.StartingTime,
      ElapsedTime:
        payload.ElapsedTime == undefined
          ? getUserTask(payload.index).ElapsedTime
          : payload.ElapsedTime,
      isTaskFixed:
        payload.isTaskFixed == undefined
          ? getUserTask(payload.index).isTaskFixed
          : payload.isTaskFixed,
      Difficulty:
        payload.Difficulty == undefined
          ? getUserTask(payload.index).Difficulty
          : payload.Difficulty,
      canBeInterrupted:
        payload.canBeInterrupted == undefined
          ? getUserTask(payload.index).canBeInterrupted
          : payload.canBeInterrupted,
      Day:
        payload.Day == undefined ? getUserTask(payload.index).Day : payload.Day,
      Status:
        payload.Status == undefined
          ? getUserTask(payload.index).Status
          : payload.Status,
    };

    UserDatabase = newUserDatabase;
    ORGANIZE();
    updateUserDB();
  }

  return UserDatabase;
}

function REMOVEUSER(payload) {
  if (isExistsUserTask(payload.index)) {
    let newUserDatabase = UserDatabase;

    newUserDatabase = [
      ...newUserDatabase.slice(0, getIndexUserTask(payload.index)),
      ...newUserDatabase.slice(
        getIndexUserTask(payload.index) + 1,
        UserDatabase.length
      ),
    ];
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

// Priority => Difficulty * EstimatedTime
// TODO: ByDays, WithFixedTime
function ORGANIZE() {
  const newUserDatabase = [];

  for (let i = 3; i >= 0; i--) {
    const arr = getAllUserTasksByPriorityByStatus(i);
    if (arr.length !== 0) {
      const n = arr.length;

      for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (
            arr[j].Difficulty * arr[j].EstimatedTime <
            arr[j + 1].Difficulty * arr[j + 1].EstimatedTime
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

  const arrDOING = getAllUserTasks().filter(
    (item) => item.Status === TaskStatus.DOING
  );

  if (arrDOING.length !== 0) newUserDatabase.push(arrDOING);

  const arrDONE = getAllUserTasks().filter(
    (item) => item.Status === TaskStatus.DONE
  );

  if (arrDONE.length !== 0) newUserDatabase.push(arrDONE);

  UserDatabase = newUserDatabase;
}

function STARTTASK(payload) {
  if (
    getAllUserTasks().filter((UserTask) => UserTask.Status === TaskStatus.DOING)
      .length === 0
  ) {
    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(payload.index)].StartingTime = new Date();
    newUserDatabase[getIndexUserTask(payload.index)].Status = TaskStatus.DOING;
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

function PAUSETASK() {
  if (
    getAllUserTasks().filter((UserTask) => UserTask.Status === TaskStatus.DOING)
      .length !== 0
  ) {
    const index = getAllUserTasks(
      (UserTask) => UserTask.Status === TaskStatus.DOING
    )[0].Name;
    updateElapsedTime(index, new Date());
    updateEstimatedTime(index, new Date());

    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(index)].Status = TaskStatus.TODO;
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

function ENDTASK() {
  if (
    getAllUserTasks().filter((UserTask) => UserTask.Status === TaskStatus.DOING)
      .length !== 0
  ) {
    // Update ElapsedTime
    const index = getAllUserTasks(
      (UserTask) => UserTask.Status === TaskStatus.DOING
    )[0].Name;
    updateElapsedTime(index, new Date());

    // Update Status
    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(index)].Status = TaskStatus.DONE;
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

// Types
export const Types = {
  ADDUSER: 'tasks/ADDUSER',
  UPDATEUSER: 'tasks/UPDATEUSER',
  REMOVEUSER: 'tasks/REMOVEUSER',
  ORGANIZE: 'tasks/ORGANIZE',
  ENDTASK: 'tasks/ENDTASK',
  PAUSETASK: 'tasks/PAUSETASK',
  STARTTASK: 'tasks/STARTTASK',
  POMODORO: 'tasks/POMODORO',
};

// Status
export const TaskStatus = {
  DOING: 'DOING',
  DONE: 'DONE',
  TODO: 'TODO',
};

// Action Creators
export const insertUserTask = (
  Name,
  Priority,
  StartingTime,
  isTaskFixed,
  EstimatedTime,
  Difficulty,
  canBeInterrupted,
  ElapsedTime,
  Day,
  Status
) => ({
  type: Types.ADDUSER,
  payload: {
    Name,
    EstimatedTime,
    Priority,
    StartingTime,
    ElapsedTime,
    isTaskFixed,
    Difficulty,
    canBeInterrupted,
    Day,
    Status,
  },
});

export const updateUserTask = (
  index,
  Name,
  Priority,
  EstimatedTime,
  StartingTime,
  ElapsedTime,
  isTaskFixed,
  Difficulty,
  canBeInterrupted,
  Day,
  Status
) => ({
  type: Types.UPDATEUSER,
  payload: {
    index,
    Name,
    EstimatedTime,
    Priority,
    StartingTime,
    ElapsedTime,
    isTaskFixed,
    Difficulty,
    canBeInterrupted,
    Day,
    Status,
  },
});

export const removeUserTask = (index) => ({
  type: Types.REMOVEUSER,
  payload: {
    index,
  },
});

export const organize = () => ({
  type: Types.ORGANIZE,
});

export const endTask = () => ({
  type: Types.ENDTASK,
});

export const pauseTask = () => ({
  type: Types.PAUSETASK,
});

export const startTask = (index, CurrentTime) => ({
  type: Types.STARTTASK,
  payload: {
    index,
    CurrentTime,
  },
});

// Reducer
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ADDUSER:
        return [...ADDUSER(action.payload)];
      case Types.UPDATEUSER:
        return [...UPDATEUSER(action.payload)];
      case Types.REMOVEUSER:
        return [...REMOVEUSER(action.payload)];
      case Types.ORGANIZE:
        ORGANIZE();
        return [...UserDatabase];
      case Types.ENDTASK:
        return [...ENDTASK()];
      case Types.PAUSETASK:
        return [...PAUSETASK()];
      case Types.STARTTASK:
        return [...STARTTASK(action.payload)];
      default:
        return currentState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

TasksProvider.propTypes = {
  children: PropTypes.element,
};

TasksProvider.defaultProps = {
  children: null,
};

export { tasksContext, TasksProvider };
