import { Card } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Book from '../../types/Book';
import screen from '../../screenDimension';
import Fonts from '../../styles/fonts';

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
            {book.volumeInfo.pageCount !== undefined &&
            <View style={styles.pages}>
              <Text style={Fonts.paragraph}>Pages</Text>
              <Text style={Fonts.subHeading}>{book.volumeInfo.pageCount}</Text>
            </View>}
            <View style={styles.pages}>
              <Text style={Fonts.subHeading}>{book.volumeInfo.categories.join(', ')}</Text>
            </View>
          </View>
          <View>
            <Text style={Fonts.subHeading}>Description</Text>
            <Text style={Fonts.paragraph}>{book.volumeInfo.description}</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blurbText: {
    paddingHorizontal: 3,
    width: width - 10,
  },
  metaData: {
    flexDirection: 'row',
    marginBottom: 10,
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


