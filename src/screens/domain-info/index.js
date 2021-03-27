import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyles } from '../../styles';

export const DomainInfo = ({ navigation, route }) => {
  return (
    <View
      style={[
        GlobalStyles.noTitleBarContainer,
        GlobalStyles.fullScreen,
        GlobalStyles.centered,
      ]}>
      <Text>{route.params.name}</Text>
      <Text>{route.params.info || ''}</Text>
    </View>
  );
};
