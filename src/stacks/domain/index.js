import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DomainInfo } from '../../screens/domain-info';
import { DomainPage } from '../../screens/domain-page';

const DomainStackNavigator = createStackNavigator();

export const DomainStack = () => {
  return (
    <DomainStackNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: 'red',
      }}>
      <DomainStackNavigator.Screen
        options={{
          headerShown: false,
        }}
        name={'domain-page'}
        component={DomainPage}
      />
      <DomainStackNavigator.Screen
        name={'domain-info'}
        component={DomainInfo}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </DomainStackNavigator.Navigator>
  );
};
