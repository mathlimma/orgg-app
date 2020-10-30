import React from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import AddTodo from '../pages/AddTodo';
import Colors from '../utils/colors';
import LogoTitle from '../components/LogoTitle';

const MainStack = createStackNavigator();

const Routes = () => (
  <>
    <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
    <MainStack.Navigator
      initialRouteName="AddTodo"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
        title: <LogoTitle />,
      }}
    >
      <MainStack.Screen name="AddTodo" component={AddTodo} />
    </MainStack.Navigator>
  </>
);

export default Routes;
