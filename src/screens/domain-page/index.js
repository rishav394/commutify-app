import React, { useEffect, useState } from 'react';
import { FlatList, TouchableNativeFeedback, View } from 'react-native';
import { getDomains } from '../../apis';
import { DomainNode } from '../../components/domain-node';
import { LoadingSpinner } from '../../components/loader';
import { NoData } from '../../components/no-data';
import { SearchBar } from '../../components/search-bar';
import { GlobalStyles } from '../../styles';

export const DomainPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemRenderer = ({ item }) => {
    return (
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('domain-info', item);
          }}>
          <View>
            <DomainNode name={item.name} subscribed={item.subscribed} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  useEffect(() => {
    const setDomainAsync = async () => {
      setDomains(await getDomains());
      setIsLoading(false);
    };

    setDomainAsync();
  }, []);

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
            />
          </View>
        </>
      ) : (
        <NoData />
      )}
    </View>
  );
};
