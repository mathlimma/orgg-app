import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from '@react-native-community/async-storage';
import * as db from '../db/orgg-database.json';

let OrggDatabase = db.OrggDB;
let UserDatabase = db.UserDB;
let UserHistoryDatabase = db.UserHistoryDB;

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
  const databases = ['OrggDB', 'UserDB', 'UserHistoryDB'];

  const log = {
    OrggDB: false,
    UserDB: false,
    UserHistoryDB: false,
  };

  const keys = getKeys();

  for (key in keys) {
    log[keys[key]] = true;
  }

  for (i in databases) {
    // if (!log[databases[i]]) {
    switch (databases[i]) {
      case 'OrggDB': storeDatabase(key, db.OrggDB); OrggDatabase = db.OrggDB; break;
      case 'UserDB': storeDatabase(key, db.UserDB); UserDatabase = db.UserDB; break;
      case 'UserHistoryDB': storeDatabase(key, db.UserHistoryDB); UserHistoryDatabase = db.UserHistoryDB; break;
      default: break;
    }
    /* } else {
      switch (databases[i]) {
        case 'OrggDB': OrggDatabase = readDatabase('OrggDB'); break;
        case 'UserDB': UserDatabase = readDatabase('UserDB'); break;
        case 'UserHistoryDB': UserHistoryDatabase = readDatabase('UserHistoryDB'); break;
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

export const getOrggTask = (name) => {
  const OrggTasks = getAllOrggTasks();

  for (let i = 0; i < OrggTasks.length; i++) {
    if (OrggTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return OrggTasks[i];
    }
  }

  return null;
};

export const getMediumOrggTasks = () => {
  let medium = 0;
  const OrggTasks = getAllOrggTasks();

  for (let i = 0; i < OrggTasks.length; i++) {
    medium += OrggTasks[i].EstimatedTime;
  }

  medium /= OrggTasks.length;

  return Math.ceil(medium);
};

export const getEstimatedTimeOrggTask = (name) => {
  const HistoryTask = getUserHistoryTask(name);

  if (HistoryTask != null) {
    return HistoryTask.AverageCompletionTime;
  }
  const OrggTask = getOrggTask(name);

  if (OrggTask != null) {
    return OrggTask.EstimatedTime;
  }
  return getMediumOrggTasks();
};

// User database functions
export const updateUserDB = () => {
  storeDatabase('UserDB', UserDatabase);
};

export const getAllUserTasks = () => UserDatabase;

export const getUserTask = (name) => {
  const UserTasks = getAllUserTasks();

  for (let i = 0; i < UserTasks.length; i++) {
    if (UserTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return UserTasks[i];
    }
  }

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

// User history database functions
export const updateUserHistoryDB = () => {
  storeDatabase('UserHistoryDB', UserHistoryDatabase);
};

export const getAllUserHistoryTasks = () => UserHistoryDatabase;

export const getUserHistoryTask = (name) => {
  const UserHistoryTasks = getAllUserHistoryTasks();

  for (let i = 0; i < UserHistoryTasks.length; i++) {
    if (UserHistoryTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return UserHistoryTasks[i];
    }
  }

  return null;
};

export const isExistsUserHistoryTask = (name) => {
  if (getUserHistoryTask(name) != null) {
    return true;
  }
  return false;
};

export const getIndexUserHistoryTask = (name) => {
  const UserHistoryTasks = getAllUserHistoryTasks();

  for (let i = 0; i < UserHistoryTasks.length; i++) {
    if (UserHistoryTasks[i].Name.toLowerCase() == name.toLowerCase()) {
      return i;
    }
  }

  return null;
};

export const getAllUserTasksByPriority = (priority) => {
  const databaseByPriority = [];
  const database = getAllUserTasks();

  for (let i = 0; i < database.length; i++) {
    if (database[i].Priority == priority) {
      databaseByPriority.push(database[i]);
    }
  }

  if (databaseByPriority.length != 0) {
    return databaseByPriority;
  }
  return null;
};

// Diff in minutes
export const updateElapsedTime = (Name, EndTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(Name)].ElapsedTime = newUserDatabase[getIndexUserTask(Name)].ElapsedTime + Math.floor(Math.abs(EndTime - newUserDatabase[getIndexUserTask(Name)].StartingTime) / (1000 * 60));
  UserDatabase = newUserDatabase;

  updateUserDB();
};

export const updateEstimatedTime = (Name, CurrentTime) => {
  const newUserDatabase = UserDatabase;
  newUserDatabase[getIndexUserTask(Name)].EstimatedTime = newUserDatabase[getIndexUserTask(Name)].EstimatedTime - Math.floor(Math.abs(CurrentTime - newUserDatabase[getIndexUserTask(Name)].StartingTime) / (1000 * 60));
  UserDatabase = newUserDatabase;

  updateUserDB();
};

// --------
function SimilarityCheck(tokenDB, tokenUser) {
  let lengthDB = tokenDB.length;
  let lengthUser = tokenUser.length;
  const check = [(lengthDB + 1) * (lengthUser + 1)];

  for (let i = 0; i < check.length; i++) {
    check[i] = 0;
  }

  if (lengthDB == 0) {
    return lengthUser;
  }

  if (lengthUser == 0) {
    return lengthDB;
  }

  let x = 0;
  while (x <= lengthDB) {
    check[(x * (lengthDB + 1))] = x++;
  }

  x = 0;
  while (x <= lengthUser) {
    check[x] = x++;
  }

  for (let i = 1; i <= lengthDB; i++) {
    for (let j = 1; j <= lengthUser; j++) {
      let custo = (tokenUser[j - 1] == tokenDB[i - 1]) ? 0 : 1;

      check[(i * (lengthDB + 1)) + j] = Math.min(Math.min(check[((i - 1) * (lengthDB + 1)) + j] + 1, check[(i * (lengthDB + 1)) + (j - 1)] + 1), check[((i - 1) * (lengthDB + 1)) + (j - 1)] + custo);
    }
  }

  return check[(lengthDB * (lengthDB + 1)) + lengthUser];
};

function getTaskByTokenDB(Name, DBTasks) {
  const TaskTokens = Name.toLowerCase().split(' ');

  let min = 1000;
  let index = 0;
  nTokens = 100;

  for (let i = 0; i < DBTasks.length; i++) {
    let auxNTokens = 0;
    let sum = 0;
    const DBTokens = DBTasks[i].Name.toLowerCase().split(' ');

    for (let j = 0; j < TaskTokens.length; j++) {
      let auxK = [];
      for (let k = 0; k < DBTokens.length; k++) {
        if (DBTokens[k].length > 2) {
          auxNTokens++;
          auxK.push(SimilarityCheck(DBTokens[k], TaskTokens[j]));
        }
      }
      sum += Math.min.apply(1000, auxK);
    }
    if (sum < min) {
      min = sum;
      index = i;
      nTokens = auxNTokens;
    } else if (sum == min && auxNTokens < nTokens) {
      min = sum;
      index = i;
      nTokens = auxNTokens;
    }
  }

  let data = {
    "min": min,
    "nTokens": nTokens,
    "Task": DBTasks[index]
  };

  return data;
};

// --------
function ADDUSER(payload) {
  if (!isExistsUserTask(payload.Name)) {
    const task = {
      Name: payload.Name,
      Priority: payload.Priority,
      Difficulty: (payload.Difficulty == undefined) ? 2 : payload.Difficulty,
      EstimatedTime: (payload.EstimatedTime == undefined || payload.EstimatedTime == '') ? getEstimatedTimeOrggTask(payload.Name) : (payload.isTaskFixed != true) ? payload.EstimatedTime : Math.floor(Math.abs(payload.EstimatedTime - payload.StartingTime) / (1000 * 60)),
      StartingTime: (payload.StartingTime == undefined || payload.isTaskFixed != true) ? 0 : payload.StartingTime,
      ElapsedTime: 0,
      isTaskFixed: (payload.isTaskFixed == undefined) ? false : payload.isTaskFixed,
      canBeInterrupted: (payload.canBeInterrupted == undefined) ? false : payload.canBeInterrupted,
      Day: (payload.Day == undefined) ? new Date() : payload.Day,
      Status: (payload.Status == undefined) ? 'To Do' : payload.Status,
    };

    UserDatabase.push(task);
    updateUserDB();
  }

  return UserDatabase;
}

function UPDATEUSER(payload) {
  if (!isExistsUserTask(payload.Name) || payload.index.toLowerCase() == payload.Name.toLowerCase()) {
    const newUserDatabase = UserDatabase;

    newUserDatabase[getIndexUserTask(payload.index)] = {
      Name: (payload.Name == undefined) ? getUserTask(payload.index).Name : payload.Name,
      Priority: (payload.Priority == undefined) ? getUserTask(payload.index).Priority : payload.Priority,
      EstimatedTime: (payload.EstimatedTime == undefined) ? getUserTask(payload.index).EstimatedTime : (payload.isTaskFixed != true) ? payload.EstimatedTime : Math.floor(Math.abs(payload.EstimatedTime - payload.StartingTime) / (1000 * 60)),
      StartingTime: (payload.StartingTime == undefined) ? getUserTask(payload.index).StartingTime : payload.StartingTime,
      ElapsedTime: (payload.ElapsedTime == undefined) ? getUserTask(payload.index).ElapsedTime : payload.ElapsedTime,
      isTaskFixed: (payload.isTaskFixed == undefined) ? getUserTask(payload.index).isTaskFixed : payload.isTaskFixed,
      Difficulty: (payload.Difficulty == undefined) ? getUserTask(payload.index).Difficulty : payload.Difficulty,
      canBeInterrupted: (payload.canBeInterrupted == undefined) ? getUserTask(payload.index).canBeInterrupted : payload.canBeInterrupted,
      Day: (payload.Day == undefined) ? getUserTask(payload.index).Day : payload.Day,
      Status: (payload.Status == undefined) ? getUserTask(payload.index).Status : payload.Status,
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

    newUserDatabase = [...newUserDatabase.slice(0, getIndexUserTask(payload.index)), ...newUserDatabase.slice(getIndexUserTask(payload.index) + 1, UserDatabase.length)];
    UserDatabase = newUserDatabase;
    updateUserDB();
  }

  return UserDatabase;
}

// Priority => Difficulty * EstimatedTime
function ORGANIZE() {
  const newUserDatabase = [];

  for (let i = 3; i >= 0; i--) {
    const arr = getAllUserTasksByPriority(i);
    if (arr != null) {
      const n = arr.length;

      for (let i = n - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if ((arr[j].Difficulty * arr[j].EstimatedTime) < (arr[j + 1].Difficulty * arr[j + 1].EstimatedTime)) {
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

  UserDatabase = newUserDatabase;
}

function ADDHISTORY(payload) {
  if (!isExistsUserHistoryTask(payload.Name)) {
    const task = {
      Name: payload.Name,
      AverageCompletionTime: getUserTask(payload.Name).ElapsedTime,
      TimesCompleted: 1,
    };

    UserHistoryDatabase.push(task);
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
}

function UPDATEHISTORY(payload) {
  if (!isExistsUserHistoryTask(payload.Name) || payload.index.toLowerCase() === payload.Name.toLowerCase()) {
    const newUserHistoryDatabase = UserHistoryDatabase;

    newUserHistoryDatabase[getIndexUserHistoryTask(payload.index)] = {
      Name: payload.Name,
      AverageCompletionTime: (payload.AverageCompletionTime === undefined)
        ? getUserHistoryTask(payload.index).AverageCompletionTime
        : (((getUserHistoryTask(payload.index).TimesCompleted * getUserHistoryTask(payload.index).AverageCompletionTime) + payload.AverageCompletionTime) / (getUserHistoryTask(payload.index).TimesCompleted + 1)),
      TimesCompleted: (payload.TimesCompleted === undefined)
        ? (getUserHistoryTask(payload.index).TimesCompleted + 1)
        : payload.TimesCompleted,
    };

    UserHistoryDatabase = newUserHistoryDatabase;
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
}

function REMOVEHISTORY(payload) {
  if (isExistsUserHistoryTask(payload.index)) {
    let newUserHistoryDatabase = UserHistoryDatabase;

    newUserHistoryDatabase = [
      ...newUserHistoryDatabase.slice(0, getIndexUserHistoryTask(payload.index)),
      ...newUserHistoryDatabase.slice(
        getIndexUserHistoryTask(payload.index) + 1,
        UserHistoryDatabase.length,
      ),
    ];
    UserHistoryDatabase = newUserHistoryDatabase;
    updateUserHistoryDB();
  }

  return UserHistoryDatabase;
}

function STARTTASK(payload) {
  const newUserDatabase = getAllUserTasks();
  newUserDatabase[getIndexUserTask(payload.index)].StartingTime = payload.CurrentTime;
  UserDatabase = newUserDatabase;
  updateUserDB();

  return UserDatabase;
}

function PAUSETASK(payload) {
  updateElapsedTime(payload.index, payload.CurrentTime);
  updateEstimatedTime(payload.index, payload.CurrentTime);
  updateUserDB();

  return UserDatabase;
}

function ENDTASK(payload) {
  if (isExistsUserTask(payload.index)) {
    // Update ElapsedTime
    updateElapsedTime(payload.index, payload.EndTime);

    // Insert UserHistoryTask
    // Update UserHistoryTask
    if (!isExistsUserHistoryTask(payload.index)) {
      const newPayload = {
        Name: payload.index,
      };

      ADDHISTORY(newPayload);
    } else {
      const newPayload = {
        index: payload.index,
        Name: payload.index,
        AverageCompletionTime: getUserTask(payload.index).ElapsedTime,
      };

      UPDATEHISTORY(newPayload);
    }

    // Remove UserTask
    REMOVEUSER(payload);
  }

  updateUserDB();
  updateUserHistoryDB();

  return UserDatabase;
}

function TASKBYTOKENS(Name) {
  const Tasks = [];
  Tasks.push(getTaskByTokenDB(Name, getAllUserHistoryTasks()));
  Tasks.push(getTaskByTokenDB(Name, getAllUserTasks()));
  Tasks.push(getTaskByTokenDB(Name, getAllOrggTasks()));

  if (Tasks[0].min < Tasks[1].min) {
    if (Tasks[0].min < Tasks[2].min || (Tasks[0].min == Tasks[2].min && Tasks[0].nTokens <= Tasks[2].nTokens)) {
      return Tasks[0].Task;
    }
    return Tasks[2].Task;
  } else if (Tasks[0].min == Tasks[1].min && Tasks[0].min != 1000) {
    if (Tasks[0].nTokens <= Tasks[1].nTokens) {
      return Tasks[0].Task;
    }
    return Tasks[1].Task;
  }
  if (Tasks[1].min < Tasks[2].min || (Tasks[1].min == Tasks[2].min && Tasks[1].nTokens <= Tasks[2].nTokens)) {
    return Tasks[1].Task;
  }
  return Tasks[2].Task;
}

// Types
export const Types = {
  ADDUSER: 'tasks/ADDUSER',
  UPDATEUSER: 'tasks/UPDATEUSER',
  REMOVEUSER: 'tasks/REMOVEUSER',
  ORGANIZE: 'tasks/ORGANIZE',
  ADDHISTORY: 'tasks/ADDHISTORY',
  UPDATEHISTORY: 'tasks/UPDATEHISTORY',
  REMOVEHISTORY: 'tasks/REMOVEHISTORY',
  ENDTASK: 'tasks/ENDTASK',
  PAUSETASK: 'tasks/PAUSETASK',
  STARTTASK: 'tasks/STARTTASK',
  TASKBYTOKENS: 'tasks/TASKBYTOKENS',
  POMODORO: 'tasks/POMODORO',
};

// Action Creators
export const insertUserTask = (Name, Priority, StartingTime, isTaskFixed, EstimatedTime, Difficulty, canBeInterrupted, ElapsedTime, Day, Status) => ({
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

export const insertUserHistoryTask = (Name, AverageCompletionTime, TimesCompleted) => ({
  type: Types.ADDHISTORY,
  payload: {
    Name,
    AverageCompletionTime,
    TimesCompleted,
  },
});

export const updateUserTask = (index, Name, Priority, EstimatedTime, StartingTime, ElapsedTime, isTaskFixed, Difficulty, canBeInterrupted, Day, Status) => ({
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

export const updateUserHistoryTask = (index, Name, AverageCompletionTime, TimesCompleted) => ({
  type: Types.UPDATEHISTORY,
  payload: {
    index,
    Name,
    AverageCompletionTime,
    TimesCompleted,
  },
});

export const removeUserTask = (index) => ({
  type: Types.REMOVEUSER,
  payload: {
    index,
  },
});

export const removeUserHistoryTask = (index) => ({
  type: Types.REMOVEHISTORY,
  payload: {
    index,
  },
});

export const organize = () => ({
  type: Types.ORGANIZE,
});

export const endTask = (index, EndTime) => ({
  type: Types.ENDTASK,
  payload: {
    index,
    EndTime,
  },
});

export const pauseTask = (index, CurrentTime) => ({
  type: Types.PAUSETASK,
  payload: {
    index,
    CurrentTime,
  },
});

export const startTask = (index, CurrentTime) => ({
  type: Types.STARTTASK,
  payload: {
    index,
    CurrentTime,
  },
});

export const getTaskByTokens = (Name) => ({
  type: Types.TASKBYTOKENS,
  payload: {
    Name,
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
      case Types.PAUSETASK:
        return [...PAUSETASK(action.payload)];
      case Types.STARTTASK:
        return [...STARTTASK(action.payload)];
      case Types.TASKBYTOKENS:
        return [...TASKBYTOKENS(action.payload)];
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
