import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, FlatList, View } from 'react-native';
import { Text, Input, Divider, SelectItem, Select, IndexPath } from '@ui-kitten/components';
import { useQuery, useQueryClient } from 'react-query';
import { fetchByAuthor, fetchBySearch, fetchByTitle } from '../service/APIService';
import AddedBookItem from '../components/presentational/MyBooks/AddedBookItem';
import screen from '../screenDimension';
import AppContext from '../components/context/context';
import Books from '../types/Book';
import SearchList from '../components/container/Search/SearchList';

function useDebounce (search: string, time = 600) {

  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, time);
    return () => {
      // clear timeout on unmount
      clearTimeout(handler);
    };
  },[search, time]);   
  return debounced;
}



function fireQuery (queryString:string, queryType:string) {
  const {state} = useContext(AppContext);

  const removeDuplicates = (data) => {
    return data.map((item: Books) => {
      const index = state.addedBooks.findIndex(addedBook => addedBook.id === item.id);
      if (index > - 1) return item = state.addedBooks[index];
      return item; 
    });
  };

  if (queryType === 'Author') {
    return useQuery(['search','author', queryString], 
      () => fetchByAuthor(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
  else if (queryType === 'Title') {
    return useQuery(['search', 'title', queryString], 
      () => fetchByTitle(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
  else {
    return useQuery(['search', queryString], 
      () => fetchBySearch(queryString), {
        enabled: !!queryString,
        select: (data) => removeDuplicates(data),
      });
  }
}

const { width } = screen;
const Search: React.FC = () => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState(new IndexPath(0) as IndexPath);
  const [value, setValue] = useState('All');
  const queryTypes = ['All', 'Title', 'Author'];
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(text);
  const { data, isSuccess, isError, isLoading, isFetching } = fireQuery(debouncedSearch,value);

  function updateQueryType (index: IndexPath | IndexPath[]) {
    setFilter((index as IndexPath)); // Not a multiselect, so index will never be an array of IndexPaths.
    setValue(queryTypes[(index as IndexPath).row]);
  }

  console.log(debouncedSearch, queryClient.getQueryCache().findAll().length);
  return (
    <SafeAreaView>
      {/* <Text category='h1'>This is the search screen</Text> */}
      <View>
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='never' 
          scrollEnabled={false}
          keyboardDismissMode="on-drag">
          <Select
            style={styles.filter}
            size='large'
            selectedIndex={filter}
            multiSelect={false}
            placeholder='Search All'
            value={value}
            onSelect={(index) => updateQueryType(index)}
          >
            <SelectItem title='All'/>
            <SelectItem title='Title'/>
            <SelectItem title='Author'/>
          </Select>
          <Input 
            style={styles.search}
            size='large'
            value={text}
            onChangeText={(search) => setText(search)}
          />
        </ScrollView> 
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


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  search: {
    // backgroundColor: 'pink',
    width: (width/3) * 2 - 20,
    marginRight: 5,
    marginLeft: 3,
    marginVertical: 5,
  },
  filter : {
    width: width/3 - 10,
    marginLeft: 5,
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
  },

});

export default Search;