import React, { useState } from 'react';
import { View } from 'react-native';
import { IndexPath, Layout } from '@ui-kitten/components';
import SearchList from '../components/container/Search/SearchList';
import debouncedQuery from '../queries/debouncedQuery';
import useDebounce from '../queries/debouncedSearch';
import SearchBar from '../components/search/SearchBar';
import { SearchInterface } from '../types/SearchTypes';
import { useQueryClient } from 'react-query';


const initialSearch: SearchInterface = {
  text: '',
  filter: new IndexPath(0) as IndexPath,
};

const Search: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search.text);
  const { data, isSuccess } = debouncedQuery(debouncedSearch.trim(),search.filter.row);

  function searchTextChange (userInput: string) {
    setSearch(prev => {return {...prev, text: userInput};});
  }
  
  function updateQueryType (index: IndexPath | IndexPath[]) {
    setSearch(prev => {
      return {...prev, filter: (index as IndexPath)};
    });
  }
  console.log(data, 'loading');

  return (
    <Layout style={{flex:1}}>
      <View>
        <SearchBar 
          searchTextChange={searchTextChange} 
          updateQueryType={updateQueryType}
          search={search}
        />
      </View>
      {(isSuccess && data) && <SearchList books={data}/>}
    </Layout>
  );
};

export default Search;

// const styles = StyleSheet.create({
//   error: {
//     alignItems: 'center',
//   }
// });