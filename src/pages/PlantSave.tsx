import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import DataTimerPicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/sotrage';

import Button from '../components/Button';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Paramms {
  plant: PlantProps
}

const PlantSave: React.FC = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const { plant } = router.params as Paramms;
  const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
  const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS === 'ios');

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android') {
      setShowDatePicker((oldState) => !oldState);
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if(dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        nextScreen: 'MyPlant',
        ico: 'hug'
      });

    } catch (error) {
      Alert.alert('Ops! Houve um erro estamos trabalhando para resolve-lo 😪');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgUri
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              source={waterdrop}
              style={styles.tipImage}
            />

            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker && <DataTimerPicker
              value={selectedDateTime}
              mode="time"
              display="default"
              onChange={handleChangeTime}
              is24Hour
            />
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
              style={styles.dateTmerPickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={styles.dateTmerPickerText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button
            title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
    textAlign: 'center',
  },

  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },

  dateTmerPickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },

  dateTmerPickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

export default PlantSave;