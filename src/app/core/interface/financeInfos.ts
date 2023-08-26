export interface FinanceInfos {
    ETF: string;
    date: string[];
    totalAmount: number[];
    moneyInput: MoneyInput;
}

export interface MoneyInput {
    amountPerMonth: number;
    initialAmount: number;
}