import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

// Axios is storing the cookies
const kobe = Axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

// export function setAPIAuthHeaders(session) {
//   kobe.defaults.headers['Cookie'] = session;
// }

export const logout = async () => {
  await kobe.get('/logout');
};

export const login = async (phone, password) => {
  const res = await kobe.post('/login', {
    phone,
    password,
  });
  AsyncStorage.setItem('session', res.headers['set-cookie'][0]);
};

export const getDomains = async () => {
  const res = await kobe.get('/domain');
  return res.data;
};
