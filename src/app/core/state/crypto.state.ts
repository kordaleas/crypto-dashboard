import { Cryptocurrency } from "../../models/cryptocurrency.interface";

export interface CryptoState {
  cryptos: Cryptocurrency[];
  loading: boolean;
  error: any;
}

export const initialState: CryptoState = {
  cryptos: [],
  loading: false,
  error: null
};