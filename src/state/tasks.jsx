import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

/*
const initialState = [{
  name: 'Item 1 com prioridade super alta',
  priority: 3,
}, {
  name: 'Item 2 com prioridade alta',
  priority: 2,
}, {
  name: 'Item 3 com prioridade normal',
  priority: 1,
}, {
  name: 'Item 4 com prioridade baixa',
  priority: 0,
}];
*/
const initialState = [];
const tasksContext = createContext(initialState);
const { Provider } = tasksContext;

// Types
export const Types = {
  ADD: 'tasks/ADD',
  REMOVE: 'tasks/REMOVE',
};

// Action Creators
export const add = (name, priority) => ({
  type: Types.ADD,
  payload: {
    name,
    priority,
  },
});

// Reducer
const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case Types.ADD:
        return [...currentState, action.payload];
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
