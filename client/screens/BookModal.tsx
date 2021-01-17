import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import StatusUpdateButton from '../components/buttons/StatusUpdateButton';
import Books, { isReadBook, isReadingBook,  } from '../types/Book';
import AuthorImage from '../components/cards/AuthorImage';
import RatingButton from '../components/buttons/RatingButton';
import BlurbCard from '../components/cards/BlurbCard';

interface Props {
  navigation: StackNavigationProp<ParamListBase>
  route: RouteProp<{ params: { book: Books} }, 'params'>;
}
const BookModal: React.FC<Props> = ({ navigation, route }) => {
  const { book }= route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
      <AuthorImage book={book}/>
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
  buttons: {
    flexDirection: 'row',
    padding: 10,
  },
});