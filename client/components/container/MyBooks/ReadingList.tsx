import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import AppContext from '../../context/context';
import { StatusType } from '../../../Book';
import ReadingBook from '../../presentational/MyBooks/ReadingBook';

const ReadingList = () => {
  const {state} = useContext(AppContext);
  return (
    <Layout style={styles.container}>
      <Text category='h5'>
        Reading List
      </Text>
      <FlatList 
        data={state.addedBooks.filter(item => item.status === StatusType.READING)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadingBook book={item}/>}
        horizontal={true}
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