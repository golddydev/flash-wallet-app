import {
  SET_BASE_CURRENCY,
  SET_CURRENT_LANGUAGE,
  SET_AUTOLOCK_TIME,
  SET_PRIVACY_CURRENCY,
  SET_SEARCH_ENGINE,
  SET_SETTINGS_DATA,
  SET_SIGNIN_WITH_FACEID,
  SET_PRIVACY_MODE,
  SET_INMETA_METRICS,
  SET_INCOMING_TXN,
} from '../types';
import {initialSettings} from '../../engine/constants';

const initialState = {...initialSettings};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_BASE_CURRENCY: {
      return {
        ...state,
        baseCurrency: action.payload,
      };
    }
    case SET_CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }
    case SET_AUTOLOCK_TIME: {
      return {
        ...state,
        autoLockTime: action.payload,
      };
    }
    case SET_PRIVACY_CURRENCY: {
      return {...state, privacyCurrency: action.payload};
    }
    case SET_SEARCH_ENGINE: {
      return {
        ...state,
        searchEngine: action.payload,
      };
    }
    case SET_SIGNIN_WITH_FACEID: {
      return {
        ...state,
        signInWithFaceId: action.payload,
      };
    }
    case SET_PRIVACY_MODE: {
      return {
        ...state,
        privacyMode: action.payload,
      };
    }
    case SET_INMETA_METRICS: {
      return {
        ...state,
        inMetaMetrics: action.payload,
      };
    }
    case SET_INCOMING_TXN: {
      return {
        ...state,
        incomingTxn: action.payload,
      };
    }
    default:
      return state;
  }
};

export default SettingsReducer;
