import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, IndexPath, Layout } from '@ui-kitten/components';
// import screen from '../screenDimension';
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
  const { data, isSuccess, isError, isLoading, isFetching } = debouncedQuery(debouncedSearch,search.filter.row);

  function searchTextChange (userInput: string) {
    setSearch(prev => {return {...prev, text: userInput};});
  }
  
  function updateQueryType (index: IndexPath | IndexPath[]) {
    setSearch(prev => {
      return {...prev, filter: (index as IndexPath)};
    });
  }

  return (
    <Layout style={{flex:1}}>
      <Text category='h3'>Search</Text>
      <View>
        <SearchBar 
          searchTextChange={searchTextChange} 
          updateQueryType={updateQueryType}
          search={search}
        />
      </View>
      {/* LOADING COMPONENT */}
      {(isLoading || isFetching) && <Text>Loading....</Text>}
      {/* NOTHING FOUND COMPONENT */}
      { !(isLoading || isFetching) && (!data || !data.length || isError ) &&
        <Text>We could not find any books that match your search.</Text>}
      {/* SEARCH LIST COMPONENT */}
      <View>
        {isSuccess && data 
          &&
          <SearchList books={data}/>
        }
      </View>
    </Layout>
  );
};

export default Search;