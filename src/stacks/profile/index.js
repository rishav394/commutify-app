import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProfilePage } from '../../screens/profile-page';

const ProfileStackNavigator = createStackNavigator();

export const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: 'red',
      }}>
      <ProfileStackNavigator.Screen
        options={{
          headerShown: false,
        }}
        name={'profile-page'}
        component={ProfilePage}
      />
    </ProfileStackNavigator.Navigator>
  );
};
