import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Book from '../../../Book';
import { Layout } from '@ui-kitten/components';
import DiscoverBook from '../../presentational/Home/DiscoverBook';


interface Props {
  books: Book[] | undefined;
  getNextPage(): any;
}

const DiscoverList: React.FC<Props> = ({books, getNextPage}) => {
  function renderBooks ({ item } : {item: Book}) {
    return (
      <DiscoverBook book={item}/>
    )
  }

  return(
    <Layout level='2'>
    {books && 
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={renderBooks}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      onEndReached={books.length < 70 ? getNextPage: () =>{}}
      onEndReachedThreshold={0.5}
    />
    }
    </Layout>
    
  )
}

const styles = StyleSheet.create({
  container: { 
    alignItems:'center',
    marginTop: 20,
  },
})

export default DiscoverList;