import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {GestureResponderEvent} from 'react-native';

export interface CurrencyChartProps {
  data: {exchangedate: string; rate: string}[];
  rate: number;
  currency: string;
}

export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyPickerProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
  date: string;
  rate: number;
}

export interface CurrencyDateTimePickerProps {
  value: Date;
  mode: 'date' | 'time' | 'datetime';
  display: 'default' | 'spinner' | 'calendar' | 'clock';
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  maximumDate?: Date;
  visible: boolean;
  onRequestClose: (event: GestureResponderEvent) => void;
}

export interface CurrencyButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export interface HistoryData {
  rate: string;
  date: string;
}

export interface CurrencyData {
  rate: string;
  exchangedate: string;
}

export interface CurrencyHistoryProps {
  baseCurrency: string;
}

export interface CurrencyItem {
  cc: string;
  txt: string;
}
