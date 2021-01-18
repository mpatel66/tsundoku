import { AppContextInterface } from '../../types/AppContext';
import { isBook, RatingType, StatusType } from '../../types/Book';
import { Action, ActionType } from '../../types/ReducerAction';

// eslint-disable-next-line @typescript-eslint/no-unused-vars


export default function reducer (state:AppContextInterface, action:Action): AppContextInterface {
  switch (action.type) {
  case ActionType.ADD_BOOK: {
    action.addedBook.status = StatusType.ADDED;
    return {
      ...state,
      addedBooks: [...state.addedBooks, action.addedBook]
    };
  }
  case ActionType.REMOVE_BOOK:
    return {
      ...state,
      addedBooks: state.addedBooks.filter(book => book.id !== action.removeBook.id)
    };

  case ActionType.UPDATE_BOOK_READING: {
    const readingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const readingBooks = [...state.addedBooks];
    readingBooks[readingIndex] = {
      ...readingBooks[readingIndex], 
      status: StatusType.READING, 
      startDate: new Date(),
      rating: RatingType.NONE
    };
    return {
      ...state, 
      // selectedBook: readingBooks[readingIndex],
      addedBooks: [...readingBooks]
    };
  }
  case ActionType.UPDATE_BOOK_READ: {
    const readIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const readBooks = [...state.addedBooks];
    if (isBook(action.updatedBook)) {
      readBooks[readIndex] = {
        ...readBooks[readIndex], 
        status: StatusType.READ, 
        startDate: new Date(),
        endDate: new Date(),
        rating: RatingType.NONE
      };
    } else {
      readBooks[readIndex] = {
        ...readBooks[readIndex], 
        status: StatusType.READ,
        startDate: action.startDate ? action.startDate : new Date(),
        endDate: action.endDate ? action.endDate : new Date()
      };
    }
    return {
      ...state, 
      // selectedBook: readBooks[readIndex],
      addedBooks: [...readBooks]
    };
  }
  case ActionType.UPDATE_RATING: {
    const ratingIndex = state.addedBooks.findIndex(book => book.id === action.updatedBook.id);
    const ratingBooks = [...state.addedBooks];
    ratingBooks[ratingIndex] = {
      ...ratingBooks[ratingIndex],
      rating: action.rating
    };
    return {
      ...state,
      addedBooks: [...ratingBooks]
    };
  }
  default:
    return state;
  }
  // if we get down here we're in serious trouble as I've covered all the action types.
  // return assertUnreachable(state,action);
}


// case ActionType.OPEN_MODAL: {
//   const findBook: Books|undefined = state.addedBooks.find(book => book.id === action.selectedBook.id);
//   if (findBook) {
//     if (isReadBook(findBook)) {
//       const selectedBook: ReadBook = {...action.selectedBook, status: findBook.status, rating: findBook.rating, startDate: findBook.startDate, endDate: findBook.endDate};
//       return {
//         ...state,
//         modalVisible: true,
//         selectedBook: selectedBook
//       };
//     }
//     else if (isReadingBook(findBook)) {
//       const selectedBook: ReadingBook = {...action.selectedBook, status: findBook.status, rating: findBook.rating, startDate: findBook.startDate};
//       return {
//         ...state,
//         modalVisible: true,
//         selectedBook: selectedBook
//       };
//     }
//     else if (isBook(findBook)) {
//       const selectedBook: Book = {...action.selectedBook, status: findBook.status};
//       return {
//         ...state,
//         modalVisible: true,
//         selectedBook: selectedBook
//       };
//     }
//   } 
//   else {
//     return {
//       ...state,
//       modalVisible: true,
//       selectedBook: action.selectedBook
//     };
//   }
//   break;
// }