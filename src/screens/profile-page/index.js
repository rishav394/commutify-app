import React, { useEffect, useState } from 'react';
import { Button, RefreshControl, View } from 'react-native';
import { whoami } from '../../apis';
import { LoadingSpinner } from '../../components/loader';
import { UserPortrait } from '../../components/user-portrait';
import { AuthContext } from '../../context/AuthContext';
import { GlobalStyles } from '../../styles';

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useState();

  const { signOut } = React.useContext(AuthContext);

  const fetchMeAsync = async () => {
    setMe(await whoami());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeAsync();
  }, []);

  return (
    <View
      style={[
        GlobalStyles.fullScreen,
        GlobalStyles.container,
        GlobalStyles.centered,
      ]}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <UserPortrait
            user={me}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchMeAsync} />
            }>
            <View style={GlobalStyles.container}>
              <Button onPress={signOut} title="Logout" />
            </View>
          </UserPortrait>
        </>
      )}
    </View>
  );
};
