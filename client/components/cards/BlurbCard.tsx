import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Book from '../../types/Book';


interface Props {
  book:Book;
}

const BlurbCard: React.FC<Props> = ({book}) => {
  return (
    <ScrollView>
      <Card style={styles.blurbText}>
        <Text category='s1'>Pages</Text>
        <Text>{book.volumeInfo.pageCount}</Text>
        <Text category='s1'>Genres</Text>
        <Text>{book.volumeInfo.categories.join(', ')}</Text>
        <Text category='s1'>Description</Text>
        <Text>{book.volumeInfo.description}</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blurbText: {
    paddingHorizontal: 10,
  },
});

export default BlurbCard;


