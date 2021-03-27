import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { fetchUserById, fetchUsersInDomain } from '../../apis';
import { LoadingSpinner } from '../../components/loader';
import { SearchBar } from '../../components/search-bar';
import { UserNode } from '../../components/user-node';
import { GlobalStyles } from '../../styles';

export const UserList = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsersInDomainAsync = async () => {
    setIsLoading(true);
    setUsers(await fetchUsersInDomain(route.params.domainId));
    setIsLoading(false);
  };

  const fetchUsersByUids = async () => {
    setIsLoading(true);
    const tempUsers = [];
    await Promise.all(
      route.params.uids.map(async (uid) => {
        const usr = (await fetchUserById(uid))[0];
        const x = {};
        Object.keys(usr).forEach((p) => {
          x['user__' + p] = usr[p];
        });
        tempUsers.push(x);
      })
    );
    setUsers(tempUsers);
    setIsLoading(false);
  };

  useEffect(() => {
    if (route.params.uids) {
      fetchUsersByUids();
    } else {
      fetchUsersInDomainAsync();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.container]}>
      <SearchBar
        searchText={searchValue}
        setSearchText={setSearchValue}
        boxed
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView contentContainerStyle={[GlobalStyles.centered]}>
          {users
            .filter((user) =>
              user.user__name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((user) => (
              <UserNode
                back={''}
                user={user}
                key={user.user__id}
                navigation={navigation}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};
