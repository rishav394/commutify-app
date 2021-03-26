import React, { useState } from 'react';
import { FlatList, TouchableNativeFeedback, View } from 'react-native';
import { DomainNode } from '../../components/domain-node';
import { LoadingSpinner } from '../../components/loader';
import { SearchBar } from '../../components/search-bar';
import { GlobalStyles } from '../../styles';

export const DomainPage = () => {
  const [searchText, setSearchText] = useState('');
  const [domains, setDomains] = useState([]);

  return (
    <View style={[GlobalStyles.container, GlobalStyles.fullScreen]}>
      {domains.length > 0 ? (
        <>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <View>
            <FlatList
              data={domains}
              renderItem={({ item }) => {
                return (
                  <TouchableNativeFeedback
                    onPress={() => {
                      // navigate to item
                    }}>
                    <View>
                      <DomainNode name={item} subscribed={true} />
                    </View>
                  </TouchableNativeFeedback>
                );
              }}
              keyExtractor={(item) => item}
            />
          </View>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
};
