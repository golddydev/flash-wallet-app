import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { colors, fonts } from '../../styles';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import WalletTab from './WalletTab/WalletTab';
import { getFeeData } from '../../redux/actions/EngineAction';
import { ethers, utils } from 'ethers';
import RBSheet from 'react-native-raw-bottom-sheet';
import TxnRBSheet from './WalletTab/TxnRBSheet';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import TxnRBSheetBnb from './WalletTab/TxnRBSheetBnb';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import BottomNavigator from './BottomNavigator';

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

const WalletScreen = ({
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
    }, [currentNetwork]);

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
    const UpdatedWalletTab = ({ navigation }) => {
        return (<View style={{ flex: 1, }}>
            {
                networks[currentNetwork] ?
                    <WalletTab
                        onSwap={() => {
                            navigation.navigate('swapscreen')
                        }}
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
        </View>
        );
    };

    return (
        <CustomKeyboardView>
            {renderTxnRBSheet()}
            <UpdatedWalletTab navigation={navigation} />
            <BottomNavigator navigation={navigation} state="walletscreen" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
