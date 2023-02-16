import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_NFT_BALANCE_UPDATED_INFO} from '../types';

export const addNFT = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
  errorCallback,
) => {
  beforeWork();
  const {currentNetwork, currentAccountIndex, nftAddress, nftId} = data;
  //   dispatch({type: SET_NFT_BALANCE_UPDATED_INFO, payload: data});
  AsyncStorage.getItem('nftbalances_info')
    .then(res => {
      let info = JSON.parse(res);
      if (!info[currentNetwork.toString()]) {
        info[currentNetwork.toString()] = {};
      }
      if (!info[currentNetwork.toString()][currentAccountIndex.toString()]) {
        info[currentNetwork.toString()][currentAccountIndex.toString()] = {
          tokensList: [],
        };
      }
      let needUpdate = true;
      let foundIndex = info[currentNetwork.toString()][
        currentAccountIndex.toString()
      ].tokensList.findIndex(e => e.nftAddress == nftAddress);
      if (foundIndex < 0) {
        info[currentNetwork.toString()][
          currentAccountIndex.toString()
        ].tokensList.push({nftAddress: nftAddress, idList: [nftId]});
      } else {
        let idIndex = info[currentNetwork.toString()][
          currentAccountIndex.toString()
        ].tokensList[foundIndex].idList.findIndex(e => e == nftId);
        if (idIndex >= 0) {
          needUpdate = false;
          failCallback('This NFT is now being used.');
        } else {
          info[currentNetwork.toString()][
            currentAccountIndex.toString()
          ].tokensList[foundIndex].idList.push(nftId);
        }
      }
      if (needUpdate) {
        AsyncStorage.setItem('nftbalances_info', JSON.stringify(info))
          .then(() => {
            console.log(info);
            dispatch({type: SET_NFT_BALANCE_UPDATED_INFO, payload: info});
            successCallback();
          })
          .catch(err => {
            console.log('addNFT error: ', err);
            errorCallback();
          });
      }
    })
    .catch(err => {
      console.log('addNFT error: ', err);
      errorCallback();
    });
};

export const loadNftBalancesInfo = dispatch => {
  AsyncStorage.getItem('nftbalances_info').then(res => {
    let info = JSON.parse(res);
    dispatch({type: SET_NFT_BALANCE_UPDATED_INFO, payload: info});
  });
};
