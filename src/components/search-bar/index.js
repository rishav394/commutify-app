import React, { createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
      <View style={boxed ? [styles.container, styles.boxed] : styles.container}>
        <TextInput
          ref={inputRef}
          placeholder={placeholder || 'Search'}
          value={searchText}
          onChangeText={setSearchText}
          maxLength={20}
          style={styles.text}
          blurOnSubmit={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  boxed: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },
});
