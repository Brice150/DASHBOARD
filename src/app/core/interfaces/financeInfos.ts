export interface FinanceInfos {
  moneyInput: MoneyInput;
  yearly: Yearly;
}

export interface MoneyInput {
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
