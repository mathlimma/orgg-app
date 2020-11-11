import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import * as database from '../db/orgg-database.json';

const OrggDatabase = database;
var UserDatabase = database.UserDB;

const initialState = OrggDatabase.UserDB;
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Orgg database functions
export const getAllOrggTasks = () => {
  return OrggDatabase.OrggDB;
};

export const getOrggTask = (name) => {
  const OrggTasks = getAllOrggTasks();
  
  for(var i = 0 ; i < OrggTasks.length ; i++){
    if (OrggTasks[i].Name.toLowerCase() == name.toLowerCase()) {
        return OrggTasks[i];
    }
  }

  return null;
};

export const getMediumOrggTasks = () => {
  var medium = 0;
  const OrggTasks = getAllOrggTasks();

  for(var i = 0 ; i < OrggTasks.length ; i++) {
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
export const getAllUserTasks = () => {
  return UserDatabase;
};

export const getUserTask = (name, tasks) => {
  var UserTasks = getAllUserTasks();
  
  for(var i = 0 ; i < UserTasks.length ; i++){
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
  
  for(var i = 0 ; i < UserTasks.length ; i++){
    if (UserTasks[i].Name.toLowerCase() == name.toLowerCase()) {
        return i;
    }
  }

  return null;
};

export const getAllUserTasksByPriority = (priority) => {
  var databaseByPriority = [];
  const database = getAllUserTasks();

  for(var i = 0 ; i < database.length ; i++) {
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

export const organizeUserTasks = () => {
  var newDB = [];
      
  for (var i = 3 ; i >= 0 ; i--) {
    var arr = getAllUserTasksByPriority(i);
    if (arr != null) {
      const n = arr.length;
      
      for (let i = n-1; i > 0 ; i--) {
        for (let j = 0; j < i ; j++) {
          if (arr[j].EstimatedTime < arr[j+1].EstimatedTime) {
            let aux = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = aux;
          }
          if (arr[j].EstimatedTime == arr[j+1].EstimatedTime) {
            if (arr[j].Name.toLowerCase() > arr[j+1].Name.toLowerCase()) {
              let aux = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = aux;
            }
          }
        }
      }
      
      for (let i = 0 ; i < n ; i++) {
          newDB.push(arr[i]);
      }
    }
  }

  UserDatabase = newDB;
};

// Types
export const Types = {
  ADD: 'tasks/ADD',
  UPDATE: 'tasks/UPDATE',
  REMOVE: 'tasks/REMOVE',
  ORGANIZE: 'tasks/ORGANIZE'
  //MOCK: 'tasks/MOCK', // NEXT_SPRINT: Remove
};

// Action Creators
export const insertUserTask = (Name, Priority) => ({
  type: Types.ADD,
  payload: {
    Name,
    EstimatedTime: getEstimatedTimeOrggTask(Name),
    Priority,
    TimeUsed: 0
  },
});

export const updateUserTask = (index, Name, Priority, EstimatedTime) => ({
  type: Types.UPDATE,
  payload: {
    index,
    Name,
    EstimatedTime,
    Priority
  },
});

// NEXT_SPRINT: Remove
export const removeUserTask = () => ({
  type: Types.REMOVE
});

export const organize = () => ({
  type: Types.ORGANIZE
});

// Reducer
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ADD:
        if (!isExistsUserTask(action.payload.Name)) {
          UserDatabase = [...UserDatabase, action.payload]
          
          organizeUserTasks();
          
          return UserDatabase;
        } else {
          return UserDatabase;
        }
      case Types.UPDATE: {
        var newState = [...currentState];
        
        if (!isExistsUserTask(action.payload.Name) || action.payload.index.toLowerCase() == action.payload.Name.toLowerCase()) {
          currentState[getIndexUserTask(action.payload.index)] = {
            Name: action.payload.Name,
            Priority: action.payload.Priority,
            EstimatedTime: action.payload.EstimatedTime
          };
          
          UserDatabase = newState;

          organizeUserTasks();
        }

        return UserDatabase;
      }
      case Types.REMOVE:
        return UserDatabase;
      case Types.ORGANIZE:
        organizeUserTasks();  

        return UserDatabase;
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