import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Book from '../../types/Book';
import TouchableCover from './TouchableCover';
import screen from '../../screenDimension';

interface Props {
  book: Book;
}


const {height} =screen;

const AuthorImage: React.FC<Props> = ( {book}) => {
  return (
    <View style={styles.shadow}>
      <Card style={styles.card} appearance='filled' >
        <View style={styles.author}>
          <Text category='h4'>{book.volumeInfo.title}</Text>
          <Text category='h6' style={{paddingTop:10,}}>
            {book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={[StyleSheet.absoluteFill, styles.image]} source={require('../../assets/arrowBackground.png')}/>
          <TouchableCover book={book} imageSize='normal'/>
        </View>
      </Card>
    </View>
    
  );
};
export default AuthorImage;
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
    
  },
  card: {
    margin: 10,
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
  author: {
    padding: 10,
    height: height/8,
    alignItems: 'center',
    
  },
  image: {
    resizeMode: 'cover', 
    width: '100%', 
    height: 200, 
    opacity: 0.5,
  }
});