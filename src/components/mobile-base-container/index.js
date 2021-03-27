import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View } from 'react-native';
import { login, logout, signUp } from '../../apis';
import { AuthContext } from '../../context/AuthContext';
import { AuthStack } from '../../stacks/auth';
import { MainStack } from '../../stacks/main';
import { GlobalStyles } from '../../styles';
import { LoadingSpinner } from '../loader';

export const MobileBaseContainer = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('session');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const session = await login(data.phone, data.password);
        dispatch({ type: 'SIGN_IN', token: session });
      },
      signOut: () => {
        AsyncStorage.clear();
        logout();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const session = await signUp(data);
        dispatch({ type: 'SIGN_IN', token: session });
      },
    }),
    []
  );

  return (
    <View style={GlobalStyles.fullScreen}>
      <AuthContext.Provider value={authContext}>
        {state.isLoading ? (
          <LoadingSpinner />
        ) : state.userToken === null ? (
          <AuthStack />
        ) : (
          <MainStack />
        )}
      </AuthContext.Provider>
    </View>
  );
};
