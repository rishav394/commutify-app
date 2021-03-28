import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { getDefaultImage, genderMapping } from '../../constants';
import { calculateAge } from '../../util';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
export const UserNode = ({ user, navigation }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate('user-details', user);
      }}>
      <View style={styles.container}>
        <Image
          height={40}
          width={40}
          style={styles.image}
          source={{
            uri: user.user__photo || getDefaultImage(),
          }}
        />
        <View style={styles.friendshipContainer}>
          <View style={styles.text}>
            <Text>{user.user__name}</Text>
            <Text>
              {calculateAge(user.user__dob) +
                ' , ' +
                genderMapping[user.user__gender || 0]}
            </Text>
          </View>

          <View style={styles.text}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={user.connected ? 'green' : 'grey'}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  image: {
    height: 45,
    width: 45,
    margin: 4,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    width: '95%',
    height: 50,
    margin: 7,
  },
  friendshipContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
});
