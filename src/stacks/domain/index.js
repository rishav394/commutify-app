import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DomainInfo } from '../../screens/domain-info';
import { DomainPage } from '../../screens/domain-page';
import { UserPage } from '../../screens/users-page';

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
      <DomainStackNavigator.Screen
        name={'user-page'}
        component={UserPage}
        options={{
          title: 'Users in domain',
        }}
      />
      <DomainStackNavigator.Screen
        name={'user-details'}
        component={UserPage}
        options={{
          title: 'Users details',
        }}
      />
    </DomainStackNavigator.Navigator>
  );
};
