import {CurrencyItem} from '../models/types';
import {CurrencyData} from '../models/types';

const BASE_URL = 'https://bank.gov.ua/NBU_Exchange/exchange_site';

export const fetchCurrencyList = async () => {
  const response = await fetch(`${BASE_URL}?json`);
  const data: CurrencyItem[] = await response.json();

  const currencies = data.map(item => ({
    code: item.cc,
    name: item.txt,
  }));
  return currencies;
};

export const fetchCurrencyData = async (base: string) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  };

  const response = await fetch(
    `${BASE_URL}?start=${formatDate(startDate)}&end=${formatDate(
      endDate,
    )}&valcode=${base}&sort=exchangedate&order=desc&json`,
  );
  const data: CurrencyData[] = await response.json();

  return data.map(item => ({
    exchangedate: item.exchangedate,
    rate: item.rate,
  }));
};

export const fetchCurrencyHistoryData = async (
  base: string,
  startDate: string,
  endDate: string,
) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  };

  const response = await fetch(
    `${BASE_URL}?start=${formatDate(startDate)}&end=${formatDate(
      endDate,
    )}&valcode=${base}&sort=exchangedate&order=desc&json`,
  );
  const data: CurrencyData[] = await response.json();

  return data.map(item => ({
    date: item.exchangedate,
    rate: item.rate,
  }));
};
