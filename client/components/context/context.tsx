import React, { createContext } from 'react'
import Books from '../../types/Book';
import { Context } from '../../types/AppContext'


const AppContext = createContext<Context>({
  state: {
    modalVisible: false,
    selectedBook: {} as Books,
    addedBooks: [] as Books[]
  },
  dispatch: () => {}
})

export default AppContext;