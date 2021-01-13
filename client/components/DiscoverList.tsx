import React from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Book from '../Book';
import DiscoverBook from './DiscoverBook';


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
    <SafeAreaView>
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={renderBooks}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      onEndReached={getNextPage}
      onEndReachedThreshold={0.5}
    />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: { 
    alignItems:'center',
    marginTop: 20,
  },
})

export default DiscoverList;