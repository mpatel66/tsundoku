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

  const {state} = useContext(AppContext);
  // const genreName = categories[0];
  const [selectedIndex, setSelectedIndex] = useState(0);


  
  
  // useInfiniteQuery(['categories', categories[selectedIndex]], ({ pageParam = 0 }) => fetchByCategoryPaginated(pageParam, categories[selectedIndex]), {
  //   select: (data) => {
  //     if (data !== undefined && data.pages !== undefined) {
  //       const flattened = data.pages.flat().map((item) => {
  //         const findBook = item ? state.addedBooks.findIndex(book => book.id === item.id) : -1;
  //         if (findBook > -1) {
  //           return state.addedBooks[findBook];
  //         } else {
  //           return item;
  //         }
  //       });
  //       return {pageParams: data.pageParams, pages: [flattened]} as InfiniteData<Books[] | undefined>;
  //     }
  //     else return data;
  //   }
  // });


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