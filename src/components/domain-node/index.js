import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DomainNode = (props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.subscribed ? '#18ba64' : '#c42323',
        },
      ]}>
      <Text style={styles.text} numberOfLines={1}>
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    width: '97%',
    height: 60,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
  },
});
