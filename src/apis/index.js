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

export const getDetailedUser = async (uid) => {
  const res = await kobe.post('/users', {
    id: uid,
  });
  return res.data[0];
};

export const sendFriendRequest = async (uid) => {
  await kobe.put('/friends', {
    friend_id: uid,
  });
};

export const acceptFriendRequest = async (uid) => {
  await kobe.patch('/friends', {
    friend_id: uid,
  });
};

export const cancelFriendRequest = async (uid) => {
  await removeFriend(uid);
};

export const removeFriend = async (uid) => {
  await kobe.delete('/friends', {
    data: {
      friend_id: uid,
    },
  });
};

export const getFriendInfo = async (uid) => {
  return (await kobe.get(`/friends?friend_id=${uid}`)).data;
};

export const getAllFriends = async () => {
  return (await kobe.post('/friends')).data;
};

export const whoami = async () => {
  return (await kobe.get('/whoami')).data;
};

export const fetchUserById = async (id) => {
  return (
    await kobe.post('/users', {
      id,
    })
  ).data;
};
