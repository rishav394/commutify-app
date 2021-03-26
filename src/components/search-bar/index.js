import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../styles';

export const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.container}>
        <TextInput
          placeholder={'Search text'}
          value={searchText}
          onChangeText={setSearchText}
          maxLength={20}
          style={styles.text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'grey',
  },
});
