import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { GlobalStyles } from '../../styles';

export const Login = ({ navigation }) => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={GlobalStyles.container}>
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => signIn({ username: phone, password })}
      />
      <TouchableWithoutFeedback
        onPressIn={() => {
          navigation.navigate('Signup');
        }}>
        <View style={[GlobalStyles.centered, GlobalStyles.container]}>
          <Text style={styles.signUp}>Sign up instead</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  signUp: {
    color: 'grey',
  },
});
