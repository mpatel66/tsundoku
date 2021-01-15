import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import AppContext from '../../context/context';
import { ReadBook, StatusType } from '../../../Book';
import ReadBookItem from '../../presentational/MyBooks/ReadBookItem';

const ReadList = () => {
  const {state} = useContext(AppContext);
  const readBooks = state.addedBooks.filter(item => (item.status === StatusType.READ)) as ReadBook[];

  return (
    <Layout style={styles.container}>
      <Text category='h5'>
        Read List
      </Text>
      <FlatList 
        data={readBooks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadBookItem book={item}/>}
      />
    </Layout>
  )
}

export default ReadList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  }
});