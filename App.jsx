/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Rubik_400Regular,
} from '@expo-google-fonts/rubik';
import { AppLoading } from 'expo';
import Routes from './src/routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Rubik_400Regular,
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};

export default App;
