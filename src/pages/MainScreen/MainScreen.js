import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { colors, fonts } from '../../styles';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import WalletTab from './WalletTab/WalletTab';
import SettingsTab from './SettingsTab/SettingsTab';
import { getFeeData } from '../../redux/actions/EngineAction';
import SwapTab from './SwapTab/SwapTab';
import SwapTabBnb from './SwapTab/SwapTabBnb';
import { ethers, utils } from 'ethers';
import RBSheet from 'react-native-raw-bottom-sheet';
import TxnRBSheet from './WalletTab/TxnRBSheet';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import TxnRBSheetBnb from './WalletTab/TxnRBSheetBnb';
import { SvgXml } from 'react-native-svg';
import CustomKeyboardView from '../../components/CustomKeyboardView';

const tempTxn = {
  type: 2,
  chainId: 4,
  nonce: 56,
  maxPriorityFeePerGas: utils.parseEther('0.0000000015'),
  maxFeePerGas: utils.parseEther('0.000000001500000016'),
  gasPrice: null,
  gasLimit: ethers.BigNumber.from(21000),
  to: '0xB1e50315BbDa7D9Fd7e4F030e26eEC585A1Efc0c',
  value: utils.parseEther('0.001'),
  data: '0x',
  accessList: [],
  hash: '0xde8f5411d2d531817747a1ddab3ef4f25ffc721edb9f7ad3eed5dba864b27f84',
  v: 0,
  r: '0x60d1134a116991601e9f02d08c45f9e7c72bc738d58f5e46f3a4e232f40cf92d',
  s: '0x353d211b728e8a67ffdebe3fa5aedabb62c444c8a93816870fb17976b78d9da3',
  from: '0x632Bd9a598cd5c52F1625c850A6c46ECd4Cb7829',
  confirmations: 0,
};

const MainScreen = ({
  navigation,
  networks,
  currentNetwork,
  getFeeData,
  accounts,
  currentAccountIndex,
  feeData,
}) => {
  const [submittedTxn, setSubmittedTxn] = useState(tempTxn);
  const [submittedTxnTime, setSubmittedTxnTime] = useState('');
  const [submittedAccount, setSubmittedAccount] = useState(undefined);
  const [submittedNetworkObject, setSubmittedNetworkObject] =
    useState(undefined);

  const refTxnRBSheet = useRef(null);
  const route = useRoute();

  const currentAccount = accounts[currentAccountIndex];

  useEffect(() => {
    if (networks[currentNetwork]) {
      getFeeData(networks[currentNetwork]);
    }
    // console.log(networks[currentNetwork]);
  }, [currentNetwork]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     if (route.name === 'mainscreen') {
  //       BackHandler.exitApp();
  //       return true;
  //     }
  //     return false;
  //   });
  // }, []);

  const renderTxnRBSheet = () => {
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
                if (refTxnRBSheet && refTxnRBSheet.current) {
                  refTxnRBSheet.current.close();
                }
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
                if (refTxnRBSheet && refTxnRBSheet.current) {
                  refTxnRBSheet.current.close();
                }
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

  const tabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#18171C', paddingVertical: 15 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const icon =
            label === 'Wallet' ? (
              <FontAwesome
                style={{
                  fontSize: 18,
                  color: isFocused ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={SolidIcons.wallet}
              />
            ) : label === 'Swap' ? (
              <FontAwesome
                style={{
                  fontSize: 18,
                  color: isFocused ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={SolidIcons.exchangeAlt}
              />
            ) :
              label === 'Dead' ? <SvgXml xml={isFocused ? fonts.bottomMenuDeadFunctionSvgXmlFocused : fonts.bottomMenuDeadFunctionSvgXml} fontSize={50} /> :
                (
                  <FontAwesome
                    style={{
                      fontSize: 18,
                      color: isFocused ? colors.PRIMARY_P1 : colors.grey9,
                    }}
                    icon={SolidIcons.cog}
                  />
                );

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={Math.random()}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}>
              <View style={{ alignItems: 'center' }}>
                {icon}
                {/* <Text
                  style={{
                    color: isFocused ? colors.primary5 : colors.grey5,
                    ...fonts.caption_small12_16_regular,
                  }}>
                  {label}
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const updatedWalletTab = ({ navigation }) => {
    return (<>
      {
        networks[currentNetwork] ?
          <WalletTab
            onSwap={() => { }}
            navigation={navigation}
            onSendSubmittedTxn={originTxn => {
              if (networks[currentNetwork]) {
                setSubmittedNetworkObject(networks[currentNetwork]);
              }
              setSubmittedTxn({ ...originTxn });
              const timeString = moment(new Date().valueOf())
                .format('MMM DD [at] hh:mm a')
                .toString();
              setSubmittedTxnTime(timeString);
              setSubmittedAccount(currentAccount);
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
            onSendError={error => {
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
          /> : <></>}
    </>
    );
  };

  const updatedSwapTab = ({ navigation }) => {
    if (networks[currentNetwork]?.chainType == 'ethereum') {
      return (
        <SwapTab
          navigation={navigation}
          onSubmitTxn={originTxn => {
            navigation.navigate('Wallet');
            if (networks[currentNetwork]) {
              setSubmittedNetworkObject(networks[currentNetwork]);
            }
            setSubmittedTxn({ ...originTxn });
            const timeString = moment(new Date().valueOf())
              .format('MMM DD [at] hh:mm a')
              .toString();
            setSubmittedTxnTime(timeString);
            setSubmittedAccount(currentAccount);
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
      );
    } else if (networks[currentNetwork]?.chainType == 'binance') {
      return (
        <SwapTabBnb
          navigation={navigation}
          onSubmitTxn={originTxn => {
            navigation.navigate('Wallet');
            if (networks[currentNetwork]) {
              setSubmittedNetworkObject(networks[currentNetwork]);
            }
            setSubmittedTxn({ ...originTxn });
            const timeString = moment(new Date().valueOf())
              .format('MMM DD [at] hh:mm a')
              .toString();
            setSubmittedTxnTime(timeString);
            setSubmittedAccount(currentAccount);
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
      );
    }
  };

  return (
    <CustomKeyboardView>
      {renderTxnRBSheet()}
      <Tab.Navigator backBehavior="history" tabBar={tabBar}>
        <Tab.Screen
          name="Wallet"
          component={updatedWalletTab}
          options={{
            tabBarLabel: 'Wallet',
          }}
        />
        <Tab.Screen
          name="Swap"
          component={updatedSwapTab}
          options={{
            tabBarLabel: 'Swap',
          }}
        />
        <Tab.Screen
          name="Dead"
          component={SettingsTab}
          options={{
            tabBarLabel: 'Dead',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsTab}
          options={{
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </CustomKeyboardView>
  );
};

const mapStateToProps = state => ({
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  feeData: state.engine.feeData,
});
const mapDispatchToProps = dispatch => ({
  getFeeData: currentNetworkObject =>
    getFeeData(dispatch, currentNetworkObject),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
