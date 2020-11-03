import React, { useContext } from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import StartingScreen from '../pages/StartingScreen';
import Colors from '../utils/colors';
import OrggHeaderTitle from '../components/OrggHeaderTitle';
import { tasksContext } from '../state/tasks';
import TaskListScreen from '../pages/TaskListScreen';

const MainStack = createStackNavigator();

const Routes = () => {
  const { state: tasks } = useContext(tasksContext);
  return (
    <>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <MainStack.Navigator
        initialRouteName={tasks.length !== 0 ? 'TaskList' : 'Starting'}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
          title: <OrggHeaderTitle />,
        }}
        headerMode="float"
      >
        <MainStack.Screen name="Starting" component={StartingScreen} />
        <MainStack.Screen name="TaskList" component={TaskListScreen} />
      </MainStack.Navigator>
    </>
  );
};

export default Routes;
