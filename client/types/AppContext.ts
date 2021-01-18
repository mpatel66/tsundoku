import Books from './Book';
import { Action } from './ReducerAction';

export interface AppContextInterface {
  addedBooks: Books[];
}

export interface Context {
  state: AppContextInterface;
  dispatch: React.Dispatch<Action>
}