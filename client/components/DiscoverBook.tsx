import React from 'react';
import Book from '../Book';
import { Text, StyleSheet, View, Image } from 'react-native';

interface Props {
  book: Book;
}

const DiscoverBook: React.FC<Props> = ({book}) => {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
        source={
          {uri: book.imageLinks.smallThumbnail}
        }
      />
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