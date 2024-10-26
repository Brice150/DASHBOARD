import { Trip } from './trip';

export interface Country {
  name: string;
  code: string;
  trips?: Trip[];
}
