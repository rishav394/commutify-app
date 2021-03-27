import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { getDomains } from '../../apis';
import { DomainNode } from '../../components/domain-node';
import { LoadingSpinner } from '../../components/loader';
import { NoData } from '../../components/no-data';
import { SearchBar } from '../../components/search-bar';
import { GlobalStyles } from '../../styles';

export const DomainPage = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState('');
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemRenderer = ({ item }) => {
    return (
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('domain-info', {
              ...item,
            });
          }}>
          <View>
            <DomainNode name={item.name} subscribed={item.subscribed} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const fetchDomainAsync = async () => {
    setIsLoading(true);
    setDomains(await getDomains());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDomainAsync();
  }, []);

  useEffect(() => {
    if (route?.params?.refresh) {
      fetchDomainAsync();
    }
  }, [route]);

  return (
    <View
      style={[
        GlobalStyles.container,
        GlobalStyles.fullScreen,
        GlobalStyles.bottomTabBottomContainer,
      ]}>
      {isLoading ? (
        <LoadingSpinner />
      ) : domains.length > 0 ? (
        <>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <View>
            <FlatList
              data={domains.filter((domain) =>
                domain.name.toLowerCase().includes(searchText.toLowerCase())
              )}
              renderItem={itemRenderer}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={fetchDomainAsync}
                />
              }
            />
          </View>
        </>
      ) : (
        <NoData />
      )}
    </View>
  );
};
