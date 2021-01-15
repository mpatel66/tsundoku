import { Button, IndexPath, MenuItem, OverflowMenu } from '@ui-kitten/components'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ReadingBook, ReadBook, RatingType } from '../../types/Book';
import { ActionType } from '../../types/ReducerAction';
import AppContext from '../context/context';
import IconGenerator from './IconGenerator'


interface Props {
  book: ReadingBook | ReadBook;
}

const RatingButton: React.FC<Props> = ({book}) => {
  const { dispatch } = useContext(AppContext)
  const [ratingVisible, setRatingVisible ] = useState(false);
  const [selectedRating, setSelectedRating ] = useState({row: 0 } as IndexPath);

  const ratingButton = () => {
    return (<Button 
      onPress={() => setRatingVisible(true)} 
      size='small' 
      appearance='outline' 
      accessoryRight={(props) => {return(
        <IconGenerator props={props} iconName={'chevron-down-outline'} />)}}
      style={styles.button}>
      {book.rating}
    </Button>)
  }

  function updateRating (index: IndexPath) {
      if( index.row === 0){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: book, rating: RatingType.LIKE})
        book.rating = RatingType.LIKE;
      }
      else if( index.row === 1){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: book, rating: RatingType.LOVE})
        book.rating = RatingType.LOVE;
      }
      else if( index.row === 2){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: book, rating: RatingType.HATE})
        book.rating = RatingType.HATE;
      }
    setRatingVisible(false);
    setSelectedRating(index);
  }



  return (
<OverflowMenu
  anchor={ratingButton}
  visible={ratingVisible}
  selectedIndex={selectedRating}
  onSelect={updateRating}
  onBackdropPress={() => setRatingVisible(false)}>
    <MenuItem title='Like' accessoryRight={(props) => {return(
    <IconGenerator props={props} iconName={'sun'} />)}}/>
    <MenuItem title='Love' accessoryRight={(props) => {return(
    <IconGenerator props={props} iconName={'moon'} />)}}/>
    <MenuItem title='Hate' accessoryRight={(props) => {return(
    <IconGenerator props={props} iconName={'umbrella'} />)}}/>
  </OverflowMenu>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: 120,
  }
})

export default RatingButton;