import { Text } from 'react-native'
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'

export default function App() {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>} >
      <Routes />
    </NavigationContainer>
  );
}