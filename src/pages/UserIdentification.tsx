import React from 'react';
import { useState } from 'react';
import { SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const UserIdentification: React.FC = () => {
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isFilled, setiIsFilled ] = useState(false);
  const [ name, setName ] = useState<string>();
  const [ nameError, setNameError ] = useState(false);

  const navigation = useNavigation()


  function handleInputBlur() {
    setIsFocused(false);
    setNameError(false)
  }
  function handleInputFocus() {
    setIsFocused(true);
    setNameError(false)
  }

  function handleInputChange(value: string) {
    setIsFocused(!!value);
    setName(value);
    setiIsFilled(!!value);
    nameError === true ? setNameError(false) : null;
  }

  
  function handleSubmit() {
    name ? navigation.navigate('Confirmation') : setNameError(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={ styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😄' : '😀' }
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                  nameError === true && {  borderColor: colors.red } 
                ]}
                placeholder='Digite seu nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button
                  onPress={handleSubmit}
                  title="Confirmar"
                />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center'
  },

  emoji: {
    fontSize: 44,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  }
})

export default UserIdentification;