import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CurrencyButtonProps} from '../models/types';
import { COLORS } from '../constants/colors';

export const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '49%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
