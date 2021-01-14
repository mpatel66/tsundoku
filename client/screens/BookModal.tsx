import { Card, Layout, Modal, Text, Button, OverflowMenu, MenuItem, IndexPath, SelectItem, Select } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet,SafeAreaView, Image, ScrollView} from 'react-native';
import Book, { RatingType, StatusType } from '../Book';
import AddButton from '../components/buttons/AddButton';
import IconGenerator from '../components/buttons/IconGenerator';
import LikeButton from '../components/buttons/LikeButton';
import AppContext, { ActionType } from '../components/context/context';


const BookModal: React.FC = () => {
  const {state, dispatch} = useContext(AppContext)
  const { selectedBook, modalVisible} = state;
  const [statusVisible, setStatusVisible ] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedStatus, setSelectedStatus ] = useState({row: 0 } as IndexPath);
  const [selectedRating, setSelectedRating ] = useState({row: 0 } as IndexPath);

  const statusUpdateButton = () => {
    return (<Button 
    onPress={()=> setStatusVisible(true)} 
    size='small' 
    appearance='filled' 
    accessoryRight={(props) => {return(
      <IconGenerator props={props} iconName={'chevron-down-outline'} />)}}
    style={styles.button}>
    {selectedBook.status}
  </Button>)
  }

  const ratingButton = () => {
    return (<Button 
    onPress={()=> setRatingVisible(true)} 
    size='small' 
    appearance='outline' 
    accessoryRight={(props) => {return(
      <IconGenerator props={props} iconName={'chevron-down-outline'} />)}}
    style={styles.button}>
    {selectedBook.rating}
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
      dispatch({type: ActionType.UPDATE_BOOK_STATUS, updatedBook: selectedBook, status: StatusType.READING});
      selectedBook.status = StatusType.READING;
      setSelectedStatus(index);
    }
    else if (index.row === 3) {
      dispatch({type: ActionType.UPDATE_BOOK_STATUS, updatedBook: selectedBook, status: StatusType.READ});
      selectedBook.status = StatusType.READ;
      setSelectedStatus(index);
    }
    setStatusVisible(false);
  }
  function updateRating (index: IndexPath) {
    console.log(index)
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
        <Card>
            <Text category='h4'>{selectedBook.title}</Text>
            <Text category='s1'>{selectedBook.authors.length > 1 ? selectedBook.authors.join(', ') : selectedBook.authors}</Text>
            <Image
            style={styles.image}
            source={{uri: selectedBook.imageLinks.thumbnail}}
            />
        </Card>
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
              <MenuItem title={StatusType.READ} disabled={selectedBook.status === StatusType.NONE}/>
          </OverflowMenu>

          {/* CHANGE BOOK RATING BUTTON */}

          {selectedBook.status === StatusType.READ && 
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
         <ScrollView>
          <Card style={styles.blurbText}>
            <Text category='s1'>Pages</Text>
            <Text>{selectedBook.pageCount}</Text>
            <Text category='s1'>Genres</Text>
            <Text>{selectedBook.categories.join(', ')}</Text>
            <Text category='s1'>Description</Text>
            <Text>{selectedBook.description}</Text>
          </Card>
        </ScrollView>
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