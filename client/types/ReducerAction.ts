import { AppContextInterface } from './AppContext';
import Book, { RatingType, ReadBook, ReadingBook } from './Book';

export enum ActionType {
  LOAD_INITIAL_DATA,
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_READING,
  UPDATE_BOOK_READ,
  UPDATE_RATING
}

export type Action =
| { type: ActionType.LOAD_INITIAL_DATA; state: AppContextInterface; }
| { type: ActionType.ADD_BOOK; addedBook: Book}
| { type: ActionType.REMOVE_BOOK; removeBook: Book}
| { type: ActionType.UPDATE_BOOK_READING; updatedBook: Book; startDate?: Date; }
| { type: ActionType.UPDATE_BOOK_READ; updatedBook: (Book | ReadingBook); startDate?: Date, endDate?: Date; }
| { type: ActionType.UPDATE_RATING; updatedBook: (ReadingBook | ReadBook); rating: RatingType }