import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };

  handleRemove: () => void;
}

const PlantCardSecondary: React.FC<PlantProps> = ({ data, handleRemove, ...rest }) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.remove}
              onPress={handleRemove}
            >
              <Feather
                name="trash"
                size={32}
                color={colors.white}
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton
        style={styles.container}
        {...rest}
      >
        <SvgUri
          uri={data.photo}
          width={70}
          height={70}
        />

        <Text style={styles.title}>
          {data.name}
        </Text>
        <View style={styles.datails}>
          <Text style={styles.timeLabel}>
            Regar ás
          </Text>
          <Text style={styles.time}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },

  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },

  datails: {
    alignItems: 'center',
  },

  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },

  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },

  remove: {
    width: 100,
    height: 100,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    paddingLeft: 15,
  },
});

export default PlantCardSecondary;