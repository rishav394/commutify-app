import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
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
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(undefined);
  const [showDatePopup, setShowDatePopup] = useState(false);

  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={GlobalStyles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Username" value={phone} onChangeText={setPhone} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType={'phone-pad'}
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
          <Text style={styles.signUp}>
            {date?.toLocaleString() || 'Click here to set DOB'}
          </Text>
        </View>
      </TouchableNativeFeedback>

      {showDatePopup && (
        <DateTimePicker
          value={date || new Date()}
          mode={'date'}
          display="calendar"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePopup(false);
            setDate(currentDate);
          }}
        />
      )}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
        <Picker.Item label="Male" value="0" />
        <Picker.Item label="Female" value="1" />
        <Picker.Item label="Transgender" value="2" />
        <Picker.Item label="Other" value="3" />
      </Picker>
      <Button
        title="Sign up"
        onPress={() => {
          // Validate
          signUp({ username: phone, password });
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
