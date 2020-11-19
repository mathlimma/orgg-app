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
  const HistoryTask = getUserHistoryTask(name);

  if (HistoryTask != null) {
    return HistoryTask.AverageCompletionTime;
  } else {
    const OrggTask = getOrggTask(name);

    if (OrggTask != null) {
      return OrggTask.EstimatedTime;
    } else {
      return getMediumOrggTasks();
    }
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

export const getAllUserTasksByPriority = (priority) => {
  var databaseByPriority = [];
  const database = getAllUserTasks();

  for (var i = 0; i < database.length; i++) {
    if (database[i].Priority == priority) {
      databaseByPriority.push(database[i]);
    }
  }

  if (databaseByPriority.length != 0) {
    return databaseByPriority;
  } else {
    return null;
  }
};

// --------
function ADDUSER(payload) {
  if (!isExistsUserTask(payload.Name)) {
    let task = {
      "Name": payload.Name,
      "Priority": payload.Priority,
      "Difficulty": (payload.Difficulty == undefined) ? 2 : payload.Difficulty,
      "EstimatedTime": (payload.EstimatedTime == undefined || payload.EstimatedTime == "") ? getEstimatedTimeOrggTask(payload.Name) : (payload.isTaskFixed != true) ? payload.EstimatedTime : Math.floor(Math.abs(payload.EstimatedTime - payload.StartingTime) / (1000 * 60)),
      "StartingTime": (payload.StartingTime == undefined || payload.isTaskFixed != true) ? 0 : payload.StartingTime,
      "ElapsedTime": 0,
      "isTaskFixed": (payload.isTaskFixed == undefined) ? false : payload.isTaskFixed,
      "canBeInterrupted": (payload.canBeInterrupted == undefined) ? false : payload.canBeInterrupted
    };

    UserDatabase.push(task);
    updateUserDB();
  }

  return UserDatabase;
};

function UPDATEUSER(payload) {
  if (!isExistsUserTask(payload.Name) || payload.index.toLowerCase() == payload.Name.toLowerCase()) {
    var newUserDatabase = [...UserDatabase];

    newUserDatabase[getIndexUserTask(payload.index)] = {
      Name: (payload.Name == undefined) ? getUserTask(payload.index).Name : payload.Name,
      Priority: (payload.Priority == undefined) ? getUserTask(payload.index).Priority : payload.Priority,
      EstimatedTime: (payload.EstimatedTime == undefined) ? getUserTask(payload.index).EstimatedTime : (payload.isTaskFixed != true) ? payload.EstimatedTime : Math.floor(Math.abs(payload.EstimatedTime - payload.StartingTime) / (1000 * 60)),
      StartingTime: (payload.StartingTime == undefined) ? getUserTask(payload.index).StartingTime : payload.StartingTime,
      ElapsedTime: (payload.ElapsedTime == undefined) ? getUserTask(payload.index).ElapsedTime : payload.ElapsedTime,
      isTaskFixed: (payload.isTaskFixed == undefined) ? getUserTask(payload.index).isTaskFixed : payload.isTaskFixed,
      Difficulty: (payload.Difficulty == undefined) ? getUserTask(payload.index).Difficulty : payload.Difficulty,
      canBeInterrupted: (payload.canBeInterrupted == undefined) ? getUserTask(payload.index).canBeInterrupted : payload.canBeInterrupted,
    };

    UserDatabase = newUserDatabase;
    ORGANIZE();
    updateUserDB();
  }

  return UserDatabase;
};

function REMOVEUSER(payload) {
  if (isExistsUserTask(payload.index)) {
    var newUserDatabase = [...UserDatabase];

    newUserDatabase = [...newUserDatabase.slice(0, getIndexUserTask(payload.index)), ...newUserDatabase.slice(getIndexUserTask(payload.index) + 1, UserDatabase.length)];
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
};

// Priority => Difficulty * EstimatedTime
function ORGANIZE() {
  var newUserDatabase = [];

  for (var i = 3; i >= 0; i--) {
    var arr = getAllUserTasksByPriority(i);
    if (arr != null) {
      const n = arr.length;

      for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if ((arr[j].Difficulty * arr[j].EstimatedTime) < (arr[j + 1].Difficulty * arr[j + 1].EstimatedTime)) {
            let aux = arr[j];
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

  UserDatabase = newUserDatabase;
};

function ADDHISTORY(payload) {
  if (!isExistsUserHistoryTask(payload.Name)) {
    let task = {
      "Name": payload.Name,
      "AverageCompletionTime": getUserTaskTime(payload.Name),
      "TimesCompleted": 1
    };

    UserHistoryDatabase.push(task);
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
};

function UPDATEHISTORY(payload) {
  if (!isExistsUserHistoryTask(payload.Name) || payload.index.toLowerCase() == payload.Name.toLowerCase()) {
    var newUserHistoryDatabase = [...UserHistoryDatabase];

    newUserHistoryDatabase[getIndexUserHistoryTask(payload.index)] = {
      Name: payload.Name,
      AverageCompletionTime: (payload.AverageCompletionTime == undefined) ? getUserHistoryTask(payload.index).AverageCompletionTime : (((getUserHistoryTask(payload.index).TimesCompleted * getUserHistoryTask(payload.index).AverageCompletionTime) + payload.AverageCompletionTime) / (getUserHistoryTask(payload.index).TimesCompleted + 1)),
      TimesCompleted: (payload.TimesCompleted == undefined) ? (getUserHistoryTask(payload.index).TimesCompleted + 1) : payload.TimesCompleted
    };

    UserHistoryDatabase = newUserHistoryDatabase;
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
};

function REMOVEHISTORY(payload) {
  if (isExistsUserHistoryTask(payload.index)) {
    var newUserHistoryDatabase = [...UserHistoryDatabase];

    newUserHistoryDatabase = [...newUserHistoryDatabase.slice(0, getIndexUserHistoryTask(payload.index)), ...newUserHistoryDatabase.slice(getIndexUserHistoryTask(payload.index) + 1, UserHistoryDatabase.length)];
    UserHistoryDatabase = newUserHistoryDatabase;
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
};

function ENDTASK(payload) {
  // Update ElapsedTime
  if (isExistsUserTask(payload.index)) {
    var newUserDatabase = [...UserDatabase];
    newUserDatabase[getIndexUserTask(payload.index)].ElapsedTime = payload.EndTime;
    UserDatabase = newUserDatabase;

    // Insert UserHistoryTask
    // Update UserHistoryTask
    if (!isExistsUserHistoryTask(payload.index)) {
      let newPayload = {
        "Name": payload.index
      };

      ADDHISTORY(newPayload);
    } else {
      let newPayload = {
        "index": payload.index,
        "Name": payload.index,
        "AverageCompletionTime": getUserTaskTime(payload.index)
      };

      UPDATEHISTORY(newPayload);
    }

    //Remove UserTask
    REMOVEUSER(payload);
  }

  updateUserDB();
  updateUserHistoryDB();

  return UserDatabase;
};

// Types
export const Types = {
  ADDUSER: 'tasks/ADDUSER',
  UPDATEUSER: 'tasks/UPDATEUSER',
  REMOVEUSER: 'tasks/REMOVEUSER',
  ORGANIZE: 'tasks/ORGANIZE',
  ADDHISTORY: 'tasks/ADDHISTORY',
  UPDATEHISTORY: 'tasks/UPDATEHISTORY',
  REMOVEHISTORY: 'tasks/REMOVEHISTORY',
  ENDTASK: 'tasks/ENDTASK'
};

// Action Creators
export const insertUserTask = (Name, Priority, StartingTime, isTaskFixed, EstimatedTime, Difficulty, canBeInterrupted, ElapsedTime) => ({
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
  }
});

export const insertUserHistoryTask = (Name, AverageCompletionTime, TimesCompleted) => ({
  type: Types.ADDHISTORY,
  payload: {
    Name,
    AverageCompletionTime,
    TimesCompleted
  }
});

export const updateUserTask = (index, Name, Priority, EstimatedTime, StartingTime, ElapsedTime, isTaskFixed, Difficulty, canBeInterrupted) => ({
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
    canBeInterrupted
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

export const endTask = (index, EndTime) => ({
  type: Types.ENDTASK,
  payload: {
    index,
    EndTime
  }
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
      case Types.ADDHISTORY:
        return [...ADDHISTORY(action.payload)];
      case Types.UPDATEHISTORY:
        return [...UPDATEHISTORY(action.payload)];
      case Types.REMOVEHISTORY:
        return [...REMOVEHISTORY(action.payload)];
      case Types.ENDTASK:
        return [...ENDTASK(action.payload)];
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