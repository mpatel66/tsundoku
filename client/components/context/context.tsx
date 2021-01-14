import React, { createContext } from 'react'
import Book from '../../Book'

export interface AppContextInterface {
  modalVisible: boolean;
  selectedBook: Book;
}

// const AppContext = createContext<AppContextInterface>({
//   modalVisible: false,
//   selectedBook: {} as Book,
//   dispatch: 
// })
const AppContext = createContext({
});

export default AppContext;