import React from 'react';
import { StatusBar } from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Kevson</Text>
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