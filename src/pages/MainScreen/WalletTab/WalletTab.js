import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Image,
} from 'react-native';
import { colors, fonts } from '../../../styles';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Header from './Header';
import TokenAndCollectiblesTab from './TokenAndCollectibleTab';

import TokenShow from './TokenShow/TokenShow';
import SendToken from './SendToken/SendToken';
import RBSheet from 'react-native-raw-bottom-sheet';
import ReceiveToken from './ReceiveToken/ReceiveToken';
import BuyToken from './BuyToken/BuyToken';
import SendTokenBnb from './SendToken/SendTokenBnb';
import AccountInfo from './AccountInfo';
import CustomKeyboardView from '../../../components/CustomKeyboardView';

const buyIconSvgXml = require('../SVGData').buyIcon;

const SendTokenRBSheet = ({ refRBSendTokenSheet, currentNetworkObject, onSendSubmittedTxn, onSendError }) => {
  return (
    <RBSheet
      height={Dimensions.get('screen').height}
      ref={refRBSendTokenSheet}
      closeOnDragDown={true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: '#222531BB',
        },
        draggableIcon: {
          backgroundColor: colors.grey9,
        },
        container: {
          backgroundColor: colors.BG,
        },
      }}>
      {currentNetworkObject.chainType === 'ethereum' && (
        <SendToken
          isToken={false}
          onPressClose={() => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
          }}
          onSubmitTxn={originTxn => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
            onSendSubmittedTxn(originTxn);
          }}
          onErrorOccured={error => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
            onSendError(error);
          }}
        />
      )}
      {currentNetworkObject.chainType === 'binance' && (
        <SendTokenBnb
          isToken={false}
          onPressClose={() => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
          }}
          onSubmitTxn={originTxn => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
            onSendSubmittedTxn(originTxn);
          }}
          onErrorOccured={error => {
            if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
              refRBSendTokenSheet.current.close();
            }
            onSendError(error);
          }}
        />
      )}
    </RBSheet>
  );
}

const WalletTab = ({
  navigation,
  currentNetwork,
  networks,
  gettingFeeDataTimerId,
  accounts,
  currentAccountIndex,
  onSendSubmittedTxn,
  onSendError,
  onSwap
}) => {
  const [selectedToken, setSelectedToken] = useState('');

  const refRBSendTokenSheet = useRef(null);
  const refRBReceiveTokenSheet = useRef(null);
  const refRBBuySheet = useRef(null);

  useEffect(() => {
    return () => {
      // console.warn('wallet tab is gone');
    };
  });

  const currentAccount = accounts[currentAccountIndex];
  const currentNetworkObject = networks[currentNetwork];

  const onSend = () => {
    refRBSendTokenSheet.current.open();
  }

  const onReceive = () => {
    refRBReceiveTokenSheet.current.open();
  }

  const onBuy = () => {
    refRBBuySheet.current.open();
  }

  const renderBuyRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 150}
        onClose={() => {
          clearTimeout(gettingFeeDataTimerId);
        }}
        ref={refRBBuySheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.BG,
          },
        }}>
        <BuyToken
          onPressClose={() => {
            refRBBuySheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const renderReceiveTokenRBSheet = () => {
    return (
      <RBSheet
        height={600}
        ref={refRBReceiveTokenSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.BG,
          },
        }}>
        <ReceiveToken token={'main'} />
      </RBSheet>
    );
  };

  const tokenRowPressed = token => {
    setSelectedToken(token);
  };

  return (
    <CustomKeyboardView keyboardAwareScrollViewProps={{
      nestedScrollEnabled: true
    }} style={{
      backgroundColor: colors.BG,
    }}>
      {/* <TouchableOpacity
          style={{width: 100, height: 100, backgroundColor: 'red'}}
          onPress={() => {
            Toast.show({
              type: 'txnCancelled',
              position: 'bottom',
              bottomOffset: 120,
              props: {
                transaction: {},
                onPress: () => {
                  setSubmittedTxn(tempTxn);
                  const timeString = moment(new Date().valueOf())
                    .format('MMM DD [at] hh:mm a')
                    .toString();
                  setSubmittedTxnTime(timeString);
                  setSubmittedAccount(accounts[currentAccountIndex]);
                  refTxnRBSheet.current.open();
                },
              },
            });
          }}></TouchableOpacity> */}
      {selectedToken.length > 0 && (
        <>
          <TokenShow
            onBackPress={() => {
              setSelectedToken('');
            }}
          />
        </>
      )}
      {!selectedToken && (
        <>
          <SendTokenRBSheet currentNetworkObject={currentNetworkObject} onSendError={onSendError} onSendSubmittedTxn={onSendSubmittedTxn} refRBSendTokenSheet={refRBSendTokenSheet} />
          {renderReceiveTokenRBSheet()}
          {renderBuyRBSheet()}
          <Header navigation={navigation} />
          <AccountInfo onBuy={onBuy} onSend={onSend} onReceive={onReceive} onSwap={onSwap} />
          <TokenAndCollectiblesTab
            navigation={navigation}
            tokenPressed={tokenRowPressed}
          />
        </>
      )}
    </CustomKeyboardView>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  gettingFeeDataTimerId: state.engine.gettingFeeDataTimerId,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTab);
