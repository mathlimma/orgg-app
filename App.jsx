import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { AppLoading } from 'expo';
import Routes from './src/routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
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
