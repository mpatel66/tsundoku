import { Button, Icon } from '@ui-kitten/components'
import React from 'react'
import { ImageProps } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import IconGenerator from './IconGenerator';

const HeartIcon = (props: (Partial<ImageProps> | undefined)) => (
  <Icon {...props} name='heart'/>
);

const LikeButton = () => {
  return (
    <Button 
      onPress={()=> {console.log('liked')}} 
      size= 'small' appearance='outline' 
      style={styles.button}
      accessoryRight={(props) => {
      return(
      <IconGenerator props={props} iconName={'heart'} />)}}>
      RATE
    </Button>
  )
}

export default LikeButton;
const styles = StyleSheet.create({
  button: {
    margin: 2,
  }
})