import { Layout, Tab, TabView } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import {  InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query';
import DiscoverList from '../components/container/Home/DiscoverList';
import FictionList from '../components/container/Home/FictionList';
import ReadList from '../components/container/MyBooks/ReadList';
import AppContext from '../components/context/context';
import categoryQuery from '../queries/categoryQuery';
import { fetchByCategoryPaginated } from '../service/APIService';
import Books from '../types/Book';



const Home: React.FC = ()  => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tab}
      >
        <Tab title='Fiction'>
          <FictionList type='Fiction' />
        </Tab>

        <Tab title='Non-Fiction'>
          <Layout>
            <FictionList type='NonFiction' />
          </Layout>
        </Tab>
      </TabView>    
    </SafeAreaView>
  );

};

export default Home;

const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  },
  tab: {
    top: 10,
  }
});