import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import BalancesReducer from './BalancesReducer';
import DeadFunctionReducer from './DeadFunctionReducer';
import EngineReducer from './EngineReducer';
import NetworkReducer from './NetworkReducer';
import NftBalanceReducer from './NftBalanceReducer';
import NftInfoCacheReducer from './NftInfoCacheReducer';
import QuoteReducer from './QuoteReducer';
import SettingsReducer from './SettingsReducer';
import TokensReducer from './TokensReducer';
import WalletReducer from './WalletReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  networks: NetworkReducer,
  wallet: WalletReducer,
  balances: BalancesReducer,
  tokens: TokensReducer,
  engine: EngineReducer,
  settings: SettingsReducer,
  quote: QuoteReducer,
  nftBalances: NftBalanceReducer,
  nftInfoCache: NftInfoCacheReducer,
  deadFunction: DeadFunctionReducer,
});

export default reducer;
