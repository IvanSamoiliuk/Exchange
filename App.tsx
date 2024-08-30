import React, {useEffect} from 'react';
import moment from 'moment';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  fetchCurrency,
  setSelectedBaseCurrency,
  fetchCurrencies,
} from './src/store/slices/currencySlice';
import {store, AppDispatch} from './src/store/store';
import {RootState} from './src/store/store';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {CurrencyPicker} from './src/components/CurrencyPicker';
import {CurrencyChart} from './src/components/CurrencyChart';
import {CurrencyHistory} from './src/components/CurrencyHistory';
import {COLORS} from './src/constants/colors';
import {CurrencyData} from './src/models/types';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedBaseCurrency = useSelector(
    (state: RootState) => state.currency.selectedBaseCurrency,
  );
  const currencyData: CurrencyData[] = useSelector(
    (state: RootState) => state.currency.data,
  );
  const currencies = useSelector(
    (state: RootState) => state.currency.currencies,
  );
  const date = moment().format('DD.MM.YYYY');
  const rate = currencyData.length > 0 ? parseFloat(currencyData[0].rate) : NaN;

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBaseCurrency) {
      dispatch(
        fetchCurrency({
          base: selectedBaseCurrency,
        }),
      );
    }
  }, [selectedBaseCurrency, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <CurrencyPicker
        selectedCurrency={selectedBaseCurrency}
        onCurrencyChange={currency =>
          dispatch(setSelectedBaseCurrency(currency))
        }
        currencies={currencies}
        date={date}
        rate={rate}
      />
      <CurrencyChart
        data={currencyData}
        rate={rate}
        currency={selectedBaseCurrency}
      />
      <CurrencyHistory baseCurrency={selectedBaseCurrency} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  historyContainer: {
    marginTop: 20,
    flex: 1,
  },
});

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
