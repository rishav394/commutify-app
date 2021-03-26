import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Login } from '../../screens/login';
import { SignUp } from '../../screens/sign-up';

const MainStackNavigator = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: Colors.darker,
      }}>
      <MainStackNavigator.Screen name={'Login'} component={Login} />
      <MainStackNavigator.Screen name={'Signup'} component={SignUp} />
    </MainStackNavigator.Navigator>
  );
};
