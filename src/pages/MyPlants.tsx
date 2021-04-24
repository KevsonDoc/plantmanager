import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantProps, loadPlant } from '../libs/sotrage';

import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';
import Header from '../components/Header';
import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useEffect } from 'react';

const MyPlants: React.FC = () => {
  const [ myPlants, setMyPlants ] = useState<PlantProps[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ nextWatered, setNextWtaered ] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }  
      );

      setNextWtaered(`Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime} horas`)

      setMyPlants(plantStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  
  if(loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image
          style={styles.spotlightImage}
          source={waterdrop}
        />

        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantTitle}>
          Próxima regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },

  plants: {
    flex: 1,
    width: '100%',

  },

  plantTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;