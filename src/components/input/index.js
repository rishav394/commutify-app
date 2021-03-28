import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { colors } from '../../constants';

export class Input extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        placeholderTextColor={colors.placeholder}
        style={[
          {
            color: colors.textInput,
          },
          this.props.style,
        ]}
      />
    );
  }
}
