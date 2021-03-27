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
  return res.headers['set-cookie'][0];
};

export const signUp = async (data) => {
  const res = await kobe.put('/sign-up', data);
  AsyncStorage.setItem('session', res.headers['set-cookie'][0]);
  return res.headers['set-cookie'][0];
};

export const getDomains = async () => {
  const res = await kobe.get('/domain');
  return res.data;
};

export const subscribeDomain = async (domainId) => {
  return await kobe.put('/domain-user', {
    domain: domainId,
  });
};

export const unSubscribeDomain = async (domainId) => {
  console.log(domainId);
  return await kobe.delete('/domain-user', {
    data: {
      domain: domainId,
    },
  });
};

export const fetchUsersInDomain = async (domainId) => {
  const res = await kobe.post('/domain-user', {
    domain__id: domainId,
  });
  return res.data;
};
