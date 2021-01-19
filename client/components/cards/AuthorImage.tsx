import { Card } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Book from '../../types/Book';
import TouchableCover from './TouchableCover';
import Fonts from '../../styles/fonts';

interface Props {
  book: Book;
  showBackground: boolean;
}

// Displays author, title and cover image.
const AuthorImage: React.FC<Props> = ( {book, showBackground}) => {
  return (
    <View style={styles.shadow}>
      <Card style={styles.card} appearance='filled' >
        <View style={styles.author}>
          <Text style={Fonts.heading1}> {book.volumeInfo.title}</Text>
          <Text style={[Fonts.heading2,{paddingTop:10,}]}>
            {book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          {showBackground && 
          <Image 
            style={[StyleSheet.absoluteFill, styles.image]} 
            defaultSource={require('../../assets/backgroundSquare.png')}
            source={require('../../assets/backgroundSquare.png')}/>}
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
    width: '100%',
  },
  card: {
    margin: 10,
    width: 330,
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
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover', 
    width: '100%', 
    height: 200, 
    opacity: 0.7,
    backgroundColor: 'red',
  }
});