import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FindUsers } from '../../screens/find-users';
import { FriendsPage } from '../../screens/friends-page';
import { UserDetails } from '../../screens/user-details';
import { UserList } from '../../screens/users-list';

const FriendStackNavigator = createStackNavigator();

export const FriendStack = () => {
  return (
    <FriendStackNavigator.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: '#2c9fd1',
      }}>
      <FriendStackNavigator.Screen
        options={{
          title: 'Friend list',
        }}
        name={'friends-page'}
        component={FriendsPage}
      />
      <FriendStackNavigator.Screen
        options={{
          title: 'Friend list',
        }}
        name={'user-list'}
        component={UserList}
      />
      <FriendStackNavigator.Screen
        name={'user-details'}
        component={UserDetails}
        options={{
          title: 'Users details',
        }}
      />
      <FriendStackNavigator.Screen
        name={'find-users'}
        component={FindUsers}
        options={{
          title: 'Find user',
        }}
      />
    </FriendStackNavigator.Navigator>
  );
};
