import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from '@react-native-community/async-storage';
import * as db from '../db/orgg-database.json';

let OrggDatabase = db.OrggDB;
let UserDatabase = db.UserDB;

// Types
export const Types = {
  ADDUSER: 'tasks/ADDUSER',
  UPDATEUSER: 'tasks/UPDATEUSER',
  REMOVEUSER: 'tasks/REMOVEUSER',
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

// Store and Read database
storeDatabase = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) { }
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
  } catch (error) { }
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

export const getEstimatedTimeOrggTask = (name, difficulty) => {
  const UserTask = getAllUserTasks()
    .filter((UserTask) => UserTask.Status === TaskStatus.DONE)
    .filter((UserTask) => UserTask.Name.toLowerCase() === name.toLowerCase());

  if (UserTask.length !== 0) {
    if (UserTask.length === 1) return UserTask.ElapsedTime;

    const average = 0;
    for (let i = 0; i < UserTask.length; i++) {
      average += UserTask.ElapsedTime;
    }

    return Math.floor(average / UserTask.length);
  }

  const OrggTask = getAllOrggTasks().filter(
    (OrggTask) => OrggTask.Name.toLowerCase() === name.toLowerCase()
  );

  if (OrggTask.length !== 0) return OrggTask.EstimatedTime;

  switch (difficulty) {
    case 4:
      return 30;
    case 3:
      return 45;
    case 1:
      return 90;
    case 0:
      return 120;
    default:
      return 60;
  }
};

// User database functions
export const updateUserDB = () => {
  storeDatabase('UserDB', UserDatabase);
};

export const getAllUserTasks = () => UserDatabase;

export const getUserTask = (ID) => {
  const UserTask = getAllUserTasks().filter((UserTask) => UserTask.ID === ID);

  if (UserTask !== 0) return UserTask[0];

  return null;
};

export const isExistsUserTask = (ID) => {
  if (getUserTask(ID) != null) {
    return true;
  }
  return false;
};

export const getIndexUserTask = (ID) => {
  const UserTasks = getAllUserTasks();

  for (let i = 0; i < UserTasks.length; i++) {
    if (UserTasks[i].ID == ID) {
      return i;
    }
  }

  return null;
};

export const getAllUserTasksByPriorityByStatus = (priority) => {
  const databaseByPriority = [];
  const database = getAllUserTasks().filter(
    (UserTask) => UserTask.Status === TaskStatus.TODO
  );

  for (let i = 0; i < database.length; i++) {
    if (database[i].Priority == priority) {
      databaseByPriority.push(database[i]);
    }
  }

  return databaseByPriority;
};

// Diff in minutes
export const updateElapsedTime = (ID, CurrentTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(ID)].ElapsedTime =
    newUserDatabase[getIndexUserTask(ID)].ElapsedTime +
    Math.floor(
      Math.abs(
        CurrentTime - newUserDatabase[getIndexUserTask(ID)].StartingTime
      ) /
      (1000 * 60)
    );
  UserDatabase = newUserDatabase;

  updateUserDB();
};

export const updateEstimatedTime = (ID, CurrentTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(ID)].EstimatedTime =
    newUserDatabase[getIndexUserTask(ID)].EstimatedTime -
    Math.floor(
      Math.abs(
        CurrentTime - newUserDatabase[getIndexUserTask(ID)].StartingTime
      ) /
      (1000 * 60)
    );
  UserDatabase = newUserDatabase;

  updateUserDB();
};

// --------
function ADDUSER(payload) {
  if (!isExistsUserTask(payload.ID)) {
    const task = {
      ID: payload.ID,
      Name: payload.Name,
      Priority: payload.Priority,
      Difficulty: payload.Difficulty == undefined ? 2 : payload.Difficulty,
      EstimatedTime:
        payload.EstimatedTime == undefined || payload.EstimatedTime == ''
          ? getEstimatedTimeOrggTask(payload.Name, payload.Difficulty)
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
  if (isExistsUserTask(payload.ID)) {
    const newUserDatabase = UserDatabase;

    newUserDatabase[getIndexUserTask(payload.ID)] = {
      ID: getUserTask(payload.ID).ID,
      Name:
        payload.Name == undefined ? getUserTask(payload.ID).Name : payload.Name,
      Priority:
        payload.Priority == undefined
          ? getUserTask(payload.ID).Priority
          : payload.Priority,
      EstimatedTime:
        payload.EstimatedTime == undefined
          ? getUserTask(payload.ID).EstimatedTime
          : payload.isTaskFixed != true
            ? payload.EstimatedTime
            : Math.floor(
              Math.abs(payload.EstimatedTime - payload.StartingTime) /
              (1000 * 60)
            ),
      StartingTime:
        payload.StartingTime == undefined
          ? getUserTask(payload.ID).StartingTime
          : payload.StartingTime,
      ElapsedTime:
        payload.ElapsedTime == undefined
          ? getUserTask(payload.ID).ElapsedTime
          : payload.ElapsedTime,
      isTaskFixed:
        payload.isTaskFixed == undefined
          ? getUserTask(payload.ID).isTaskFixed
          : payload.isTaskFixed,
      Difficulty:
        payload.Difficulty == undefined
          ? getUserTask(payload.ID).Difficulty
          : payload.Difficulty,
      canBeInterrupted:
        payload.canBeInterrupted == undefined
          ? getUserTask(payload.ID).canBeInterrupted
          : payload.canBeInterrupted,
      Day: payload.Day == undefined ? getUserTask(payload.ID).Day : payload.Day,
      Status:
        payload.Status == undefined
          ? getUserTask(payload.ID).Status
          : payload.Status,
    };

    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

function REMOVEUSER(payload) {
  if (isExistsUserTask(payload.ID)) {
    let newUserDatabase = UserDatabase;

    newUserDatabase = [
      ...newUserDatabase.slice(0, getIndexUserTask(payload.ID)),
      ...newUserDatabase.slice(
        getIndexUserTask(payload.ID) + 1,
        UserDatabase.length
      ),
    ];
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

function STARTTASK(payload) {
  if (
    getAllUserTasks().filter((UserTask) => UserTask.Status === TaskStatus.DOING)
      .length === 0
  ) {
    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(payload.ID)].StartingTime = new Date();
    newUserDatabase[getIndexUserTask(payload.ID)].Status = TaskStatus.DOING;
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
    const ID = getAllUserTasks(
      (UserTask) => UserTask.Status === TaskStatus.DOING
    )[0].ID;
    updateElapsedTime(ID, new Date());
    updateEstimatedTime(ID, new Date());

    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(ID)].Status = TaskStatus.TODO;
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
    const ID = getAllUserTasks(
      (UserTask) => UserTask.Status === TaskStatus.DOING
    )[0].ID;
    updateElapsedTime(ID, new Date());

    // Update Status
    const newUserDatabase = getAllUserTasks();
    newUserDatabase[getIndexUserTask(ID)].Status = TaskStatus.DONE;
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

// Action Creators
export const insertUserTask = (
  ID,
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
    ID,
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
  ID,
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
    ID,
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

export const removeUserTask = (ID) => ({
  type: Types.REMOVEUSER,
  payload: {
    ID,
  },
});

export const endTask = () => ({
  type: Types.ENDTASK,
});

export const pauseTask = () => ({
  type: Types.PAUSETASK,
});

export const startTask = (ID, CurrentTime) => ({
  type: Types.STARTTASK,
  payload: {
    ID,
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
