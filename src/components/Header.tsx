import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Header: React.FC = () => {
  const [ userName, setUserName ] = useState<string>('');

  async function getNameInAsyncSorage() {
    const user = await AsyncStorage.getItem('@plantmanager:user');
    setUserName(user || '');
  }

  useEffect(() => {
    getNameInAsyncSorage();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image
        style={styles.image}
        source={{ uri: 'https://avatars.githubusercontent.com/u/55449539?v=4' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: StatusBar.currentHeight,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },

  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 870,
  },


});

export default Header;