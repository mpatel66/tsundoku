import React, { createContext } from 'react'
import Book, { RatingType, StatusType } from '../../Book'

export interface AppContextInterface {
  modalVisible: boolean;
  selectedBook: Book;
  addedBooks: Book[];
}

export enum ActionType {
  OPEN_MODAL, 
  CLOSE_MODAL,
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_STATUS,
  UPDATE_RATING
}

export type Action =
| { type: ActionType.OPEN_MODAL; selectedBook: Book; }
| { type: ActionType.CLOSE_MODAL } 
| { type: ActionType.ADD_BOOK; addedBook: Book}
| { type: ActionType.REMOVE_BOOK; removeBook: Book}
| { type: ActionType.UPDATE_BOOK_STATUS; updatedBook: Book; status: StatusType }
| { type: ActionType.UPDATE_RATING; updatedBook: Book; rating: RatingType }

interface Context {
  state: AppContextInterface;
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<Context>({
  state: {
    modalVisible: false,
    selectedBook: {} as Book,
    addedBooks: [] as Book[]
  },
  dispatch: () => {}
})
    

export default AppContext;