import { Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import IconGenerator from './IconGenerator';


const LikeButton: React.FC = () => {
  return (
    <Button 
      onPress={()=> {console.log('liked');}} 
      size= 'small' appearance='outline' 
      style={styles.button}
      accessoryRight={(props) => {
        return (
          <IconGenerator props={props} iconName={'heart'} />);}}>
      RATE
    </Button>
  );
};

export default LikeButton;
const styles = StyleSheet.create({
  button: {
    margin: 2,
  }
});