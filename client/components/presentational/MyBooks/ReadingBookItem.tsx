import { CalendarRange, Card, RangeDatepicker, Text } from '@ui-kitten/components'
import React, { useContext, useState } from 'react'
import { ReadingBook  } from '../../../types/Book'
import { StyleSheet } from 'react-native';
import AuthorImage from '../../cards/AuthorImage';
import AppContext from '../../context/context';
import RatingButton from '../../buttons/RatingButton';
import { ActionType } from '../../../types/ReducerAction';

interface Props {
  book: ReadingBook;
}

const ReadingBookItem: React.FC<Props> = ({book}) => {
  const {dispatch } = useContext(AppContext)
  const [range, setRange] = useState({startDate: book.startDate} as CalendarRange<Date>)

  const days = range.startDate && Math.floor((Date.now() - range.startDate?.getTime())/(1000*60*60*24));

  function updateDates () {
    // If there's an end date, dispatch as Book Read, else update the start date.
    if (range.endDate) {
      dispatch({
        type: ActionType.UPDATE_BOOK_READ, 
        updatedBook: book, 
        startDate: range.startDate, 
        endDate: range.endDate
      })
    }
    else if (range.startDate) {
      dispatch({
        type: ActionType.UPDATE_BOOK_READING, 
        updatedBook: book, 
        startDate: range.startDate
      })
    }
  }

  return (
    <>
      <AuthorImage book={book} />
        <Text category='s1'>Set Completed Date</Text>
        <RangeDatepicker
          min={new Date(2000,0,1)}
          range={range}
          onSelect={nextRange => setRange(nextRange)}
          onBlur={() => updateDates()}
        />
        <Card>
          <Text>Days Since Started: {''+days}</Text>
          <RatingButton book={book}/>
        </Card>
    </>
  )
}

export default ReadingBookItem;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
  },
  container: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
});