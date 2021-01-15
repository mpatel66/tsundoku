import React from 'react'
import { Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import RatingButton from '../buttons/RatingButton'
import moment from 'moment'
import StatusUpdateButton from '../buttons/StatusUpdateButton'
import Book, { ReadBook, isReadBook, isBook } from '../../types/Book'

interface Props {
  book: ReadBook | Book;
}
const  SampleDetails: React.FC<Props> = ({book}) => {
  return (
    <View style={styles.data}>
    <View>
      <Text category='h6'>{book.title}</Text>
      <Text category='s1'>{book.authors.length > 1 ? book.authors.join(', ') : book.authors}</Text>
    </View>

    {isReadBook(book) && 
    <View>
      <Text category='p1'>Last Read on {moment(book.endDate).format('do MMM YYYY')}</Text>
      <RatingButton book={book}/>
    </View>}
    {isBook(book) && 
      <View>
        <Text numberOfLines={5} category='p1'>{book.description}</Text>
        <StatusUpdateButton book={book}/>
      </View>
    }
  </View>
  )
}

const styles = StyleSheet.create({
  data: {
    width: 260,
  }
})

export default SampleDetails;