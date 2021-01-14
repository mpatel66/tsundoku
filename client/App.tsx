import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Book from './Book';
import BookModal from './screens/BookModal';
import AppContext, { AppContextInterface } from './components/context/context'
import TabNavigator from './components/navigation/TabNavigator';

const queryClient = new QueryClient();

enum ActionType {
  OPEN = 'OPEN_MODAL',
  CLOSE = 'CLOSE_MODAL'
}

type Action =
| { type: ActionType.OPEN; modalVisible: boolean; selectedBook: Book; }
| { type: ActionType.CLOSE }

function reducer(state:AppContextInterface, action:Action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalVisible: true,
        selectedBook: action.selectedBook
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalVisible: false,
      };
    default:
      return state;
  }
}

const initialState = {
  modalVisible: false,
  selectedBook: {} as Book,
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
  <QueryClientProvider client={queryClient}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <TabNavigator />
          {state.modalVisible && <BookModal modalVisible={state.modalVisible} book={state.selectedBook} />}
        </NavigationContainer>
      </AppContext.Provider>
    </ApplicationProvider>
  </QueryClientProvider>
    
  );
}
