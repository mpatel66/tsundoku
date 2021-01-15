import React from 'react'
import { View,StyleSheet, Dimensions} from 'react-native'
import { ReadBook } from '../../../types/Book'
import TouchableCover from '../../cards/TouchableCover';
import SampleDetails from '../../cards/SampleDetails';
import UpdateReadDate from '../../buttons/UpdateReadDate';

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