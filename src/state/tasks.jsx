import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import * as db from '../db/orgg-database.json';
import { AsyncStorage } from 'react-native';

var OrggDatabase = db.OrggDB;
var UserDatabase = db.UserDB;
var UserHistoryDatabase = db.UserHistoryDB;

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
    await AsyncStorage.getAllKeys().then((result) => {
      return result;
    });
  } catch (error) { }
};

initialize = async () => {
  const databases = ['OrggDB', 'UserDB', 'UserHistoryDB'];

  const log = {
    "OrggDB": false,
    "UserDB": false,
    "UserHistoryDB": false
  };

  const keys = getKeys();

  for (key in keys) {
    log[keys[key]] = true;
  }

  for (i in databases) {
    //if (!log[databases[i]]) {
    switch (databases[i]) {
      case 'OrggDB': storeDatabase(key, db.OrggDB); OrggDatabase = db.OrggDB; break;
      case 'UserDB': storeDatabase(key, db.UserDB); UserDatabase = db.UserDB; break;
      case 'UserHistoryDB': storeDatabase(key, db.UserHistoryDB); UserHistoryDatabase = db.UserHistoryDB; break;
      default: break;
    }
    /*} else {
      switch (databases[i]) {
        case 'OrggDB': OrggDatabase = readDatabase('OrggDB'); break;
        case 'UserDB': UserDatabase = readDatabase('UserDB'); break;
        case 'UserHistoryDB': UserHistoryDatabase = readDatabase('UserHistoryDB'); break;
        default: break;
      }
    }*/
  }
};

initialize();

const initialState = db.UserDB;
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Orgg database functions
export const getAllOrggTasks = () => {
  return OrggDatabase;
};

export const getOrggTask = (name) => {
  const OrggTasks = getAllOrggTasks();

  for (var i = 0; i < OrggTasks.length; i++) {
    if (OrggTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return OrggTasks[i];
    }
  }

  return null;
};

export const getMediumOrggTasks = () => {
  var medium = 0;
  const OrggTasks = getAllOrggTasks();

  for (var i = 0; i < OrggTasks.length; i++) {
    medium += OrggTasks[i].EstimatedTime;
  }

  medium /= OrggTasks.length;

  return Math.ceil(medium);
};

export const getEstimatedTimeOrggTask = (name) => {
  const OrggTask = getOrggTask(name);

  if (OrggTask != null) {
    return OrggTask.EstimatedTime;
  } else {
    return getMediumOrggTasks();
  }
};

// User database functions
export const updateUserDB = () => {
  storeDatabase('UserDB', UserDatabase);
};

export const getAllUserTasks = () => {
  return UserDatabase;
};

export const getUserTask = (name) => {
  var UserTasks = getAllUserTasks();

  for (var i = 0; i < UserTasks.length; i++) {
    if (UserTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return UserTasks[i];
    }
  }

  return null;
};

export const isExistsUserTask = (name) => {
  if (getUserTask(name) != null) {
    return true;
  } else {
    return false;
  }
};

export const getIndexUserTask = (name) => {
  var UserTasks = getAllUserTasks();

  for (var i = 0; i < UserTasks.length; i++) {
    if (UserTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return i;
    }
  }

  return null;
};

// Diff in minutes
export const getUserTaskTime = (name) => {
  const UserTask = getUserTask(name);

  return Math.floor(Math.abs(UserTask.ElapsedTime - UserTask.StartingTime) / (1000 * 60));
};

// User history database functions
export const updateUserHistoryDB = () => {
  storeDatabase('UserHistoryDB', UserHistoryDatabase);
};

export const getAllUserHistoryTasks = () => {
  return UserHistoryDatabase;
};

export const getUserHistoryTask = (name) => {
  var UserHistoryTasks = getAllUserHistoryTasks();

  for (var i = 0; i < UserHistoryTasks.length; i++) {
    if (UserHistoryTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return UserHistoryTasks[i];
    }
  }

  return null;
};

export const isExistsUserHistoryTask = (name) => {
  if (getUserHistoryTask(name) != null) {
    return true;
  } else {
    return false;
  }
};

export const getIndexUserHistoryTask = (name) => {
  var UserHistoryTasks = getAllUserHistoryTasks();

  for (var i = 0; i < UserHistoryTasks.length; i++) {
    if (UserHistoryTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return i;
    }
  }

  return null;
};

// new AverageCompletionTime
export const getUpdateAverageCompletionTime = (AverageCompletionTime, TimesCompleted, Name) => {
  return ((AverageCompletionTime * TimesCompleted) + getUserTaskTime(Name)) / (TimesCompleted + 1);
};

// Priority * EstimatedTime
export const organizeUserTasks = () => {
  var arr = UserDatabase;
  const n = arr.length;

  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if ((arr[j].Priority * arr[j].EstimatedTime) < (arr[j + 1].Priority * arr[j + 1].EstimatedTime)) {
        let aux = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = aux;
      }
    }
  }

  UserDatabase = arr;
};

// Types
export const Types = {
  ADDUSER: 'tasks/ADDUSER',
  UPDATEUSER: 'tasks/UPDATEUSER',
  REMOVEUSER: 'tasks/REMOVEUSER',
  ORGANIZE: 'tasks/ORGANIZE',
  ADDHISTORY: 'tasks/ADDHISTORY',
  UPDATEHISTORY: 'tasks/UPDATEHISTORY',
  REMOVEHISTORY: 'tasks/REMOVEHISTORY'
};

// Action Creators
export const insertUserTask = (Name, Priority, StartingTime, isTaskFixed, EstimatedTime, ElapsedTime) => ({
  type: Types.ADDUSER,
  payload: {
    Name: Name,
    EstimatedTime: getEstimatedTimeOrggTask(Name),
    Priority: Priority,
    StartingTime: (StartingTime == undefined) ? 0 : StartingTime,
    ElapsedTime: 0,
    isTaskFixed: (isTaskFixed == undefined) ? false : isTaskFixed
  }
});

export const insertUserHistoryTask = (Name, AverageCompletionTime, TimesCompleted) => ({
  type: Types.ADDHISTORY,
  payload: {
    Name,
    AverageCompletionTime: getUserTaskTime(Name),
    TimesCompleted: 1
  }
});

export const updateUserTask = (index, Name, Priority, EstimatedTime, StartingTime, ElapsedTime, isTaskFixed) => ({
  type: Types.UPDATEUSER,
  payload: {
    index,
    Name,
    EstimatedTime,
    Priority,
    StartingTime,
    ElapsedTime,
    isTaskFixed
  }
});

export const updateUserHistoryTask = (index, Name, AverageCompletionTime, TimesCompleted) => ({
  type: Types.UPDATEHISTORY,
  payload: {
    index,
    Name,
    AverageCompletionTime,
    TimesCompleted
  }
});

export const removeUserTask = (index) => ({
  type: Types.REMOVEUSER,
  payload: {
    index
  }
});

export const removeUserHistoryTask = (index) => ({
  type: Types.REMOVEHISTORY,
  payload: {
    index
  }
});

export const organize = () => ({
  type: Types.ORGANIZE
});

// Reducer
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ADDUSER:
        if (!isExistsUserTask(action.payload.Name)) {
          UserDatabase = [action.payload, ...UserDatabase];
          updateUserDB();

          return UserDatabase;
        } else {
          return UserDatabase;
        }
      case Types.UPDATEUSER: {
        var newState = [...UserDatabase];

        if (!isExistsUserTask(action.payload.Name) || action.payload.index.toLowerCase() == action.payload.Name.toLowerCase()) {
          newState[getIndexUserTask(action.payload.index)] = {
            Name: action.payload.Name,
            Priority: action.payload.Priority,
            EstimatedTime: action.payload.EstimatedTime,
            StartingTime: (action.payload.StartingTime == undefined) ? getUserTask(action.payload.index).StartingTime : action.payload.StartingTime,
            ElapsedTime: (action.payload.ElapsedTime == undefined) ? getUserTask(action.payload.index).ElapsedTime : action.payload.ElapsedTime,
            isTaskFixed: (action.payload.isTaskFixed == undefined) ? getUserTask(action.payload.index).isTaskFixed : action.payload.isTaskFixed
          };

          UserDatabase = newState;
          organizeUserTasks();
          updateUserDB();
        }

        return UserDatabase;
      }
      case Types.REMOVEUSER:
        var newState = [...UserDatabase];

        if (isExistsUserTask(action.payload.index)) {
          newState = [...newState.slice(0, getIndexUserTask(action.payload.index)), ...newState.slice(getIndexUserTask(action.payload.index) + 1, UserDatabase.length)];
          UserDatabase = newState;
          updateUserDB();
        }

        return UserDatabase;
      case Types.ORGANIZE:
        organizeUserTasks();

        return [...UserDatabase];
      case Types.ADDHISTORY:
        if (!isExistsUserHistoryTask(action.payload.Name)) {
          UserHistoryDatabase = [action.payload, ...UserHistoryDatabase];
          updateUserHistoryDB();

          return UserHistoryDatabase;
        } else {
          return UserHistoryDatabase;
        }
      case Types.UPDATEHISTORY:
        var newState = [...UserHistoryDatabase];

        if (!isExistsUserHistoryTask(action.payload.Name) || action.payload.index.toLowerCase() == action.payload.Name.toLowerCase()) {
          newState[getIndexUserHistoryTask(action.payload.index)] = {
            Name: action.payload.Name,
            AverageCompletionTime: (action.payload.AverageCompletionTime == undefined) ? getUserHistoryTask(action.payload.index).AverageCompletionTime : action.payload.AverageCompletionTime,
            TimesCompleted: (action.payload.TimesCompleted == undefined) ? getUserHistoryTask(action.payload.index).TimesCompleted : action.payload.TimesCompleted
          };

          UserHistoryDatabase = newState;
          updateUserHistoryDB();
        }

        return UserHistoryDatabase;
      case Types.REMOVEHISTORY:
        var newState = [...UserHistoryDatabase];

        if (isExistsUserHistoryTask(action.payload.index)) {
          newState = [...newState.slice(0, getIndexUserHistoryTask(action.payload.index)), ...newState.slice(getIndexUserHistoryTask(action.payload.index) + 1, UserHistoryDatabase.length)];
          UserHistoryDatabase = newState;
          updateUserHistoryDB();
        }

        return UserHistoryDatabase;
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