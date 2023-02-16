import {
  SET_NFT_CACHE_UPDATED,
  SET_NFT_CACHE_NAME,
  SET_NFT_CACHE_DATA,
} from '../types';

const initialState = {};

const NftInfoCacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NFT_CACHE_UPDATED:
      return {
        ...state,
        ...action.payload,
      };
    case SET_NFT_CACHE_NAME: {
      let tempState = {...state};
      if (!tempState[action.payload.currentNetwork.toString()]) {
        tempState[action.payload.currentNetwork.toString()] = {};
      }
      if (
        !tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ]
      ) {
        tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ] = {};
      }
      tempState[action.payload.currentNetwork.toString()][
        action.payload.nftData.nftAddress.toString()
      ] = {
        ...tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ],
        name: action.payload.name,
      };
      return {...tempState};
    }
    case SET_NFT_CACHE_DATA: {
      let tempState = {...state};
      if (!tempState[action.payload.currentNetwork.toString()]) {
        tempState[action.payload.currentNetwork.toString()] = {};
      }
      if (
        !tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ]
      ) {
        tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ] = {};
      }
      tempState[action.payload.currentNetwork.toString()][
        action.payload.nftData.nftAddress.toString()
      ] = {
        ...tempState[action.payload.currentNetwork.toString()][
          action.payload.nftData.nftAddress.toString()
        ],
        nftData: {
          ...(tempState[action.payload.currentNetwork.toString()][
            action.payload.nftData.nftAddress.toString()
          ].nftData || {}),
          [action.payload.nftData.nftId]: action.payload.data,
        },
      };
      return {...tempState};
    }
    default: {
      return state;
    }
  }
};

export default NftInfoCacheReducer;
