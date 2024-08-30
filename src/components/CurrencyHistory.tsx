import React, {useState, useEffect} from 'react';
import moment from 'moment-timezone';
import {AppDispatch, RootState} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCurrencyHistory} from '../store/slices/currencySlice';
import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {CurrencyDateTimePicker} from './CurrencyDateTimePicker';
import {CurrencyButton} from './CurrencyButton';
import {CurrencyHistoryProps, HistoryData} from '../models/types';
import {COLORS} from '../constants/colors';

export const CurrencyHistory: React.FC<CurrencyHistoryProps> = ({
  baseCurrency,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const historyData = useSelector(
    (state: RootState) => state.currency.historyData as HistoryData[],
  );

  const [startDate, setStartDate] = useState(
    moment().subtract(7, 'days').startOf('day').toDate(),
  );
  const [endDate, setEndDate] = useState(moment().startOf('day').toDate());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(moment(currentDate).startOf('day').toDate());

    if (currentDate > endDate) {
      setEndDate(moment(currentDate).startOf('day').toDate());
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;

    setShowEndDatePicker(false);

    if (currentDate >= startDate) {
      setEndDate(moment(currentDate).startOf('day').toDate());
    } else {
      Alert.alert('Помилка', 'Кінцева дата не може бути раніше початкової', [
        {text: 'OK'},
      ]);
    }
  };

  useEffect(() => {
    if (baseCurrency) {
      dispatch(
        fetchCurrencyHistory({
          base: baseCurrency,
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        }),
      );
    }
  }, [baseCurrency, startDate, endDate, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія курсу валют</Text>
      <View style={styles.datePickerContainer}>
        <CurrencyButton
          title={
            startDate
              ? moment(startDate).format('DD.MM.YYYY')
              : 'Оберіть початкову дату'
          }
          onPress={() => setShowStartDatePicker(true)}
        />
        {showStartDatePicker && (
          <CurrencyDateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            maximumDate={new Date()}
            visible={showStartDatePicker}
            onRequestClose={() => setShowStartDatePicker(false)}
          />
        )}
        <CurrencyButton
          title={
            endDate
              ? moment(endDate).format('DD.MM.YYYY')
              : 'Оберіть кінцеву дату'
          }
          onPress={() => setShowEndDatePicker(true)}
        />
        {showEndDatePicker && (
          <CurrencyDateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
            maximumDate={new Date()}
            visible={showEndDatePicker}
            onRequestClose={() => setShowEndDatePicker(false)}
          />
        )}
      </View>
      <FlatList
        data={historyData}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.date}</Text>
            <Text style={styles.itemText}>{item.rate}</Text>
          </View>
        )}
        keyExtractor={item => item.date}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  itemText: {
    color: COLORS.black,
  },
});
