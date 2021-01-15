import Books from "./Book";
import { Action } from './ReducerAction';

export interface AppContextInterface {
  modalVisible: boolean;
  selectedBook: Books;
  addedBooks: Books[];
}

export interface Context {
  state: AppContextInterface;
  dispatch: React.Dispatch<Action>
}