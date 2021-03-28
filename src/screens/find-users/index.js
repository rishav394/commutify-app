import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { searchUsersByName } from '../../apis';
import { LoadingSpinner } from '../../components/loader';
import { NoData } from '../../components/no-data';
import { SearchBar } from '../../components/search-bar';
import { UserNode } from '../../components/user-node';
import { GlobalStyles } from '../../styles';

export const FindUsers = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  const itemRenderer = ({ item }) => {
    return <UserNode user={item} navigation={navigation} />;
  };

  let timeout = useRef();

  const fetchUsersAsync = async () => {
    let usrs = await searchUsersByName(searchText);
    usrs = usrs.map((usr) => {
      const x = {};
      for (let prop in usr) {
        x[`user__${prop}`] = usr[prop];
      }
      return x;
    });
    setUsers(usrs);
    setIsLoading(false);
  };

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);
    if (searchText.length > 2) {
      isLoading && setIsLoading(true);
      timeout.current = setTimeout(fetchUsersAsync, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.container]}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        boxed
        placeholder={'Search user by name'}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 || searchText.length < 3 ? (
        <NoData
          text={
            searchText.length < 3
              ? 'Start searching for users to show up'
              : 'No such user(s) found'
          }
        />
      ) : (
        <FlatList
          data={users}
          renderItem={itemRenderer}
          keyExtractor={(item) => item.user__id}
        />
      )}
    </View>
  );
};
