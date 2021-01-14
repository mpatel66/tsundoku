import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Book, { StatusType } from './Book';
import BookModal from './screens/BookModal';
import AppContext, { Action, ActionType, AppContextInterface } from './components/context/context'
import TabNavigator from './components/navigation/TabNavigator';
import AddButton from './components/buttons/AddButton';

const queryClient = new QueryClient();


function reducer(state:AppContextInterface, action:Action) {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      const findBook = state.addedBooks.find(book => book.id === action.selectedBook.id);
      if (findBook) action.selectedBook = {...action.selectedBook, status: findBook.status, rating: findBook.rating}
      return {
        ...state,
        modalVisible: true,
        selectedBook: action.selectedBook
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
      };
    case ActionType.ADD_BOOK:
      action.addedBook.status = StatusType.ADDED;
      return {
        ...state,
        addedBooks: [...state.addedBooks, action.addedBook]
      }
    case ActionType.REMOVE_BOOK:
      return {
        ...state,
        addedBooks: state.addedBooks.filter(book => book.id !== action.removeBook.id)
      }
    case ActionType.UPDATE_BOOK_STATUS:
      const statusIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id)
      let statusBooks = [...state.addedBooks];
      statusBooks[statusIndex].status = action.status
      return {
        ...state, 
        addedBooks: [...statusBooks]
      }
    case ActionType.UPDATE_RATING: 
    const ratingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id)
    let ratingBooks = [...state.addedBooks];
      ratingBooks[ratingIndex].rating = action.rating
      return {
        ...state, 
        addedBooks: [...ratingBooks]
      }
    default:
      return state;
  }
}

const initialState = {
  modalVisible: false,
  selectedBook: {} as Book,
  addedBooks: [] as Book[]
}


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
  <QueryClientProvider client={queryClient}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <TabNavigator />
          {state.modalVisible && <BookModal />}
        </NavigationContainer>
      </AppContext.Provider>
    </ApplicationProvider>
  </QueryClientProvider>
  );
}
