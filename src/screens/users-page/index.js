import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { fetchUsersInDomain } from '../../apis';
import { SearchBar } from '../../components/search-bar';
import { UserNode } from '../../components/user-node';
import { GlobalStyles } from '../../styles';

export const UserPage = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const fetchUsers = async () => {
    setUsers(await fetchUsersInDomain(route.params.domainId));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.container]}>
      <SearchBar
        searchText={searchValue}
        setSearchText={setSearchValue}
        boxed
      />
      <ScrollView contentContainerStyle={[GlobalStyles.centered]}>
        {users
          .filter((user) =>
            user.user__name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((user) => (
            <UserNode user={user} key={user.user__id} navigation={navigation} />
          ))}
      </ScrollView>
    </View>
  );
};
