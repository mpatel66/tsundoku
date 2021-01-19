import { IndexPath, Input, Select, SelectItem } from '@ui-kitten/components';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import screen from '../../screenDimension';
import { StyleSheet } from 'react-native';
import { SearchInterface } from '../../types/SearchTypes';

const {width} = screen;

interface Props {
  searchTextChange(userInput: string): void;
  updateQueryType(index: IndexPath | IndexPath[]): void;
  search: SearchInterface;
}

const SearchBar: React.FC<Props> = ({searchTextChange, updateQueryType, search}) => {
  const value = 
      search.filter.row === 0 ? 'All' 
        : search.filter.row === 1 ? 'Title'
          : 'Author';


  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='never' 
      scrollEnabled={false}
      keyboardDismissMode="on-drag">
      <Select
        style={styles.filter}
        size='large'
        selectedIndex={search.filter}
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
        value={search.text}
        onChangeText={(search) => searchTextChange(search)}
      />
    </ScrollView> 
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
    backgroundColor: '#223773',
  },

});

export default SearchBar;
