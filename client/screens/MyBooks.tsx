import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native'
import { Tab, TabView } from '@ui-kitten/components';

import ReadingList from '../components/container/MyBooks/ReadingList';
import ReadList from '../components/container/MyBooks/ReadList';
import AddedList from '../components/container/MyBooks/AddedList';
import { StatusType } from '../types/Book';

export default function MyBooks() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

return (
  <SafeAreaView>
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={styles.tab}
      >
        <Tab title={StatusType.READING}>
          <ReadingList/>
        </Tab>
        <Tab title={StatusType.ADDED}>
          <AddedList/>
        </Tab>
        <Tab title={StatusType.READ}>
          <ReadList />
        </Tab>
    </TabView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  },
  tab: {
    top: 10,
  }
});

