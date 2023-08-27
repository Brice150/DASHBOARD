import { FinanceInfos } from "./financeInfos";
import { Task } from "./task";

export interface User {
    prefersDarkMode: boolean;
    financeInfos: FinanceInfos;
    city: string;
    tasks: Task[];
}