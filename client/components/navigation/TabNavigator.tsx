import React from 'react';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import { BottomNavigation,  BottomNavigationTab } from '@ui-kitten/components';
import Home from '../../screens/Home';
import MyBooks from '../../screens/MyBooks';
import Search from '../../screens/Search';
import IconGenerator from '../buttons/IconGenerator';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps<BottomTabBarOptions>) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={styles.tab}
    >
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'home'}/>}
      />
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'book'}/>}/>
      <BottomNavigationTab 
        icon={(props) => 
          <IconGenerator props={props} iconName={'search'}/>}/>
    </BottomNavigation>
  );
};

const TabNavigator: React.FC = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name='Home' component={Home}/>
    <Tab.Screen name='MyBooks' component={MyBooks}/>
    <Tab.Screen name='Search' component={Search}/>
  </Tab.Navigator>
);


const styles = StyleSheet.create({
  tab: {
    height: '10%',
  }
});

export default TabNavigator;