import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { subscribeDomain, unSubscribeDomain } from '../../apis';
import { GlobalStyles } from '../../styles';

export const DomainInfo = ({ navigation, route }) => {
  return (
    <View
      style={[
        GlobalStyles.noTitleBarContainer,
        GlobalStyles.fullScreen,
        GlobalStyles.container,
        GlobalStyles.centered,
        styles.container,
      ]}>
      <Text style={styles.heading}>{route.params.name}</Text>
      {route.params.info && (
        <Text style={styles.text}>{route.params.info}</Text>
      )}
      {route.params.subscribed && (
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('user-page', {
              domainId: route.params.id,
            });
          }}>
          <View style={styles.memberContainer}>
            <Text style={styles.heading}>View members</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="black"
            />
          </View>
        </TouchableNativeFeedback>
      )}

      <Button
        onPress={async () => {
          try {
            route.params.subscribed
              ? await unSubscribeDomain(route.params.id)
              : await subscribeDomain(route.params.id);
            route.params.onGoBack();
            navigation.goBack();
          } catch (error) {
            Alert.alert(
              `Could not ${
                route.params.subscribed ? 'UnSubscribe' : 'Subscribe'
              }`,
              error.response?.data
            );
          }
        }}
        title={route.params.subscribed ? 'UnSubscribe' : 'Subscribe'}
        color={route.params.subscribed ? 'red' : 'green'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 19,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  memberContainer: {
    backgroundColor: '#f5f5f5',
    width: '80%',
    height: 50,
    justifyContent: 'space-between',
    padding: 10,
    elevation: 5,
    shadowColor: 'grey',
    flexDirection: 'row',
    paddingTop: 10,
  },
});
