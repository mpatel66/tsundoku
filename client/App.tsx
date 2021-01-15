import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Books, { Book, isBook, isReadBook, isReadingBook, RatingType, ReadBook, ReadingBook, StatusType } from './types/Book';
import BookModal from './screens/BookModal';
import AppContext from './components/context/context'
import TabNavigator from './components/navigation/TabNavigator';
import { AppContextInterface } from './types/AppContext';
import { ActionType, Action } from './types/ReducerAction';

const queryClient = new QueryClient();


function reducer(state:AppContextInterface, action:Action) {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      const findBook: Books|undefined = state.addedBooks.find(book => book.id === action.selectedBook.id);
      if (findBook) {
        if(isReadBook(findBook)) {
          const selectedBook: ReadBook = {...action.selectedBook, status: findBook.status, rating: findBook.rating, startDate: findBook.startDate, endDate: findBook.endDate}
          return {
            ...state,
            modalVisible: true,
            selectedBook: selectedBook
          };
        }
        else if(isReadingBook(findBook)) {
          const selectedBook: ReadingBook = {...action.selectedBook, status: findBook.status, rating: findBook.rating, startDate: findBook.startDate}
          return {
            ...state,
            modalVisible: true,
            selectedBook: selectedBook
          };
        }
        else if (isBook(findBook)) {
          const selectedBook: Book = {...action.selectedBook, status: findBook.status}
          return {
            ...state,
            modalVisible: true,
            selectedBook: selectedBook
          };
        }
      } 
      else {
        return {
          ...state,
          modalVisible: true,
          selectedBook: action.selectedBook
        }
      }
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

    case ActionType.UPDATE_BOOK_READING:
      const readingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id)
      let readingBooks = [...state.addedBooks];
      readingBooks[readingIndex] = {
        ...readingBooks[readingIndex], 
        status: StatusType.READING, 
        startDate: new Date(),
        rating: RatingType.NONE
      }
      return {
        ...state, 
        selectedBook: readingBooks[readingIndex],
        addedBooks: [...readingBooks]
      }

    case ActionType.UPDATE_BOOK_READ:
      const readIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id)
      let readBooks = [...state.addedBooks];
      if(isBook(action.updatedBook)) {
        readBooks[readIndex] = {
          ...readBooks[readIndex], 
          status: StatusType.READ, 
          startDate: new Date(),
          endDate: new Date(),
          rating: RatingType.NONE
        }
      } else {
        readBooks[readIndex] = {
          ...readBooks[readIndex], 
          status: StatusType.READ,
          startDate: action.startDate ? action.startDate : new Date(),
          endDate: action.endDate ? action.endDate : new Date()
        }
      }
      return {
        ...state, 
        selectedBook: readBooks[readIndex],
        addedBooks: [...readBooks]
      }

    case ActionType.UPDATE_RATING: 
    const ratingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id)
    let ratingBooks = [...state.addedBooks];
    ratingBooks[ratingIndex] = {
      ...ratingBooks[ratingIndex],
      rating: action.rating
    }
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
