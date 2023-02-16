import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { colors, fonts } from '../../../../styles';
import FontAwesome, {
  SolidIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';

import Header from './Header';

import {
  SecondaryButton,
} from '../../../../components/Buttons';
import HistoryRow from '../../../../components/HistoryRow';
import SendToken from '../SendToken/SendToken';
import BalanceText from '../../../../components/BalanceText';
import TokenBalanceText from '../../../../components/TokenBalanceText';
import Toast from 'react-native-toast-message';
import TxnRBSheet from '../TxnRBSheet';
import moment from 'moment';
import SendTokenBnb from '../SendToken/SendTokenBnb';
import TxnRBSheetBnb from '../TxnRBSheetBnb';
import AccountInfoButtons from '../AccountInfoButtons';

const tokenBalance = 19.2371;
const usdAmount = 226.69;

const TokenShow = ({
  navigation,
  networks,
  currentNetwork,
  accounts,
  currentAccountIndex,
  selectedToken,
}) => {
  const refRBSendTokenSheet = useRef(null);
  const [sendAddress, setSendAddress] = useState('');
  const [submittedTxn, setSubmittedTxn] = useState(undefined);
  const [submittedTxnTime, setSubmittedTxnTime] = useState('');
  const [submittedAccount, setSubmittedAccount] = useState(undefined);
  const [submittedNetworkObject, setSubmittedNetworkObject] =
    useState(undefined);
  const refTxnRBSheet = useRef(null);

  useEffect(() => {
    return () => { };
  });

  const currentAccount = accounts[currentAccountIndex];

  const renderNetworkBalance = () => {
    return (
      <>
        {selectedToken === 'main' ? (
          <View style={{ marginLeft: 24, marginTop: 24 }}>
            <View>
              <BalanceText
                style={{ ...fonts.big_type1, color: colors.PRIMARY_P1 }}
                address={currentAccount.address}
              />
            </View>
            {/* <View style={{ marginTop: 24 }}>
              <Text style={{ ...fonts.para_regular, color: 'white' }}>
                {'$' +
                  parseFloat(tokenBalance * usdAmount)
                    .toFixed(4)
                    .toString()}
              </Text>
            </View> */}
          </View>
        ) : (
          <View style={{ marginLeft: 24, marginTop: 24 }}>
            <View>
              <TokenBalanceText
                address={currentAccount.address}
                token={selectedToken}
                style={{ ...fonts.big_type1, color: colors.PRIMARY_P1 }}
              />
            </View>
            {/* <View style={{ marginTop: 24 }}>
              <Text style={{ ...fonts.para_regular, color: 'white' }}>
                {'$' +
                  parseFloat(tokenBalance * usdAmount)
                    .toFixed(4)
                    .toString()}
              </Text>
            </View> */}
          </View>
        )}
      </>
    );
  };

  const renderHistoryPanel = () => {
    return (
      <ScrollView style={{ marginHorizontal: 24, marginVertical: 40 }}>
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={0.04}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={2.35}
          amount={2.14}
          fee={0.21}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={1.876}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={1.12}
          amount={0.99}
          fee={0.23}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={2.04}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={0.54}
          amount={0.18}
          fee={0.36}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
      </ScrollView>
    );
  };

  const renderTxnRBSheet = () => {
    console.log('Render TxnRbsheet;;;;; ', submittedTxn);
    return (
      <RBSheet
        height={620}
        ref={refTxnRBSheet}
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
            backgroundColor: colors.grey24,
          },
        }}>
        {submittedNetworkObject &&
          submittedNetworkObject.chainType === 'ethereum' && (
            <TxnRBSheet
              submittedTxn={submittedTxn}
              submittedTxnTime={submittedTxnTime}
              submittedAccount={submittedAccount}
              submittedNetworkRPC={submittedNetworkObject.rpc}
              onClose={() => {
                refTxnRBSheet.current.close();
              }}
              onSubmittedNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'submitted',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
              onSuccessNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
              onFailNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
            />
          )}
        {submittedNetworkObject &&
          submittedNetworkObject.chainType === 'binance' && (
            <TxnRBSheetBnb
              submittedTxn={submittedTxn}
              submittedTxnTime={submittedTxnTime}
              submittedAccount={submittedAccount}
              submittedNetworkRPC={submittedNetworkObject.rpc}
              onClose={() => {
                refTxnRBSheet.current.close();
              }}
              onSubmittedNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'submitted',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
              onSuccessNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
              onFailNewTxn={(text1, text2) => {
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  bottomOffset: 120,
                  text1: text1,
                  text2: text2,
                });
              }}
            />
          )}
      </RBSheet>
    );
  };
  const renderTokenSendRBSheet = () => {
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
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        {networks[currentNetwork].chainType === 'ethereum' && (
          <SendToken
            isToken={selectedToken === 'main' ? false : true}
            token={selectedToken}
            onPressClose={() => {
              refRBSendTokenSheet.current.close();
            }}
            onSubmitTxn={originTxn => {
              setSubmittedNetworkObject(networks[currentNetwork]);
              setSubmittedTxn({ ...originTxn });
              const timeString = moment(new Date().valueOf())
                .format('MMM DD [at] hh:mm a')
                .toString();
              setSubmittedTxnTime(timeString);
              setSubmittedAccount(currentAccount);
              refRBSendTokenSheet.current.close();
              Toast.show({
                type: 'txnSubmitted',
                position: 'bottom',
                bottomOffset: 120,
                props: {
                  transaction: { ...originTxn },
                  onPress: () => {
                    refTxnRBSheet.current.open();
                  },
                },
              });
            }}
            onErrorOccured={error => {
              refRBSendTokenSheet.current.close();
              Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 120,
                text1: 'Transaction failed',
                props: {
                  error: error,
                },
              });
            }}
          />
        )}
        {networks[currentNetwork].chainType === 'binance' && (
          <SendTokenBnb
            isToken={selectedToken === 'main' ? false : true}
            token={selectedToken}
            onPressClose={() => {
              refRBSendTokenSheet.current.close();
            }}
            onSubmitTxn={originTxn => {
              setSubmittedNetworkObject(networks[currentNetwork]);
              setSubmittedTxn({ ...originTxn });
              const timeString = moment(new Date().valueOf())
                .format('MMM DD [at] hh:mm a')
                .toString();
              setSubmittedTxnTime(timeString);
              setSubmittedAccount(currentAccount);
              refRBSendTokenSheet.current.close();
              Toast.show({
                type: 'txnSubmitted',
                position: 'bottom',
                bottomOffset: 120,
                props: {
                  transaction: { ...originTxn },
                  onPress: () => {
                    refTxnRBSheet.current.open();
                  },
                },
              });
            }}
            onErrorOccured={error => {
              refRBSendTokenSheet.current.close();
              Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 120,
                text1: 'Transaction failed',
                props: {
                  error: error,
                },
              });
            }}
          />
        )}
      </RBSheet>
    );
  };

  const currentNetworkSymbol = networks[currentNetwork].symbol;
  return (
    <View style={{ height: '100%', backgroundColor: colors.P3 }}>
      <Header
        tokenName={
          selectedToken === 'main'
            ? currentNetworkSymbol
            : selectedToken.tokenSymbol
        }
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {renderNetworkBalance()}
      <View style={{ backgroundColor: colors.BG + '88', marginHorizontal: 12, padding: 12, borderRadius: 12 }}>
        <AccountInfoButtons onBuy={() => { }} onReceive={() => { }} onSend={() => { refRBSendTokenSheet.current.open(); }} showFlags={{
          send: true, buy: true, receive: true, cash: true
        }} />
      </View>
      {/* {renderTransactionButtonGroup()} */}
      {renderHistoryPanel()}
      {renderTokenSendRBSheet()}
      {renderTxnRBSheet()}
    </View>
  );
};

const mapStateToProps = state => ({
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  selectedToken: state.tokens.selectedToken,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TokenShow);
