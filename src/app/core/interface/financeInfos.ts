export interface FinanceInfos {
    date: string[];
    totalAmount: number[];
    moneyInput: MoneyInput;
}

export interface MoneyInput {
    amountPerMonth: number;
    initialAmount: number;
    percentage: number;
}