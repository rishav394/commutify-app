import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getDetailedUser,
  getFriendInfo,
  removeFriend,
  sendFriendRequest,
} from '../../apis';
import { LoadingSpinner } from '../../components/loader';
import { UserPortrait } from '../../components/user-portrait';
import { genderMapping } from '../../constants';
import { GlobalStyles } from '../../styles';

/*
{
  "user__id": 346,
  "user__name": "Rodney",
  "domain__id": 1,
  "user__photo": "https://randomuser.me/api/portraits/men/98.jpg",
  "user__dob": "1967-07-14",
  "user__gender": 3,
  "connected": false
},
*/

/*
{
  "id": 1,
  "name": "Rishav Rungta",
  "email": null,
  "phone": "9958095891",
  "password": "$2a$12$K/ebLpzl1l2q50c/9T3hFuGn.4cCyQRpWfdJ.nO4ZEq58XxdUrfUS",
  "dob": "1999-01-20",
  "gender_id": 2,
  "photo": null,
  "bio": "nice",
  "joined_at": "2021-03-14T10:51:11.820900Z",
  "updated_at": "2021-03-27T06:47:41.687298Z",
  "active": true
}
*/

/*
{
  "user1__id": 1,
  "user2__id": 14,
  "status__value": "Connected",
  "initiator__id": 1
}
*/
export const UserDetails = ({ navigation, route }) => {
  const [user, setUser] = useState(undefined);
  const [friendInfo, setFriendInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserAsync = async () => {
    setIsLoading(true);
    setUser(await getDetailedUser(route.params.user__id));
    setIsLoading(false);
  };

  const fetchFriendAsync = async () => {
    setFriendInfo(await getFriendInfo(route.params.user__id));
  };

  const removeFriendAsync = async () => {
    try {
      await removeFriend(route.params.user__id);
      fetchFriendAsync();
    } catch (err) {
      Alert.alert('Could not process request', err?.response?.data);
    }
  };
  const acceptFriendRequestAsync = async () => {
    try {
      await acceptFriendRequest(route.params.user__id);
      fetchFriendAsync();
    } catch (err) {
      Alert.alert('Could not process request', err?.response?.data);
    }
  };
  const cancelFriendRequestAsync = async () => {
    try {
      await cancelFriendRequest(route.params.user__id);
      fetchFriendAsync();
    } catch (err) {
      Alert.alert('Could not process request', err?.response?.data);
    }
  };
  const sendFriendRequestAsync = async () => {
    try {
      await sendFriendRequest(route.params.user__id);
      fetchFriendAsync();
    } catch (err) {
      Alert.alert('Could not process request', err?.response?.data);
    }
  };

  useEffect(() => {
    fetchUserAsync();
    fetchFriendAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View
        style={
          (GlobalStyles.fullScreen,
          GlobalStyles.container,
          GlobalStyles.centered)
        }>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <UserPortrait user={user}>
      <View style={styles.buttonContainer}>
        {friendInfo === undefined ? (
          <ActivityIndicator color="purple" />
        ) : friendInfo.length > 0 ? (
          friendInfo[0].status__value === 'Connected' ? (
            <>
              <Button title={'Chat now'} />
              <Button
                onPress={removeFriendAsync}
                title={'Remove connection'}
                color={'red'}
              />
            </>
          ) : friendInfo[0].initiator__id === route.params.user__id ? (
            <Button
              onPress={acceptFriendRequestAsync}
              title={'Accept connection request'}
            />
          ) : (
            <Button
              onPress={cancelFriendRequestAsync}
              title={'Cancel connection request'}
            />
          )
        ) : (
          // No activity
          <Button
            onPress={sendFriendRequestAsync}
            title={'Connect'}
            color={'green'}
          />
        )}
      </View>
    </UserPortrait>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    elevation: 10,
  },
  imageContainer: {
    margin: 10,
    borderRadius: 100,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
  },
  head: {
    fontSize: 19,
    color: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    width: '90%',
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '90%',
    marginTop: 10,
  },
});
