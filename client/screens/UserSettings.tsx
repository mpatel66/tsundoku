import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { ParamListBase } from '@react-navigation/native';
import { ScreenNavigationProp } from '../types/ScreenNavigatorType';

const UserSettings: React.FC<ScreenNavigationProp> = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text category='h1'>This is users settings screen</Text>
      <Button onPress={() => navigation.navigate('MyModal')}>
      Press here
      </Button>
    </SafeAreaView>
  )
}

export default UserSettings;