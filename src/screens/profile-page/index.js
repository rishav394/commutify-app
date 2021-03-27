import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, View } from 'react-native';

export const ProfilePage = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Button onPress={signOut} title="Logout" />
    </View>
  );
};
