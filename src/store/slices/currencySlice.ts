import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchCurrencyData,
  fetchCurrencyHistoryData,
  fetchCurrencyList,
} from '../../api/currencyApi';
import {CurrencyData, HistoryData} from '../../models/types';

interface CurrencyState {
  selectedBaseCurrency: string;
  data: CurrencyData[];
  historyData: HistoryData[];
  currencies: {code: string; name: string}[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CurrencyState = {
  selectedBaseCurrency: 'USD',
  data: [],
  historyData: [],
  currencies: [],
  status: 'idle',
  error: null,
};

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async ({base}: {base: string}) => {
    const response = await fetchCurrencyData(base);
    return response;
  },
);

export const fetchCurrencyHistory = createAsyncThunk(
  'currency/fetchCurrencyHistory',
  async ({
    base,
    startDate,
    endDate,
  }: {
    base: string;
    startDate: string;
    endDate: string;
  }) => {
    const response = await fetchCurrencyHistoryData(base, startDate, endDate);
    return response;
  },
);

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await fetchCurrencyList();
    return response;
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedBaseCurrency: (state, action: PayloadAction<string>) => {
      state.selectedBaseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchCurrency.fulfilled,
        (state, action: PayloadAction<CurrencyData[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        },
      )
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(fetchCurrencyHistory.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchCurrencyHistory.fulfilled,
        (state, action: PayloadAction<HistoryData[]>) => {
          state.status = 'succeeded';
          state.historyData = action.payload;
        },
      )
      .addCase(fetchCurrencyHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(fetchCurrencies.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchCurrencies.fulfilled,
        (state, action: PayloadAction<{code: string; name: string}[]>) => {
          state.status = 'succeeded';
          state.currencies = action.payload;
        },
      )
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const {setSelectedBaseCurrency} = currencySlice.actions;

export default currencySlice.reducer;
