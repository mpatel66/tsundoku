import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Fonts from '../../styles/fonts';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({message}) => {
  return (
    <Layout style={[styles.container, styles.shadow]} level='3'>
      <Image style={ styles.image} source={require('../../assets/logo.png')}/>
      <Text style={Fonts.heading2}>{message}</Text>
    </Layout>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  message: {
    textAlign: 'center',
  },
  image: {
    resizeMode: 'center', 
    width: '100%',
  }
});
