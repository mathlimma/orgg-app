import React from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import AddTodo from '../pages/AddTodo';

const MainStack = createStackNavigator();

export default function () {
  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <MainStack.Navigator headerMode="none" initialRouteName="AddTodo">
        <MainStack.Screen name="AddTodo" component={AddTodo} />

      </MainStack.Navigator>
    </>
  );
}
