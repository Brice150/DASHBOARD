export interface FinanceInfos {
  spendingsInfos: Spendings;
  savingsInfos: Savings;
  stockExchangeInfos: StockExchange;
  realEstateInfos: RealEstate;
}

export interface Spendings {
  totalAmount: number;
  spendings: MoneyInput[];
  earnings: MoneyInput[];
}

export interface Savings {
  totalAmount: number;
  savings: MoneyInput[];
}

export interface StockExchange {
  totalAmount: number;
  stockMoneyInput: StockMoneyInput;
  yearly: Yearly;
}

export interface RealEstate {
  totalAmount: number;
}

export interface MoneyInput {
  title: string;
  amount: number;
}

export interface StockMoneyInput {
  amountPerMonth: number;
  initialAmount: number;
  percentage: number;
}

export interface Yearly {
  date: string[];
  invested: number[];
  interests: number[];
  total: number[];
}
