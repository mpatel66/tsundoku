import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Books from '../../types/Book';

interface Props {
  book: Books;
  imageSize: string;
}


const TouchableCover: React.FC<Props> = ({book, imageSize}) => {
  const size = imageSize==='small' ? {height:120, width:100} : {height:200, width:150};
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={() => navigation.navigate('MyModal', {
        book: book
      })}
    >
      <Image
        style={[styles.image, size]}
        source={
          {uri: book.volumeInfo.imageLinks.thumbnail}
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});

export default TouchableCover;