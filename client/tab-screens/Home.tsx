import { Layout, Tab, TabView } from '@ui-kitten/components';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FictionList from '../components/container/Home/FictionList';



const Home: React.FC = ()  => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tab}
      >
        <Tab title='Fiction'>
          <FictionList type='Fiction' />
        </Tab>

        <Tab title='Non-Fiction'>
          <Layout>
            <FictionList type='NonFiction' />
          </Layout>
        </Tab>
      </TabView>    
    </SafeAreaView>
  );

};

export default Home;

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