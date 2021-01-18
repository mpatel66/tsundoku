import { Layout } from '@ui-kitten/components';
import React from 'react';
import { ReadingBook  } from '../../../types/Book';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import AuthorImage from '../../cards/AuthorImage';
import RatingButton from '../../buttons/RatingButton';
import UpdateReadDate from '../../buttons/UpdateReadDate';
import screen from '../../../screenDimension';

interface Props {
  book: ReadingBook;
}

const {width} = screen;

const ReadingBookItem: React.FC<Props> = ({book}) => {
  return (
    <Layout style={styles.container} level='2'>
      <View style={styles.innerContainer}>
        <AuthorImage book={book} />
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
    width: width - 40,
    margin: 10,
    padding: 10,
  },
  innerContainer: {
    justifyContent: 'center',
  },
  text: {
    paddingLeft:5,
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