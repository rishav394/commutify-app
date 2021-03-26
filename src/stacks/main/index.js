import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DomainPage } from '../../screens/domain-page';

const MainStackNavigator = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'domain-page') {
            iconName = focused ? 'alien' : 'alien-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <MainStackNavigator.Screen
        options={{
          tabBarLabel: 'Domain',
        }}
        name={'domain-page'}
        component={DomainPage}
      />
      <MainStackNavigator.Screen name={'s-page'} component={DomainPage} />
    </MainStackNavigator.Navigator>
  );
};
