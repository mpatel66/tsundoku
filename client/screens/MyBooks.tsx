import React, { useContext } from 'react'
import { FlatList, SafeAreaView, View, StyleSheet} from 'react-native'
import { Text, Tab, TabView,Layout } from '@ui-kitten/components';
import AppContext from '../components/context/context';
import { StatusType } from '../Book';

export default function MyBooks() {
  const {state} = useContext(AppContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
    

return (
  <SafeAreaView>
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
      style={styles.tab}
      >
      <Tab title={StatusType.READING}>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>{StatusType.READING}</Text>
        </Layout>
      </Tab>
      <Tab title={StatusType.ADDED}>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>{StatusType.ADDED}</Text>
        </Layout>
      </Tab>
      <Tab title={StatusType.READ}>
        <Layout style={styles.tabContainer}>
          <Text category='h5'>{StatusType.READ}</Text>
        </Layout>
      </Tab>
    </TabView>
  </SafeAreaView>
    )
    
    // <SafeAreaView>
    //   <Text category='h1'>This is the my books screen</Text>
    //   <FlatList
    //     data={state.addedBooks}
    //     keyExtractor={item => item.id}
    //     renderItem={ ({item}) => {
    //       return (
    //       <View>
    //         <Text>{item.title}</Text>
    //         <Text>{item.status}</Text>
    //         <Text>{item.rating}</Text>
    //       </View>)
    //     }
    //     }
    //   />
    // </SafeAreaView>
  
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

