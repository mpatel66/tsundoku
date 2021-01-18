import { createContext } from 'react';
import Books from '../../types/Book';
import { Context } from '../../types/AppContext';


const AppContext = createContext<Context>({
  state: {
    addedBooks: [] as Books[]
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {}
});

export default AppContext;