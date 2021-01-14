import { Card, Layout, Modal, Text, Button } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { View, StyleSheet,SafeAreaView, Image, ScrollView} from 'react-native';
import Book from '../Book';
import AddButton from '../components/buttons/AddButton';
import IconGenerator from '../components/buttons/IconGenerator';
import LikeButton from '../components/buttons/LikeButton';
import AppContext from '../components/context/context';

interface Props {
  modalVisible: boolean;
  book: Book;
}

const BookModal: React.FC<Props> = ({modalVisible, book}) => {
  const {dispatch} = useContext(AppContext)
  return (
    <SafeAreaView>
      <Modal     
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        style={styles.container}
      >
      <Layout style={styles.container} level='3'>
      <Button 
        onPress={()=> dispatch({type:'CLOSE_MODAL'})}
        size='large'
        appearance='ghost' 
        accessoryRight={(props) => 
        <IconGenerator props={props} iconName={'close-outline'} />}
        style={styles.button}
        />
        <Card>
            <Text category='h4'>{book.title}</Text>
            <Text category='s1'>{book.authors.length > 1 ? book.authors.join(', ') : book.authors}</Text>
            <Image
            style={styles.image}
            source={{uri: book.imageLinks.thumbnail}}
            />
        </Card>
        <View style={styles.buttons}>
          <LikeButton />
          <AddButton/>
        </View>
        <ScrollView>
          <Card style={styles.blurbText}>
            <Text category='s1'>Pages</Text>
            <Text>{book.pageCount}</Text>
            <Text category='s1'>Genres</Text>
            <Text>{book.categories.join(', ')}</Text>
            <Text category='s1'>Description</Text>
            <Text>{book.description}</Text>
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