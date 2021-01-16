import React, { useEffect, useState } from 'react';
import { SafeAreaView, Keyboard, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { QueryObserverResult, useQuery, useQueryClient } from 'react-query';
import { fetchBySearch } from '../service/APIService';



function useDebounce (search: string, time: number = 500) {
  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search)
    }, time);

    return () => {
      // clear timeout on unmount
      clearTimeout(handler);
    }
  },[search, time])
  return debounced;
}



function fireQuery(queryString:string) {
  return useQuery(['search', queryString], () => fetchBySearch(queryString), {enabled: !!queryString,});
}

export default function Search() {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const debouncedSearch = useDebounce(text)
  const { data, isSuccess }: QueryObserverResult<any> = fireQuery(debouncedSearch);

  // Next step: render data. Update to paginated query

  return (
    <SafeAreaView>
      <Text category='h1'>This is the search screen</Text>
      <ScrollView 
        style={styles.container}
        keyboardShouldPersistTaps='never' 
        scrollEnabled={false}
        keyboardDismissMode="on-drag">
        <Input 
          style={styles.search}
          size='large'
          value={text}
          onChangeText={(search) => setText(search)}
        />
        <Text>{text}</Text>
      </ScrollView>
      {isSuccess && <Text>Something Happened</Text> }
      {/* <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.title}</Text>}
        // ItemSeparatorComponent={() => <Divider/>}
        // contentContainerStyle={styles.flatList}
      /> */}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  search: {
    // backgroundColor: 'red',
  },
  container: {
    // backgroundColor: 'black',
    // height: 400,
  }
})