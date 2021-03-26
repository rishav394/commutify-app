import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import 'react-native-gesture-handler';
import { MobileBaseContainer } from './components/mobile-base-container';
import { GlobalStyles } from './styles';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={GlobalStyles.fullScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <MobileBaseContainer />
      </NavigationContainer>
    </View>
  );
};
