import React, { useContext } from 'react';
import Book from '../../Book';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import AppContext from '../context/context';

interface Props {
  book: Book;
}

const DiscoverBook: React.FC<Props> = ({book}) => {
  const {dispatch} = useContext(AppContext)
  
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} 
      onPress={() => dispatch({type:'OPEN_MODAL', selectedBook: book})}
      >
        <Image
        style={styles.image}
          source={
            {uri: book.imageLinks.thumbnail}
          }
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
  },
  container: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
});

export default DiscoverBook;