import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { MobileBaseContainer } from './components/mobile-base-container';
import { GlobalStyles } from './styles';

export const App = () => {
  return (
    <View style={GlobalStyles.fullScreen}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <MobileBaseContainer />
      </NavigationContainer>
    </View>
  );
};
