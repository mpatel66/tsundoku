import { Button } from '@ui-kitten/components'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import IconGenerator from './IconGenerator';
import AppContext, { ActionType, AppContextInterface } from '../context/context';
import Book from '../../Book';

interface Props {
  tempState: AppContextInterface;
}

const AddButton: React.FC = () => {
  return (
  <Button 
      onPress={()=> console.log('pressed')}
      size= 'small' 
      appearance='outline' 
      accessoryRight={(props) => {
        return(
        <IconGenerator props={props} iconName={'plus-square'} />)}}
      style={styles.button}>
      ADD
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
  }
})

export default AddButton;