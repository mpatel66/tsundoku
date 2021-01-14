import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Book from '../../../Book'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface Props {
  book: Book;
}

const ReadingBook: React.FC<Props> = ({book}) => {
  return (
    <Layout>
      <Text category='h2'>
        {book.title}
      </Text>
      <Image
        style={styles.image}
          source={
            {uri: book.imageLinks.thumbnail}
          }
        />
    </Layout>
  )
}

export default ReadingBook;


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