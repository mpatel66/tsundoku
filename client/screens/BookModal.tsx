import { Layout, Modal,Button, OverflowMenu, MenuItem, IndexPath } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { View, StyleSheet,SafeAreaView } from 'react-native';
import { isReadBook, isReadingBook, RatingType, StatusType } from '../types/Book';
import IconGenerator from '../components/buttons/IconGenerator';
import AuthorImage from '../components/cards/AuthorImage';
import BlurbCard from '../components/cards/BlurbCard';
import AppContext from '../components/context/context';
import { ActionType } from '../types/ReducerAction';


const BookModal: React.FC = () => {
  const {state, dispatch} = useContext(AppContext)
  const { selectedBook, modalVisible} = state;
  const [statusVisible, setStatusVisible ] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedStatus, setSelectedStatus ] = useState({row: 0 } as IndexPath);
  const [selectedRating, setSelectedRating ] = useState({row: 0 } as IndexPath);

  const statusUpdateButton = () => {
    return (
    <Button 
      onPress={() => setStatusVisible(true)}
      size='small' 
      appearance='filled' 
      accessoryRight={(props) => {return(
        <IconGenerator props={props} iconName={'chevron-down-outline'} />)}}
      style={styles.button}>
      {selectedBook.status}
    </Button>
  )};
  

  const ratingButton = () => {
      return (<Button 
        onPress={() => setRatingVisible(true)} 
        size='small' 
        appearance='outline' 
        accessoryRight={(props) => {return(
          <IconGenerator props={props} iconName={'chevron-down-outline'} />)}}
        style={styles.button}>
        {(isReadingBook(selectedBook) || isReadBook(selectedBook))? selectedBook.rating : 'Add Book'}
      </Button>)
  }
  
  function updateStatus(index: IndexPath) {
    if (index.row === 0) {
      dispatch({type: ActionType.ADD_BOOK, addedBook: selectedBook});
      selectedBook.status = StatusType.ADDED;
      setStatusVisible(false);
      setSelectedStatus({row: 1} as IndexPath) ; 
    }
    else if (index.row === 1 ){
      dispatch({type: ActionType.REMOVE_BOOK, removeBook: selectedBook});
      selectedBook.status = StatusType.NONE;
      setSelectedStatus(index);
    }
    else if (index.row === 2) {
      dispatch({type: ActionType.UPDATE_BOOK_READING, updatedBook: selectedBook});
      selectedBook.status = StatusType.READING;
      setSelectedStatus(index);
    }
    else if (index.row === 3) {
      dispatch({type: ActionType.UPDATE_BOOK_READ, updatedBook: selectedBook});
      selectedBook.status = StatusType.READ;
      setSelectedStatus(index);
    }
    setStatusVisible(false);
  }

  function updateRating (index: IndexPath) {
    if (isReadingBook(selectedBook) || isReadBook(selectedBook)) {
      if( index.row === 0){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: selectedBook, rating: RatingType.LIKE})
        selectedBook.rating = RatingType.LIKE;
      }
      else if( index.row === 1){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: selectedBook, rating: RatingType.LOVE})
        selectedBook.rating = RatingType.LOVE;
      }
      else if( index.row === 2){
        dispatch({type: ActionType.UPDATE_RATING, updatedBook: selectedBook, rating: RatingType.HATE})
        selectedBook.rating = RatingType.HATE;
      }
    }
    setRatingVisible(false);
    setSelectedRating(index);
  }

  return (
    <SafeAreaView>
      <Modal     
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        style={styles.container}
      >
        
      <Layout style={styles.container} level='3'>
      <Button 
        onPress={()=> {
          dispatch({type: ActionType.CLOSE_MODAL})
        }}
        size='large'
        appearance='ghost' 
        accessoryRight={(props) => 
        <IconGenerator props={props} iconName={'close-outline'} />}
        style={styles.button}
        />
        {/* DISPLAY cover, author & title of book */}
        <AuthorImage book={selectedBook}/>
        <View style={styles.buttons}>
          {/* CHANGE BOOK STATUS BUTTON */}
          <OverflowMenu
            anchor={statusUpdateButton}
            visible={statusVisible}
            selectedIndex={selectedStatus}
            onSelect={updateStatus}
            onBackdropPress={() => setStatusVisible(false)}>
              <MenuItem title='Add' disabled={selectedBook.status !== StatusType.NONE}/>
              <MenuItem title='Remove' disabled={selectedBook.status === StatusType.NONE}/>
              <MenuItem title={'Currently ' + StatusType.READING} disabled={selectedBook.status === StatusType.NONE}/>
              <MenuItem title={StatusType.READ} 
              disabled={selectedBook.status === StatusType.NONE}
              />
          </OverflowMenu>

          {/* CHANGE BOOK RATING BUTTON */}

          { (selectedBook.status === StatusType.READING || selectedBook.status === StatusType.READ) && 
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
          </OverflowMenu>}
        </View>

        {/* DISPLAYS blurb text, pages and other data */}
        <BlurbCard book={selectedBook}/>
      </Layout>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: '90%'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
  },
  buttons: {
    flexDirection: 'row',
    padding: 10,
  },
  modal: {
    padding: 20,
  },
  blurbText: {
    paddingHorizontal: 10,
  },
  button: {
    margin:2,
  }
})

export default BookModal;