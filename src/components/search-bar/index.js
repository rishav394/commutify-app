import React, { createRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Input } from '../input';

export const SearchBar = ({
  searchText,
  setSearchText,
  placeholder,
  boxed,
}) => {
  const inputRef = createRef();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current.focus();
      }}>
      <View style={boxed ? [styles.boxed] : undefined}>
        <Input
          ref={inputRef}
          placeholder={placeholder || 'Search'}
          value={searchText}
          onChangeText={setSearchText}
          maxLength={20}
          style={styles.text}
          selectTextOnFocus={true}
          blurOnSubmit={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  boxed: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 4,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
  },
});
