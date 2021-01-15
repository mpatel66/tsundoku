import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Book from '../../Book';

interface Props {
  book:Book;
}

const BlurbCard: React.FC<Props> = ({book}) => {
  return (
    <ScrollView>
      <Card style={styles.blurbText}>
        <Text category='s1'>Pages</Text>
        <Text>{book.pageCount}</Text>
        <Text category='s1'>Genres</Text>
        <Text>{book.categories.join(', ')}</Text>
        <Text category='s1'>Description</Text>
        <Text>{book.description}</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  blurbText: {
    paddingHorizontal: 10,
  },
});

export default BlurbCard;

