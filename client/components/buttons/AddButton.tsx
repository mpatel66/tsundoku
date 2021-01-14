import { Button, Icon } from '@ui-kitten/components'
import React from 'react'
import { ImageProps } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import IconGenerator from './IconGenerator';

const AddIcon = (props: (Partial<ImageProps> | undefined)) => (
  <Icon {...props} name='plus-square'/>
);

const AddButton = () => {
  return (
    <Button 
      onPress={()=> {console.log('liked')}} 
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