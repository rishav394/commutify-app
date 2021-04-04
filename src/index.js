import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { MobileBaseContainer } from './components/mobile-base-container';
import { GlobalStyles } from './styles';
import { useBackgroundLocation } from './util/useBackgroundLocation';
import { useEffect } from 'react';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(250, 250, 250)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const App = () => {
  const [location, working, setWorking] = useBackgroundLocation();

  return (
    <View style={GlobalStyles.fullScreen}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer theme={MyTheme}>
        <MobileBaseContainer />
      </NavigationContainer>
    </View>
  );
};
