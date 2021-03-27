import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { GlobalStyles } from '../../styles';

export const SignUp = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [gender, setGender] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePopup, setShowDatePopup] = useState(false);

  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={GlobalStyles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType={'phone-pad'}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm password"
        value={cPassword}
        onChangeText={setCPassword}
        secureTextEntry
      />
      <TouchableNativeFeedback
        onPressIn={() => {
          setShowDatePopup(true);
        }}>
        <View style={[GlobalStyles.centered, styles.thic]}>
          <Text style={styles.signUp}>{dob || 'Click here to set DOB'}</Text>
        </View>
      </TouchableNativeFeedback>

      {showDatePopup && (
        <DateTimePicker
          value={new Date()}
          mode={'date'}
          display="calendar"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate;
            setDob(currentDate?.toISOString()?.split('T')[0]);
            setShowDatePopup(false);
          }}
        />
      )}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue === 0) {
            setGender(null);
          } else {
            setGender(itemValue);
          }
        }}>
        <Picker.Item label="Prefer not to say" value="0" />
        <Picker.Item label="Male" value="1" />
        <Picker.Item label="Female" value="2" />
        <Picker.Item label="Other" value="4" />
      </Picker>
      <Button
        title="Sign up"
        onPress={() => {
          if (password !== cPassword) {
            Alert.alert('Passwords do not match');
            return;
          }
          const data = {
            name,
            phone,
            password,
            dob,
            gender,
          };
          signUp(data).catch((error) => {
            if (error.response) {
              Alert.alert('Unable to sign up', error.response.data);
            }
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signUp: {
    color: 'grey',
  },
  thic: {
    height: 20,
  },
});
