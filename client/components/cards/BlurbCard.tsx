import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Book from '../../types/Book';
import screen from '../../screenDimension';

interface Props {
  book:Book;
}

const {width} = screen;

const BlurbCard: React.FC<Props> = ({book}) => {
  return (
    <ScrollView>
      <View style={styles.shadow}>
        <Card style={styles.blurbText} appearance='filled'>
          <View style={styles.metaData}>
            <View style={styles.pages}>
              <Text category='p1'>Pages</Text>
              <Text category='h6'>{book.volumeInfo.pageCount}</Text>
            </View>
            <View style={styles.pages}>
              <Text category='p1'>Genre</Text>
              <Text category='h6'>{book.volumeInfo.categories.join(', ')}</Text>
            </View>
          </View>
          <View>
            <Text category='s1'>Description</Text>
            <Text category='p1'>{book.volumeInfo.description}</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blurbText: {
    paddingHorizontal: 3,
    // paddingVertical: 1
    width: width - 10,
  },
  metaData: {
    flexDirection: 'row',
  },
  pages: {
    borderRadius: 5,
    backgroundColor: '#FDE7E8',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default BlurbCard;


