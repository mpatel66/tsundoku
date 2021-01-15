import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import Book from '../../Book';

interface Props {
  book: Book;
}

const AuthorImage: React.FC<Props> = ( {book}) => {
  return (
    <Card style={styles.card}>
      <Text category='h4'>{book.title}</Text>
      <Text category='s1'>{book.authors.length > 1 ? book.authors.join(', ') : book.authors}</Text>
      <View style={styles.imageContainer}>
        <Image
        style={styles.image}
        source={{uri: book.imageLinks.thumbnail}}
        />
      </View>
    </Card>
  )
}
export default AuthorImage;
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10,
  },
  card: {
    margin: 10,
  },
})