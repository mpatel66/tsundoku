import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Book } from './types/Book';
import BookModal from './screens/BookModal';
import AppContext from './components/context/context'
import TabNavigator from './components/navigation/TabNavigator';
import reducer from './components/context/reducer';

const queryClient = new QueryClient();

const initialState = {
  modalVisible: false,
  selectedBook: {} as Book,
  addedBooks: [] as Book[]
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
          {state.modalVisible && <BookModal />}
        </NavigationContainer>
      </AppContext.Provider>
    </ApplicationProvider>
  </QueryClientProvider>
  );
}
