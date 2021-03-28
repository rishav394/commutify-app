import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { getDefaultImage, genderMapping } from '../../constants';
import { GlobalStyles } from '../../styles';

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
export const UserPortrait = ({ user, ...props }) => {
  return (
    <ScrollView
      contentContainerStyle={[
        GlobalStyles.centered,
        GlobalStyles.container,
        styles.container,
      ]}
      refreshControl={props.refreshControl}>
      <Image
        source={{
          uri: user?.photo || getDefaultImage(user?.id),
        }}
        style={styles.imageContainer}
        height={200}
        width={200}
      />
      <Text style={styles.head}>About</Text>
      <Text style={styles.text}>{user?.name}</Text>
      {user?.bio && <Text style={styles.text}>{user?.bio}</Text>}
      <Text style={styles.text}>Born {user?.dob}</Text>
      {user?.gender_id && (
        <Text style={styles.text}>{genderMapping[user?.gender_id]}</Text>
      )}
      <Text style={styles.head}>Contact</Text>
      {user?.email && <Text style={styles.text}>{user?.email}</Text>}
      {user?.phone && <Text style={styles.text}>{user?.phone}</Text>}
      <Text style={styles.head}>Member since</Text>
      <Text style={styles.text}>
        {new Date(user?.joined_at).toDateString()}
      </Text>
      <Text style={styles.head}>Social</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 10,
    borderRadius: 100,
    backgroundColor: 'red',
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
});
