import React, { useState } from 'react';
import { Button, TextInput, View, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export const SignUp = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [showDatePopup, setShowDatePopup] = useState(false);

  const { signUp } = React.useContext(AuthContext);

  return (
    <View>
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
      <Button
        title={date.toISOString() || 'D.O.B'}
        onPress={() => {
          setShowDatePopup(true);
        }}
      />
      {showDatePopup && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display="calendar"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePopup(Platform.OS === 'ios');
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
