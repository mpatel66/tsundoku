import React from 'react'
import { View,StyleSheet, Dimensions} from 'react-native'
import { ReadBook } from '../../../types/Book'
import TouchableCover from '../../cards/TouchableCover';
import SampleDetails from '../../cards/SampleDetails';

interface Props {
  book: ReadBook;
}
const { width } = Dimensions.get('screen');
const ReadBookItem: React.FC<Props> = ({book}) => {
  return (
  <View style={styles.card}>
    <View style={styles.imageContainer}>
      <TouchableCover book={book} imageSize='small'/>
    </View>
    <SampleDetails book={book}/>
    {/* <View style={styles.data}>
      <View>
        <Text category='h6'>{book.title}</Text>
        <Text category='s1'>{book.authors.length > 1 ? book.authors.join(', ') : book.authors}</Text>
      </View>
      <View>
        <Text category='p1'>Last Read on {moment(book.endDate).format('do MMM YYYY')}</Text>
        <RatingButton book={book}/>
      </View>
    </View> */}

  </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
  },
  card: {
    margin: 10,
    flexDirection: 'row',
    width: width-40,
    justifyContent:'flex-start',
    paddingVertical: 10,
    
  },
  data: {
    width: 260,
  }
})

export default ReadBookItem;