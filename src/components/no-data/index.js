import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const NoData = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text || 'No Data'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
