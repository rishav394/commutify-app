import React from 'react';
import { TextInput } from 'react-native';
import { colors } from '../../constants';

export const Input = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.placeholder}
      style={[
        {
          color: colors.textInput,
        },
        props.style,
      ]}
    />
  );
};
