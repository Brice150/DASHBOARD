import { Color } from '../enums/color.enum';

export interface Finance {
  title: string;
  totalAmount: number;
  color: Color;
}

export interface StockExchange {
  totalAmount: number;
  amountPerMonth: number;
  percentage: number;
  yearly: Yearly;
}

export interface Yearly {
  date: string[];
  invested: number[];
  interests: number[];
  total: number[];
}

export interface RealEstate {
  results: Results;
  purchase: Purchase;
  renovation: Renovation;
  financing: Financing;
  annualExpenses: AnnualExpenses;
  rent: Rent;
}

export interface Results {
  totalCost: number;
  totalRents: number;
  totalCharges: number;
  grossYield: number;
  netYield: number;
  cashFlow: number;
}

export interface Purchase {
  price: number;
  notaryFees: number;
}

export interface Renovation {
  price: number;
  furnitureBudget: number;
}

export interface Financing {
  downPayment: number;
  loanRate: number;
  insuranceRate: number;
  duration: number;
  totalBorrowed: number;
  monthlyPayments: number;
}

export interface AnnualExpenses {
  propertyTax: number;
  pnoInsurance: number;
  coownershipCharges: number;
  otherCharges: number;
}

export interface Rent {
  lotsNumber: number;
  rentPerLot: number;
}
