import React from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../utils/colors';
import OrggHeaderTitle from '../components/OrggHeaderTitle';
import YourWeekScreen from '../pages/YourWeekScreen';
import TaskListScreen from '../pages/TaskListScreen';
import OrganizingScreen from '../pages/OrganizingScreen';
import YourDayScreen from '../pages/YourDayScreen';
import TaskScreen from '../pages/TaskScreen';

const MainStack = createStackNavigator();

const Routes = () => (
  <>
    <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
    <MainStack.Navigator
      initialRouteName="YourWeek"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
        headerRight: true,
        header: () => <OrggHeaderTitle />,
      }}
      headerMode="float"
    >
      <MainStack.Screen name="YourWeek" component={YourWeekScreen} />
      <MainStack.Screen name="TaskList" component={TaskListScreen} />
      <MainStack.Screen name="Organizing" component={OrganizingScreen} />
      <MainStack.Screen name="YourDay" component={YourDayScreen} />
      <MainStack.Screen name="Task" component={TaskScreen} />

    </MainStack.Navigator>
  </>
);

export default Routes;
