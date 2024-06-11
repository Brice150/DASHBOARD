export interface FinanceInfos {
  spendingsInfos: Spendings;
  savingsInfos: Savings;
  stockExchangeInfos: StockExchange;
  realEstateInfos: RealEstate;
}

export interface Spendings {
  totalAmount: number;
  spendings: MoneyInput[];
}

export interface Savings {
  totalAmount: number;
  savings: MoneyInput[];
}

export interface StockExchange {
  totalAmount: number;
  amountPerMonth: number;
  percentage: number;
  yearly: Yearly;
}

export interface RealEstate {
  totalAmount: number;
}

export interface MoneyInput {
  title: string;
  amount: number;
  color: string;
}

export interface Yearly {
  date: string[];
  invested: number[];
  interests: number[];
  total: number[];
}
