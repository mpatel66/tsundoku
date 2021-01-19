import { Button, IndexPath, MenuItem, OverflowMenu } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import Books, { StatusType } from '../../types/Book';
import { ActionType } from '../../types/ReducerAction';
import AppContext from '../context/context';
import IconGenerator from './IconGenerator';


interface Props {
  book: Books;
}

const StatusUpdateButton: React.FC<Props> = ({book}) => {
  const { dispatch } = useContext(AppContext);
  const [statusVisible, setStatusVisible ] = useState(false);
  const [selectedStatus, setSelectedStatus ] = useState({row: 0 } as IndexPath);
  // console.log('here', state);
  const statusUpdateButton = () => {
    return (
      <Button 
        onPress={() => setStatusVisible(true)}
        size='small' 
        appearance='filled' 
        accessoryRight={(props) => {return (
          <IconGenerator props={props} iconName={'chevron-down-outline'} />);}}
        style={styles.button}>
        {book.status}
      </Button>
    );};

  function updateStatus (index: IndexPath) {
    if (index.row === 0) {
      dispatch({type: ActionType.ADD_BOOK, addedBook: book});
      book.status = StatusType.ADDED;
      setStatusVisible(false);
      setSelectedStatus({row: 1} as IndexPath) ; 
    }
    else if (index.row === 1 ) {
      dispatch({type: ActionType.REMOVE_BOOK, removeBook: book});
      book.status = StatusType.NONE;
      setSelectedStatus(index);
    }
    else if (index.row === 2) {
      dispatch({type: ActionType.UPDATE_BOOK_READING, updatedBook: book});
      book.status = StatusType.READING;
      setSelectedStatus(index);
    }
    else if (index.row === 3) {
      dispatch({type: ActionType.UPDATE_BOOK_READ, updatedBook: book});
      book.status = StatusType.READ;
      setSelectedStatus(index);
    }
    setStatusVisible(false);
  }
  return (
    <OverflowMenu
      anchor={statusUpdateButton}
      visible={statusVisible}
      selectedIndex={selectedStatus}
      onSelect={updateStatus}
      onBackdropPress={() => setStatusVisible(false)}>
      <MenuItem title='Add' disabled={book.status !== StatusType.NONE}/>
      <MenuItem title='Remove' disabled={book.status === StatusType.NONE}/>
      <MenuItem title={'Currently ' + StatusType.READING} disabled={false}/>
      <MenuItem title={StatusType.READ} disabled={false}/> 
    </OverflowMenu>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: 120,
  }
});

export default StatusUpdateButton;