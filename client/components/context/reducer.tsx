import { AppContextInterface } from '../../types/AppContext';
import { isBook, RatingType, StatusType } from '../../types/Book';
import { Action, ActionType } from '../../types/ReducerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

async function addToStore (state: AppContextInterface) {
  try {
    const jsonValue = JSON.stringify(state);
    // console.log(jsonValue);
    await AsyncStorage.setItem('appState', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export default function reducer (state:AppContextInterface, action:Action): AppContextInterface {
  switch (action.type) {
  case ActionType.LOAD_INITIAL_DATA: {
    return {
      ...action.state
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
    readingBooks[readingIndex] = {
      ...readingBooks[readingIndex], 
      status: StatusType.READING, 
      startDate: new Date().toString(),
      rating: RatingType.NONE
    };

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
    if (isBook(action.updatedBook)) {
      readBooks[readIndex] = {
        ...readBooks[readIndex], 
        status: StatusType.READ, 
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        rating: RatingType.NONE
      };
    } else {
      readBooks[readIndex] = {
        ...readBooks[readIndex], 
        status: StatusType.READ,
        startDate: (action.startDate ? action.startDate : new Date()).toString(),
        endDate: (action.endDate ? action.endDate : new Date()).toString()
      };
    }
    console.log(action.startDate?.toString());
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
