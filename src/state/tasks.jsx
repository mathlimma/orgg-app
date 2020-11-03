import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

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
