import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
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
      <TouchableHighlight>
        <View>
          <Text style={styles.signUp}>Sign up instead</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  signUp: {
    color: 'grey',
  },
});
