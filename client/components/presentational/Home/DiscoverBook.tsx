import React from 'react';
import { StyleSheet, View } from 'react-native';
import Book from '../../../types/Book';
import TouchableCover from '../../cards/TouchableCover';

interface Props {
  book: Book;
}

const DiscoverBook: React.FC<Props> = ({book}) => {
  return (
    <View style={styles.container}>
      <TouchableCover book={book} imageSize='normal'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
});

export default DiscoverBook;