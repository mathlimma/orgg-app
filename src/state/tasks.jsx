import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const mockedState = [{
  name: 'Item 1 com prioridade super alta',
  priority: 3,
  estimate: 90,
}, {
  name: 'Item 2 com prioridade super alta',
  priority: 3,
  estimate: 45,
}, {
  name: 'Item 3 com prioridade alta',
  priority: 2,
  estimate: 30,
}, {
  name: 'Item 4 com prioridade alta',
  priority: 2,
  estimate: 60,
}, {
  name: 'Item 5 com prioridade normal',
  priority: 1,
  estimate: 75,
}, {
  name: 'Item 6 com prioridade baixa',
  priority: 0,
  estimate: 90,
}];

const initialState = [];
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Types
export const Types = {
  ADD: 'tasks/ADD',
  UPDATE: 'tasks/UPDATE',
  REMOVE: 'tasks/REMOVE',
  ORGANIZE: 'tasks/ORGANIZE',
  MOCK: 'tasks/MOCK', // NEXT_SPRINT: Remove
};

// Action Creators
export const add = (name, priority) => ({
  type: Types.ADD,
  payload: {
    name,
    priority,
    estimate: estimateTime(priority), // This should be handled on organize
  },
});

// Function to estimate task time
function estimateTime(priority) {
  switch (priority) {
    case 0: return 0 +  Math.floor(Math.random()*30);
    case 1: return 30 + Math.floor(Math.random()*30);
    case 2: return 60 + Math.floor(Math.random()*30);
    case 3: return 90 + Math.floor(Math.random()*30);
    default: return 60;
  }
}

export const update = (index, name, priority, estimate) => ({
  type: Types.UPDATE,
  payload: {
    index,
    name,
    priority,
    estimate,
  },
});

// NEXT_SPRINT: Remove
export const mock = () => ({
  type: Types.MOCK,
});

export const organize = () => ({
  type: Types.ORGANIZE,
});

// Reducer
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ADD:
        return [...currentState, action.payload];
      case Types.UPDATE: {
        const newState = [...currentState];
        newState[action.payload.index] = {
          name: action.payload.name,
          priority: action.payload.priority,
          estimate: action.payload.estimate,
        };
        return newState;
      }
      case Types.MOCK:
        return mockedState;
      case Types.ORGANIZE:
        const arr = currentState;
        const n = arr.length;
        
        for (let i = n-1; i > 0 ; i--) {
          for (let j = 0; j < i ; j++) {
            if (arr[j].priority < arr[j+1].priority) {
              let aux = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = aux;
            }
            if (arr[j].priority == arr[j+1].priority) {
              if (arr[j].name > arr[j+1].name) {
                let aux = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = aux;
              }
            }
          }
        }
        
        currentState = arr;
        
        return currentState;
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
