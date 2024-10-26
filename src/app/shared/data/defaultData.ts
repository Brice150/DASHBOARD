import { Color } from '../../core/enums/color.enum';
import { TaskState } from '../../core/enums/task-state.enum';
import { TripState } from '../../core/enums/trip-state.enum';
import { City } from '../../core/interfaces/city';
import { Country } from '../../core/interfaces/country';
import {
  Finance,
  RealEstate,
  StockExchange,
} from '../../core/interfaces/finance';
import { MainTask } from '../../core/interfaces/task';

export const defaultCities: City[] = [
  {
    cityGeolocation: {
      city: 'Paris',
      latitude: '48.8567',
      longitude: '2.3522',
    },
    isHome: true,
  },
];

export const defaultFinances: Finance[] = [
  { title: 'Savings', totalAmount: 1000, color: Color.BLUE },
  { title: 'StockExchange', totalAmount: 1000, color: Color.PURPLE },
  { title: 'RealEstate', totalAmount: 1000, color: Color.RED },
];

export const defaultExpenses: Finance[] = [
  { title: 'Insurance', totalAmount: 50, color: Color.BLUE },
  { title: 'Rent', totalAmount: 500, color: Color.PURPLE },
  { title: 'Food', totalAmount: 150, color: Color.RED },
];

export const defaultStockExchange: StockExchange = {
  totalAmount: 1000,
  amountPerMonth: 100,
  percentage: 8,
  yearly: {
    date: Array.from({ length: 41 }, (_, i) => i.toString()),
    invested: [1000],
    interests: [0],
    total: [1000],
  },
};

export const defaultRealEstate: RealEstate = {
  results: {
    totalCost: 0,
    totalRents: 0,
    totalCharges: 0,
    grossYield: 0,
    netYield: 0,
    cashFlow: 0,
  },
  purchase: {
    price: 0,
    notaryFees: 0,
  },
  renovation: {
    price: 0,
    furnitureBudget: 0,
  },
  financing: {
    downPayment: 0,
    loanRate: 0,
    insuranceRate: 0,
    duration: 0,
    totalBorrowed: 0,
    monthlyPayments: 0,
  },
  annualExpenses: {
    propertyTax: 0,
    pnoInsurance: 0,
    coownershipCharges: 0,
    otherCharges: 0,
  },
  rent: {
    lotsNumber: 1,
    rentPerLot: 0,
  },
};

export const defaultTasks: MainTask[] = [
  {
    name: 'Homework',
    state: TaskState.IN_PROGRESS,
    startDate: new Date(),
    endDate: new Date(),
    tasks: [
      {
        name: 'Maths',
        state: TaskState.IN_PROGRESS,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: 'English',
        state: TaskState.DONE,
      },
      {
        name: 'French',
        state: TaskState.BLOCKED,
      },
    ],
  },
];

export const defaultCountries: Country[] = [
  {
    name: 'Germany',
    code: 'DE',
    trips: [
      { city: 'Berlin', state: TripState.TO_VISIT },
      { city: 'Munich', state: TripState.VISITED },
    ],
  },
  {
    name: 'Spain',
    code: 'ES',
    trips: [{ city: 'Madrid', state: TripState.VISITED }],
  },
];
