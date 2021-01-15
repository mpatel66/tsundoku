import React, { useContext } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import AppContext from '../../context/context';
import { ReadingBook, StatusType } from '../../../Book';
import ReadingBookItem from '../../presentational/MyBooks/ReadingBookItem';


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
  }
});