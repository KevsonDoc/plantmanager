import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas de {'\n'}
        forma fácil
      </Text>

      <Image source={wateringImg} style={styles.image} />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}> { '>' } </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38
  },

  image: {
    width: 292,
    height: 284
  },

  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.heading,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 50,
    height: 56,
    width: 56,
  },

  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})