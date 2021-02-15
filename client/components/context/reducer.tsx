import { AppContextInterface } from '../../types/AppContext';
import Books, { isBook, RatingType, StatusType } from '../../types/Book';
import { Action, ActionType } from '../../types/ReducerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

async function addToStore (state: AppContextInterface) {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem('appState', jsonValue);
  } catch (e) {
    console.log(e);
  }
}
// deleteStore --> for development/testing.
async function deleteStore () {
  try {
    await AsyncStorage.removeItem('appState');
  } catch (e) {
    console.log(e);
  }
  console.log('Done.');
}


export default function reducer (state:AppContextInterface, action:Action): AppContextInterface {
  switch (action.type) {
  case ActionType.LOAD_INITIAL_DATA: {
    return {
      ...action.state
    };
  }

  case ActionType.DELETE_DATA: {
    deleteStore();
    return {
      addedBooks: [] as Books[]
    };
  }

  case ActionType.ADD_BOOK: {
    action.addedBook.status = StatusType.ADDED;
    const updatedState = {
      ...state, 
      addedBooks: [...state.addedBooks, action.addedBook]
    };
    addToStore(updatedState);
    return updatedState;
  }
  case ActionType.REMOVE_BOOK: {
    const updatedState = {
      ...state, 
      addedBooks: state.addedBooks.filter(book => book.id !== action.removeBook.id)
    };
    addToStore(updatedState);
    return updatedState;
  }
  case ActionType.UPDATE_BOOK_READING: {
    const readingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const readingBooks = [...state.addedBooks];
    if (readingIndex > -1) {
      readingBooks[readingIndex] = {
        ...readingBooks[readingIndex], 
        status: StatusType.READING, 
        startDate: moment(),
        rating: RatingType.NONE
      };
    } else {
      readingBooks.push({
        ...action.updatedBook,
        status: StatusType.READING, 
        startDate: moment(),
        rating: RatingType.NONE
      });
    }
    const updatedState = {
      ...state, 
      addedBooks: [...readingBooks]
    };
    addToStore(updatedState);
    return updatedState;
  }
  case ActionType.UPDATE_BOOK_READ: {
    const readIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const readBooks = [...state.addedBooks];
    if (readIndex > -1) {
      // ie. going from Add Status -> Read
      if (isBook(action.updatedBook)) {
        readBooks[readIndex] = {
          ...readBooks[readIndex], 
          status: StatusType.READ, 
          startDate: moment(),
          endDate: moment(),
          rating: RatingType.NONE
        };
      } else {
        readBooks[readIndex] = {
          ...readBooks[readIndex], 
          status: StatusType.READ,
          startDate: action.startDate ? action.startDate : moment(),
          endDate: action.endDate ? action.endDate : moment()
        };
      }
    } else {
      readBooks.push({
        ...action.updatedBook,
        status: StatusType.READ, 
        startDate: moment(),
        endDate: moment(),
        rating: RatingType.NONE
      });
    }
    const updatedState = {
      ...state, 
      addedBooks: [...readBooks]
    };

    addToStore(updatedState);
    return updatedState;
  }
  case ActionType.UPDATE_RATING: {
    const ratingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const ratingBooks = [...state.addedBooks];
    ratingBooks[ratingIndex] = {
      ...ratingBooks[ratingIndex],
      rating: action.rating
    };
    const updatedState = {
      ...state,
      addedBooks: [...ratingBooks]
    };
    addToStore(updatedState);
    return updatedState;
  }
  default:
    return state;
  }
}
