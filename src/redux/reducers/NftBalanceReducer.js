import {SET_NFT_BALANCE_UPDATED_INFO} from '../types';

const initialState = {};

const NftBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NFT_BALANCE_UPDATED_INFO: {
      // console.log(action);
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default NftBalanceReducer;
