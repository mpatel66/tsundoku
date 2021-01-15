import React from 'react'
import { View, StyleSheet  } from 'react-native'
import Book from '../../../types/Book'
import SampleDetails from '../../cards/SampleDetails'
import TouchableCover from '../../cards/TouchableCover'
import screen from '../../../screenDimension';

interface Props {
  book: Book;
}
const { width } = screen;
const AddedBookItem: React.FC<Props> = ({book}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <TouchableCover book={book} imageSize='small'/>
      </View>
      <SampleDetails book={book}/>
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


export default AddedBookItem;

