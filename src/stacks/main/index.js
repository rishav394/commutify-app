import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DomainStack } from '../domain';
import { FriendStack } from '../friend';
import { ProfileStack } from '../profile';

const MainTabNavigator = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <MainTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'domain-stack') {
            iconName = focused ? 'alien' : 'alien-outline';
          } else if (route.name === 'friend-stack') {
            iconName = focused ? 'airballoon' : 'airballoon-outline';
          } else if (route.name === 'profile-stack') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
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
      <MainTabNavigator.Screen
        options={{
          tabBarLabel: 'Domain',
        }}
        name={'domain-stack'}
        component={DomainStack}
      />
      <MainTabNavigator.Screen
        options={{
          tabBarLabel: 'Connections',
          unmountOnBlur: true,
        }}
        name={'friend-stack'}
        component={FriendStack}
      />
      <MainTabNavigator.Screen
        options={{
          tabBarLabel: 'Profile',
        }}
        name={'profile-stack'}
        component={ProfileStack}
      />
    </MainTabNavigator.Navigator>
  );
};
