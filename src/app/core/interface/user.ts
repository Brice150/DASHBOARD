import { TaskList } from "./task";

export interface User {
    prefersDarkMode: boolean;
    ETF: string;
    city: string;
    taskList?: TaskList;
}