import React, { createContext } from 'react'
import Books, { Book, RatingType, ReadBook, ReadingBook, StatusType } from '../../Book'

export interface AppContextInterface {
  modalVisible: boolean;
  selectedBook: Books;
  addedBooks: Books[];
}

export enum ActionType {
  OPEN_MODAL, 
  CLOSE_MODAL,
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_READING,
  UPDATE_BOOK_READ,
  UPDATE_RATING
}

export type Action =
| { type: ActionType.OPEN_MODAL; selectedBook: Book; }
| { type: ActionType.CLOSE_MODAL } 
| { type: ActionType.ADD_BOOK; addedBook: Book}
| { type: ActionType.REMOVE_BOOK; removeBook: Book}
| { type: ActionType.UPDATE_BOOK_READING; updatedBook: Book; startDate?: Date; }
| { type: ActionType.UPDATE_BOOK_READ; updatedBook: (Book | ReadingBook); startDate?: Date, endDate?: Date; }
| { type: ActionType.UPDATE_RATING; updatedBook: (ReadingBook | ReadBook); rating: RatingType }

interface Context {
  state: AppContextInterface;
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<Context>({
  state: {
    modalVisible: false,
    selectedBook: {} as Books,
    addedBooks: [] as Books[]
  },
  dispatch: () => {}
})
    

export default AppContext;