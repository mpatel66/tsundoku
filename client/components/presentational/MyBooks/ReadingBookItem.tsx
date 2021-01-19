import { Layout } from '@ui-kitten/components';
import React from 'react';
import { ReadingBook  } from '../../../types/Book';
import { StyleSheet, View } from 'react-native';
import AuthorImage from '../../cards/AuthorImage';
import RatingButton from '../../buttons/RatingButton';
import UpdateReadDate from '../../buttons/UpdateReadDate';

interface Props {
  book: ReadingBook;
}


const ReadingBookItem: React.FC<Props> = ({book}) => {
  return (
    <Layout style={styles.container} level='2'>
      <View style={styles.innerContainer}>
        <AuthorImage book={book} showBackground={true}/>
        <View style={styles.actionContainer}>
          <View>
            <UpdateReadDate book={book} size='large'/>
          </View>
          <View style={styles.button}>
            <RatingButton book={book} size='medium'/>
          </View>
        </View>
      </View>
      
    </Layout>
  );
};

export default ReadingBookItem;

const styles = StyleSheet.create({
  container: {
    // width: width,
    // backgroundColor: 'black',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'center',
    width: '100%',
    height: '70%',
    opacity: 0.7,
  },

});