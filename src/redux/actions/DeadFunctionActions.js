import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_DEAD_FUNCTION_INFO, SET_WILL_INFO } from '../types';

const busdTokenAddress = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7';

import erc20Abi from '../../abis/erc20ABI.json';
import aggregatorV3ABI from '../../abis/aggregatorV3ABI.json';
import willContractAbi from '../../abis/willContractAbi.json';
import {
  aggregatorAddress,
  willContractAddress,
} from '../../engine/constants';
import { ethers, utils } from 'ethers';

export const loadDeadFunctionInfo = dispatch => {
  AsyncStorage.getItem('deadfunction_info')
    .then(res => {
      const data = JSON.parse(res);
      dispatch({ type: SET_DEAD_FUNCTION_INFO, payload: data });
    })
    .catch(err => {
      console.log('DeadFunction Load Action ERROR: ', err);
    });
};

export const setDeadFunctionInfo = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  AsyncStorage.setItem("deadfunction_info", JSON.stringify(data))
    .then(() => {
      dispatch({ type: SET_DEAD_FUNCTION_INFO, payload: data });
      successCallback();
    })
    .catch((err) => {
      console.log('DeadFunction Load Action ERROR: ', err);
      failCallback();
    });
};

export const setWillInfo = (dispatch, data) => {
  dispatch({
    type: SET_WILL_INFO,
    payload: data,
  });
};

export const addWill = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  const {
    currentNetworkObject,
    currentAccount,
    sendAddress,
    period,
    willTokenList,
  } = data;
  const provider = new ethers.providers.JsonRpcProvider(
    currentNetworkObject.rpc
  );
  const wallet = new ethers.Wallet(currentAccount.privateKey, provider);
  (async () => {
    try {
      if (!aggregatorAddress[currentNetworkObject.chainId]) {
        throw {
          reason: 'Aggregator is not ready for this network.',
        };
      }
      let approvePromises = [];
      const currentNonce = await wallet.getTransactionCount();
      willTokenList.forEach((tokenAddress, index) => {
        let promise = new Promise(async (resolve, reject) => {
          try {
            const tokenContract = new ethers.Contract(
              tokenAddress,
              erc20Abi,
              provider
            );
            const balance = await tokenContract.balanceOf(
              currentAccount.address
            );
            console.log(balance);
            const approveTxn = await tokenContract.populateTransaction.approve(
              willContractAddress[currentNetworkObject.chainId],
              balance
            );
            console.log(approveTxn);
            const approveTxnRes = await wallet.sendTransaction({
              ...approveTxn,
              nonce: currentNonce + index,
            });
            console.log(approveTxnRes);
            await approveTxnRes.wait();
            resolve(true);
          } catch (err) {
            console.log('*'.repeat(20), err);
            reject({ ...err, customErrorReason: 'will_token_list_error' });
          }
        });
        approvePromises.push(promise);
      });

      await Promise.all(approvePromises);

      const priceFeed = new ethers.Contract(
        aggregatorAddress[currentNetworkObject.chainId],
        aggregatorV3ABI,
        provider
      );
      const roundData = await priceFeed.latestRoundData();
      let taxPrice = roundData.answer;
      taxPrice = utils.parseEther('1').div(taxPrice.mul(2));
      taxPrice = taxPrice.mul(utils.parseUnits('1', 8));
      taxPrice = taxPrice.mul(willTokenList.length);
      console.log('-'.repeat(20), taxPrice.toString());

      const willContract = new ethers.Contract(
        willContractAddress[currentNetworkObject.chainId],
        willContractAbi,
        provider
      );
      const txn = await willContract.populateTransaction.addWill(
        sendAddress,
        period,
        willTokenList,
        { value: taxPrice }
      );
      console.log(txn);
      const txnRes = await wallet.sendTransaction(txn);
      console.log(txnRes);
      await txnRes.wait();
      const currentWill = await willContract.willOf(currentAccount.address);
      dispatch({
        type: SET_WILL_INFO,
        payload: {
          testator: currentWill.testator,
          fromTime: currentWill.fromTime,
          afterTime: currentWill.afterTime,
          willTokenList: currentWill.tokens,
        },
      });
      console.log(currentWill);
      successCallback(currentWill);
    } catch (err) {
      console.log('Add Will ERR: ', err);
      if (err.customErrorReason === 'will_token_list_error') {
        failCallback(
          'Something went wrong. Maybe some tokens added to will list are not valid.'
        );
      } else {
        failCallback('Something went wrong.');
      }
    }
  })();
};

export const renounceWill = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  const { currentNetworkObject, currentAccount } = data;
  const provider = new ethers.providers.JsonRpcProvider(
    currentNetworkObject.rpc
  );
  const wallet = new ethers.Wallet(currentAccount.privateKey, provider);
  (async () => {
    try {
      const willContract = new ethers.Contract(
        willContractAddress[currentNetworkObject.chainId],
        willContractAbi,
        provider
      );
      const txn = await willContract.populateTransaction.renounceWill();
      console.log(txn);
      const txnRes = await wallet.sendTransaction(txn);
      console.log(txnRes);
      await txnRes.wait();
      dispatch({
        type: SET_WILL_INFO,
        payload: {
          testator: undefined,
          fromTime: undefined,
          afterTime: undefined,
        },
      });
      successCallback();
    } catch (err) {
      console.log('Renouce Will ERR: ', err);
      failCallback();
    }
  })();
};

export const registerLegacy = (
  dispatch,
  inputData,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  const { currentNetworkObject, currentAccount, heritorAddress } = inputData;
  const provider = new ethers.providers.JsonRpcProvider(
    currentNetworkObject.rpc
  );
  (async () => {
    const willContract = new ethers.Contract(
      willContractAddress[currentNetworkObject.chainId],
      willContractAbi,
      provider
    );
    const will = await willContract.willOf(heritorAddress);
    if (
      will.testator.toString().toLowerCase() !==
      currentAccount.address.toLowerCase()
    ) {
      failCallback("That heritor doesn't give any will to you.");
    } else {
      AsyncStorage.getItem('deadfunction_info')
        .then((res) => {
          let data = JSON.parse(res);
          console.log(data);
          let foundIndex = data.legacy.findIndex(
            (e) => e.heritorAddress === heritorAddress
          );
          if (foundIndex >= 0) {
            failCallback('That Heritor is already existed on your list.');
          } else {
            data.legacy.push({
              heritorAddress,
              time:
                (will.fromTime.toNumber() + will.afterTime.toNumber()) * 1000,
              willTokenList: will.tokens,
            });
            AsyncStorage.setItem('deadfunction_info', JSON.stringify(data))
              .then(() => {
                console.log('Successfully added legacy');
                dispatch({
                  type: SET_DEAD_FUNCTION_INFO,
                  payload: data,
                });
                successCallback();
              })
              .catch((err) => {
                console.log('add Legacy ERR: ', err);
                failCallback('Something went wrong.');
              });
          }
        })
        .catch((err) => {
          console.log('get will info ERROR: ', err);
        });
    }
  })();
};

export const revokeLegacy = (
  dispatch,
  inputData,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  const { currentNetworkObject, currentAccount, heritorAddress } = inputData;
  AsyncStorage.getItem('deadfunction_info')
    .then((res) => {
      let data = JSON.parse(res);
      let foundIndex = data.legacy.findIndex(
        (e) => e.heritorAddress === heritorAddress
      );
      if (foundIndex >= 0) {
        data.legacy.splice(foundIndex, 1);
        AsyncStorage.setItem('deadfunction_info', JSON.stringify(data))
          .then(() => {
            dispatch({
              type: SET_DEAD_FUNCTION_INFO,
              payload: data,
            });
            successCallback();
          })
          .catch((err) => {
            console.log('remove Legacy ERR: ', err);
          });
      } else {
        failCallback('Extension Database error.');
      }
    })
    .catch((err) => {
      console.log('get will info ERROR: ', err);
    });
};

export const receiveLegacy = (
  dispatch,
  inputData,
  beforeWork,
  successCallback,
  failCallback
) => {
  beforeWork();
  const { currentNetworkObject, currentAccount, legacy } = inputData;
  const provider = new ethers.providers.JsonRpcProvider(
    currentNetworkObject.rpc
  );
  const wallet = new ethers.Wallet(currentAccount.privateKey, provider);
  const willContract = new ethers.Contract(
    willContractAddress[currentNetworkObject.chainId],
    willContractAbi,
    provider
  );

  (async () => {
    try {
      const txn = await willContract.populateTransaction.receiveWill(
        legacy.heritorAddress
      );
      const txnRes = await wallet.sendTransaction(txn);
      await txnRes.wait();

      AsyncStorage.getItem('deadfunction_info')
        .then((res) => {
          let data = JSON.parse(res)
          console.log(data);
          let foundIndex = data.legacy.findIndex(
            (e) => e.heritorAddress === legacy.heritorAddress
          );
          if (foundIndex >= 0) {
            data.legacy.splice(foundIndex, 1);
            AsyncStorage.setItem('deadfunction_info', JSON.stringify(data))
              .then(() => {
                dispatch({
                  type: SET_DEAD_FUNCTION_INFO,
                  payload: data,
                });
                successCallback();
              })
              .catch((err) => {
                console.log('remove Legacy ERR: ', err);
              });
          }
        })
        .catch((err) => {
          console.log('get will info ERROR: ', err);
        });
    } catch (err) {
      console.log('Receive Legacy ERR:Here ', err);
      if (err) {
        if (err.toString().includes('Will: Too soon')) {
          failCallback(
            'Too soon, Just wait. If the Time displayed is already passed, then heritor must update will, Just Re-Register Legacy.'
          );
        } else if (
          err.toString().includes('Will: Heritor is not correct.')
        ) {
          failCallback('Heritor is not correct.');
        } else {
          failCallback('Something went wrong.');
        }
      } else {
        failCallback('Something went wrong.');
      }

    }
  })();
};