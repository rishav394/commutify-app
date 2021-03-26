import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Login } from '../../screens/login';
import { SignUp } from '../../screens/sign-up';

const AuthStackNavigator = createStackNavigator();

export const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: Colors.darker,
      }}>
      <AuthStackNavigator.Screen name={'Login'} component={Login} />
      <AuthStackNavigator.Screen name={'Signup'} component={SignUp} />
    </AuthStackNavigator.Navigator>
  );
};
