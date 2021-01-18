import React, { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Books from './types/Book';
import AppContext from './components/context/context';
import TabNavigator from './components/navigation/TabNavigator';
import reducer from './components/context/reducer';
import { createStackNavigator } from '@react-navigation/stack';
import BookModal from './screens/BookModal';
import { RootStackParamList } from './types/ScreenNavigatorType';

const queryClient = new QueryClient({
});


const RootStack = createStackNavigator<RootStackParamList>();

const initialState = {
  addedBooks: [] as Books[]
};



const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppContext.Provider value={{state, dispatch}}>
          <NavigationContainer>
            <RootStack.Navigator mode="modal">
              <RootStack.Screen name="Tsundoku" component={TabNavigator} />
              <RootStack.Screen 
                name="MyModal" 
                component={BookModal} 
                options={({ route }) => ({ title: route.params.book.title })}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
