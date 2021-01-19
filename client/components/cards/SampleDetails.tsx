import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RatingButton from '../buttons/RatingButton';
import moment from 'moment';
import StatusUpdateButton from '../buttons/StatusUpdateButton';
import Book, { ReadBook, isReadBook, isBook } from '../../types/Book';
import UpdateReadDate from '../buttons/UpdateReadDate';
import Fonts from '../../styles/fonts';

interface Props {
  book: ReadBook | Book;
}
// Shows a smaller cover image, author, title, and a character limited blurb.
const  SampleDetails: React.FC<Props> = ({book}) => {
  return (
    <View style={styles.data}>
      <View>
        <Text style={Fonts.subHeadingMed}>{book.volumeInfo.title}</Text>
        <Text style={Fonts.subHeadingSmall}>{book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors}</Text>
      </View>

      {isReadBook(book) && 
    <View>
      <Text style={Fonts.paragraph}>Last Read: {moment(book.endDate).format('Do MMM YYYY')}</Text>
      <UpdateReadDate book={book} size='small' />
      <RatingButton book={book} size='small'/>
    </View>}

      {isBook(book) && 
      <View>
        <Text numberOfLines={6} style={Fonts.paragraphSmall}>{book.volumeInfo.description}</Text>
        <StatusUpdateButton book={book}/>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    width: 260,
  }
});

export default SampleDetails;