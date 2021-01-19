import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import StatusUpdateButton from '../components/buttons/StatusUpdateButton';
import Books, { isReadBook, isReadingBook,  } from '../types/Book';
import AuthorImage from '../components/cards/AuthorImage';
import RatingButton from '../components/buttons/RatingButton';
import BlurbCard from '../components/cards/BlurbCard';

interface Props {
  route: RouteProp<{ params: { book: Books} }, 'params'>;
}

const BookModal: React.FC<Props> = ({ route }) => {
  const { book } = route.params;
  return (
    <View style={styles.container}>
      <Image 
        style={[StyleSheet.absoluteFill, styles.image]} 
        defaultSource={require('../assets/trianglesBackground.png')}
        source={require('../assets/trianglesBackground.png')}/>
      <AuthorImage book={book} showBackground={false} />
      <View style={styles.buttons}>
        <StatusUpdateButton book={book} />
        { (isReadBook(book) || isReadingBook(book)) && 
          <RatingButton book={book} size='small'/> }
      </View>
      <BlurbCard book={book}/>
    </View>
  );

};

export default BookModal;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    resizeMode: 'repeat', 
    width: '100%', 
    opacity: 0.8,
  }
});