import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Modal, Platform, StyleSheet, Button} from 'react-native';
import {COLORS} from '../constants/colors';
import {CurrencyDateTimePickerProps} from '../models/types';

export const CurrencyDateTimePicker: React.FC<CurrencyDateTimePickerProps> = ({
  value,
  mode,
  onChange,
  maximumDate,
  visible,
  onRequestClose,
}) => {
  if (Platform.OS === 'android') {
    return (
      <DateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={onChange}
        maximumDate={maximumDate}
      />
    );
  }

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.dateTimePickerContainer}>
            <DateTimePicker
              value={value}
              mode={mode}
              display="inline"
              onChange={onChange}
              maximumDate={maximumDate}
            />
          </View>
          <Button title="Закрити" onPress={onRequestClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.modal,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  dateTimePickerContainer: {
    width: '100%',
    maxWidth: 300,
  },
  dateTimePicker: {
    transform: [{scale: 0.9}],
  },
});
