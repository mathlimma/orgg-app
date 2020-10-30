import React from 'react';
import StatusBar from '@emmanuel312/react-native-statusbar';
import { createStackNavigator } from '@react-navigation/stack';
import StartingScreen from '../pages/StartingScreen';
import Colors from '../utils/colors';
import OrggHeaderTitle from '../components/OrggHeaderTitle';

const MainStack = createStackNavigator();

const Routes = () => (
  <>
    <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
    <MainStack.Navigator
      initialRouteName="StartingScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
        title: <OrggHeaderTitle />,
      }}
    >
      <MainStack.Screen name="StartingScreen" component={StartingScreen} />
    </MainStack.Navigator>
  </>
);

export default Routes;
