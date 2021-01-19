import { Divider, Layout } from '@ui-kitten/components';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Books from '../../../types/Book';
import ErrorMessage from '../../messages/ErrorMessage';
import AddedBookItem from '../../presentational/MyBooks/AddedBookItem';

interface Props {
  books: Books[];
}
// renders a list of search results from user input.
const SearchList: React.FC<Props> = ({books}) => {

  const renderSearch: React.FC<{item:Books}> = ({item}) => (<AddedBookItem book={item}/>);

  return (
    <Layout style={styles.container}>
      <FlatList 
        data={books}
        keyExtractor={item => item.id}
        renderItem={renderSearch}
        ItemSeparatorComponent={() => <Divider/>}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={<ErrorMessage message='No books found! Try a different search!' />}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  },
  flatList: {
    paddingBottom: 250,
  }
});

export default SearchList;