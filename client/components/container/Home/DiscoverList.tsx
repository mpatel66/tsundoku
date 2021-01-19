import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import DiscoverBook from '../../presentational/Home/DiscoverBook';
import Books from '../../../types/Book';


interface Props {
  books: Books[] | undefined;
  getNextPage(): unknown;
}

// Renders a list of books on the Home Page.
const DiscoverList: React.FC<Props> = ({books, getNextPage}) => {
  function renderBooks ({ item } : {item: Books}) {
    return (
      <DiscoverBook book={item}/>
    );
  }

  return (
    <Layout level='2'>
      {books && 
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={(item) => renderBooks(item)}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      onEndReached={books.length < 70 ? getNextPage : () => { return; }}
      onEndReachedThreshold={0.5}
    />
      }
    </Layout>
    
  );
};

const styles = StyleSheet.create({
  container: { 
    alignItems:'center',
    marginTop: 20,
  },
});

export default DiscoverList;