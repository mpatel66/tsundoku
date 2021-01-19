import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Divider, Layout  } from '@ui-kitten/components';
import AppContext from '../../context/context';
import Book, { StatusType } from '../../../types/Book';
import AddedBookItem from '../../presentational/MyBooks/AddedBookItem';

const AddedList: React.FC = () => {
  const {state} = useContext(AppContext);
  const added = state.addedBooks.filter(item => (item.status === StatusType.ADDED)) as Book[];
  return (
    <Layout style={styles.container}>
      <FlatList 
        data={added}
        keyExtractor={item => item.id}
        renderItem={({item}) => <AddedBookItem book={item}/>}
        ItemSeparatorComponent={() => <Divider/>}
        contentContainerStyle={styles.flatList}
      />
    </Layout>
  );
};

export default AddedList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding:10,
  },
  flatList: {
    paddingBottom:120,
  }
});