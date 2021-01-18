import React from 'react';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import { BottomNavigation,  BottomNavigationTab } from '@ui-kitten/components';
import IconGenerator from '../buttons/IconGenerator';
import Home from '../../tab-screens/Home';
import MyBooks from '../../tab-screens/MyBooks';
import Search from '../../tab-screens/Search';

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

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='MyBooks' component={MyBooks}/>
      <Tab.Screen name='Search' component={Search}/>
    </Tab.Navigator>
  );};


const styles = StyleSheet.create({
  tab: {
    height: '10%',
  }
});

export default TabNavigator;