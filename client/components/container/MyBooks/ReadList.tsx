import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import AppContext from '../../context/context';
import { StatusType } from '../../../Book';
import ReadBook from '../../presentational/MyBooks/ReadBook';

const ReadList = () => {
  const {state} = useContext(AppContext);
  return (
    <Layout style={styles.container}>
      <Text category='h5'>
        Read List
      </Text>
      <FlatList 
        data={state.addedBooks.filter(item => item.status === StatusType.READ)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadBook book={item}/>}
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