import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Input } from '../../components/input';
import { AuthContext } from '../../context/AuthContext';
import { GlobalStyles } from '../../styles';

export const Login = ({ navigation }) => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={GlobalStyles.container}>
      <Input
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType={'phone-pad'}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() =>
          signIn({ phone, password }).catch(() =>
            Alert.alert('Unable to login', 'Please check your details')
          )
        }
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
