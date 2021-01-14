import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const AddedList = () => {
  return (
    <Layout style={styles.container}>
    <Text category='h5'>
      Added List
    </Text>
    </Layout>
  )
}

export default AddedList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:10,
  }
});