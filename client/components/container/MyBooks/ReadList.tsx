import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import AppContext from '../../context/context';
import { ReadBook, StatusType } from '../../../types/Book';
import ReadBookItem from '../../presentational/MyBooks/ReadBookItem';


// renders a list of books you've completed.
const ReadList: React.FC = () => {
  const {state} = useContext(AppContext);
  const readBooks = state.addedBooks.filter(item => (item.status === StatusType.READ)) as ReadBook[];

  return (
    <Layout style={styles.container}>
      <FlatList 
        data={readBooks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadBookItem book={item}/>}
        ItemSeparatorComponent={() => <Divider/>}
        contentContainerStyle={styles.flatList}
      />
    </Layout>
  );
};

export default ReadList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding:10,
  },
  flatList: {
    paddingBottom:120,
  }
});