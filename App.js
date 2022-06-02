/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

import type {Node} from 'react';
const renderItem = item => {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: item.item % 2 == 0 ? 'red' : 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>index{item.index}</Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshData();
    MessageQueue.spy(true);
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }
    setData(arr);
    setRefreshing(false);
  };

  const loadData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }
    setData(data.concat(arr));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        renderItem={renderItem}
        onRefresh={refreshData}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'gray', height: 1}} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={loadData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
