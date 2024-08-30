import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {CurrencyPickerProps} from '../models/types';

export const CurrencyPicker: React.FC<CurrencyPickerProps> = ({
  selectedCurrency,
  onCurrencyChange,
  currencies,
  date,
  rate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCurrencySelect = (currency: string) => {
    onCurrencyChange(currency);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.currencyPicker}>
        <Text style={styles.label}>1 </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Text style={styles.buttonText}>{selectedCurrency}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>
          {' '}
          в UAH на {date} = {rate}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Оберіть валюту:</Text>
              <FlatList
                data={currencies}
                keyExtractor={item => item.code}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.currencyItem}
                    onPress={() => handleCurrencySelect(item.code)}>
                    <Text
                      style={
                        styles.currencyText
                      }>{`${item.name} (${item.code})`}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Закрити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.modal,
  },
  modalContainer: {
    marginVertical: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    width: '100%',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
