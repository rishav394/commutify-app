import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <TouchableNativeFeedback
          onPress={() => {
            Alert.alert(
              'To add a domain kindle contact the Admin',
              'khushitulsyan1@gmail.com\n9916614719'
            );
          }}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="card-plus-outline"
              size={25}
              color={props.tintColor}
            />
          </View>
        </TouchableNativeFeedback>
      ),
    });
  }, [navigation]);

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
        GlobalStyles.noTitleBarContainer,
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

const styles = StyleSheet.create({
  headerIcon: {
    padding: 10,
  },
});
