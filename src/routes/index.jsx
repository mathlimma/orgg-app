import React, { useContext } from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../utils/colors';
import OrggHeaderTitle from '../components/OrggHeaderTitle';
import { tasksContext } from '../state/tasks';
import StartingScreen from '../pages/StartingScreen';
import TaskListScreen from '../pages/TaskListScreen';
import OrganizingScreen from '../pages/OrganizingScreen';
import YourDayScreen from '../pages/YourDayScreen';
import TaskScreen from '../pages/TaskScreen';

const MainStack = createStackNavigator();

const Routes = () => {
  const { state: tasks } = useContext(tasksContext);
  return (
    <>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <MainStack.Navigator
        initialRouteName="Starting"
        // NEXT_SPRINT: initialRouteName={tasks.length !== 0 ? 'TaskList' : 'Starting'}
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
        <MainStack.Screen name="Organizing" component={OrganizingScreen} />
        <MainStack.Screen name="YourDay" component={YourDayScreen} />
        <MainStack.Screen name="Task" component={TaskScreen} />

      </MainStack.Navigator>
    </>
  );
};

export default Routes;
