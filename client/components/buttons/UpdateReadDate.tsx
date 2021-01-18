import { CalendarRange, RangeDatepicker } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { isReadBook, ReadBook, ReadingBook } from '../../types/Book';
import { ActionType } from '../../types/ReducerAction';
import AppContext from '../context/context';
import { StyleSheet } from 'react-native';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;

interface Props {
  book: ReadingBook | ReadBook;
  size: string;
}

const UpdateReadDate: React.FC<Props> = ({book, size}) => {
  const {dispatch } = useContext(AppContext);
  const minDate = new Date(2000,0,1);
  const [range, setRange] = useState({
    startDate: moment(book.startDate).toDate(),
    endDate: isReadBook(book) ? moment(book.endDate).toDate() : null
  } as CalendarRange<Date>);


  function updateDates () {
    // If there's an end date, dispatch as Book Read, else update the start date.
    if (range.endDate && range.startDate) {
      dispatch({
        type: ActionType.UPDATE_BOOK_READ, 
        updatedBook: book, 
        startDate: moment(range.startDate), 
        endDate: moment(range.endDate), 
      });

    }
    else if (range.startDate) {
      dispatch({
        type: ActionType.UPDATE_BOOK_READING, 
        updatedBook: book, 
        startDate: moment(range.startDate), 
      });
      book.startDate = moment(range.startDate);
    }
  }
  
  return (
    <RangeDatepicker
      style={styles.date}
      min={minDate}
      range={range}
      size={size}
      onSelect={nextRange => setRange(nextRange)}
      onBlur={() => updateDates()}
    />
  );
};

const styles = StyleSheet.create({
  date: {
    padding: 5,
    width: 200,
  }
});

export default UpdateReadDate;