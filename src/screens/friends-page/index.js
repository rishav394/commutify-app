import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllFriends, whoami } from '../../apis';
import { LoadingSpinner } from '../../components/loader';
import { GlobalStyles } from '../../styles';

/*
{
    "user1__id": 1,
    "user2__id": 368,
    "status__value": "Connected",
    "initiator__id": 368
},
*/
export const FriendsPage = ({ navigation, route }) => {
  const [friends, setFriends] = useState([]);
  const [friendsIncoming, setFriendsIncoming] = useState([]);
  const [friendsOutgoing, setFriendsOutgoing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [i, setI] = useState();

  const fetchFriendsAsync = async () => {
    setIsLoading(true);
    let me;
    if (i) {
      me = i;
    } else {
      me = await whoami();
      setI(me);
    }
    const tempFriends = await getAllFriends();
    setFriends(
      tempFriends
        .filter((f) => f.status__value === 'Connected')
        .map((f) => (f.user1__id === me.id ? f.user2__id : f.user1__id))
    );
    const pendingFriends = tempFriends.filter(
      (f) => f.status__value !== 'Connected'
    );
    setFriendsIncoming(
      pendingFriends
        .filter((f) => f.initiator__id !== me.id)
        .map((f) => (f.user1__id === me.id ? f.user2__id : f.user1__id))
    );
    setFriendsOutgoing(
      pendingFriends
        .filter((f) => f.initiator__id === me.id)
        .map((f) => (f.user1__id === me.id ? f.user2__id : f.user1__id))
    );
    setIsLoading(false);
  };
  let interval = useRef();

  useEffect(() => {
    fetchFriendsAsync();
    interval.current = setInterval(() => {
      fetchFriendsAsync();
    }, 12000);
    return () => {
      interval.current && clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('find-users');
          }}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={25}
              color={props.tintColor}
            />
          </View>
        </TouchableNativeFeedback>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={fetchFriendsAsync} refreshing={isLoading} />
      }
      contentContainerStyle={[GlobalStyles.fullScreen]}>
      <View
        style={[
          GlobalStyles.container,
          GlobalStyles.centered,
          GlobalStyles.fullScreen,
        ]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FriendButton
              onClick={() => {
                navigation.navigate('user-list', {
                  uids: friends,
                });
              }}
              text={'Connected users'}
            />
            <FriendButton
              onClick={() => {
                navigation.navigate('user-list', {
                  uids: friendsOutgoing,
                });
              }}
              text={'Sent requests'}
            />
            <FriendButton
              onClick={() => {
                navigation.navigate('user-list', {
                  uids: friendsIncoming,
                });
              }}
              text={'Connection requests'}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const FriendButton = ({ text, onClick }) => {
  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View style={styles.buttonContainer}>
        <Text>{text}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffc485',
    width: '100%',
    padding: 9,
    borderRadius: 5,
    margin: 4,
  },
  headerIcon: {
    padding: 10,
  },
});
