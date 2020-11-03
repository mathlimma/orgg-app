import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const mockedState = [{
  name: 'Item 1 com prioridade super alta',
  priority: 3,
}, {
  name: 'Item 2 com prioridade super alta',
  priority: 3,
}, {
  name: 'Item 3 com prioridade alta',
  priority: 2,
}, {
  name: 'Item 4 com prioridade alta',
  priority: 2,
}, {
  name: 'Item 5 com prioridade normal',
  priority: 1,
}, {
  name: 'Item 6 com prioridade baixa',
  priority: 0,
}];

const initialState = [];
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Types
export const Types = {
  ADD: 'tasks/ADD',
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
      case Types.MOCK:
        return mockedState;
      case Types.ORGANIZE:
        // TODO: Implement organization
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
