import { FinanceInfos } from "./financeInfos";
import { Task } from "./task";

export interface User {
    prefersDarkMode: boolean;
    finance?: FinanceInfos;
    city: string;
    tasks?: Task;
}