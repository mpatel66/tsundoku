import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import AppContext from '../../context/context';
import ReadingBookItem from '../../presentational/MyBooks/ReadingBookItem';
import { StatusType, ReadingBook } from '../../../types/Book';


const ReadingList = () => {
  const {state} = useContext(AppContext);
  const currentlyReading = state.addedBooks.filter(item => (item.status === StatusType.READING)) as ReadingBook[];

  return (
    <Layout style={styles.container}>
      <Text category='h5'>
        Reading List
      </Text>
      <FlatList 
        data={currentlyReading}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadingBookItem book={item}/>}
        horizontal={false}
        contentContainerStyle={styles.flatList}
        // snapToInterval={width}
      />
    </Layout>

  )
}

export default ReadingList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  },
  flatList: {
    paddingBottom: 120,
  }
});