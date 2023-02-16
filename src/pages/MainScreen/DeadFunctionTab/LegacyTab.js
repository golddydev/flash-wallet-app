import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import FloatLabelInput from '../../../components/FloatLabelInput';
import { fonts, colors } from '../../../styles';
import moment from 'moment';
import { receiveLegacy, registerLegacy, revokeLegacy } from '../../../redux/actions/DeadFunctionActions';
import { connect } from 'react-redux';
import { utils } from 'ethers';
import { willContractAddress } from '../../../engine/constants';
import { getTokenDataFromAddress } from '../../../utils/token';
import Modal from 'react-native-modal';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import Toast from 'react-native-toast-message';

const screenHeight = Dimensions.get('screen').height

const LegacyRow = ({ legacy, onPress }) => {
    return <TouchableOpacity onPress={onPress
    } style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: colors.BG
    }}>
        <Text style={{
            color: 'white',
            ...fonts.title2
        }}>Heritor: </Text>
        <Text style={{
            marginTop: 8,
            color: colors.PRIMARY_P1,
            ...fonts.BODY_T4
        }}>{legacy.heritorAddress}</Text>
        <Text style={{
            marginTop: 20,
            color: 'white',
            ...fonts.title2
        }}>Time: </Text>
        <Text style={{
            marginTop: 8,
            color: colors.PRIMARY_P1,
            ...fonts.BODY_T4
        }}>{
                'After ' +
                moment(new Date(legacy.time).valueOf())
                    .format('MMM DD, YYYY [at] hh:mm a')
                    .toString()
            }</Text>
        <Text style={{
            marginTop: 20,
            color: 'white',
            ...fonts.title2
        }}>Tokens: </Text>
        <Text style={{
            marginTop: 8,
            color: colors.PRIMARY_P1,
            ...fonts.BODY_T4
        }}> {`${legacy.willTokenList.length} tokens to receive.`}</Text>
    </TouchableOpacity>
}

const LegacyModal = ({ navigation, show, setShow, legacy, tokenSymbolInfo, receiveLegacy, currentNetworkObject, currentAccount, revokeLegacy }) => {
    const [receiveLoading, setReceiveLoading] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [receiveError, setReceiveError] = useState('');

    const onReceive = () => {
        receiveLegacy(
            {
                currentNetworkObject,
                currentAccount,
                legacy,
            },
            () => {
                setReceiveLoading(true);
            },
            () => {
                setReceiveLoading(false);
                setShow(false);
                navigation.navigate('walletscreen');
            },
            (err) => {
                setReceiveError(err);
                setReceiveLoading(false);
            }
        );
    };

    const onRevoke = () => {
        revokeLegacy(
            { heritorAddress: legacy.heritorAddress },
            () => {
                setDeleteLoading(true);
            },
            () => {
                setDeleteLoading(false);
                setShow(false);
            },
            (errText) => {
                setDeleteLoading(false);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    bottomOffset: 120,
                    text1: "Error",
                    text2: errText,
                });
            }
        );
    }

    return <Modal
        isVisible={show}
        onBackdropPress={() => { setShow(false) }}
        style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
        {legacy ?
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.BG,
                    padding: 24,
                    borderRadius: 12,
                }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>Legacy</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        onRevoke()
                    }}>{deleteLoading ?
                        <ActivityIndicator color={colors.PRIMARY_P1} size={24} />
                        : <FontAwesome
                            style={{ fontSize: 16, color: 'white', marginRight: 16 }}
                            icon={SolidIcons.trash}
                        />}

                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>Heritor Address:</Text>
                        <Text style={{
                            marginTop: 10,
                            color: 'grey',
                            ...fonts.caption_small12_16_regular
                        }}>This is the heritors address from where you can get money as testant.</Text>
                        <Text style={{
                            marginTop: 16,
                            color: colors.PRIMARY_P1,
                            ...fonts.BODY_T4
                        }}>{legacy.heritorAddress}</Text>
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>Time</Text>
                        <Text style={{
                            marginTop: 10,
                            color: 'grey',
                            ...fonts.caption_small12_16_regular
                        }}>When this time passed , you can get Legacy from heritor.</Text>
                        <Text style={{
                            marginTop: 16,
                            color: colors.PRIMARY_P1,
                            ...fonts.BODY_T4
                        }}>{'After ' +
                            moment(new Date(legacy.time).valueOf())
                                .format('MMM DD, YYYY [at] hh:mm a')
                                .toString()}</Text>
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>Tokens</Text>
                        <Text style={{
                            marginTop: 10,
                            color: 'grey',
                            ...fonts.caption_small12_16_regular
                        }}>These are tokens you are goimg to be able to receive.</Text>
                        <View style={{
                            marginTop: 16
                        }}>
                            {legacy.willTokenList.map((adr, index) => <Text key={index}>
                                <Text style={{
                                    color: colors.PRIMARY_P1,
                                    ...fonts.title2,
                                    fontWeight: '900'
                                }}>
                                    {adr}
                                </Text>
                                <Text style={{ color: 'transparent' }}>A</Text>
                                <Text style={{
                                    marginLeft: 8,
                                    color: 'white',
                                    ...fonts.title2,
                                }}>
                                    {tokenSymbolInfo[adr] ? tokenSymbolInfo[adr] : "..."}
                                </Text>
                            </Text>)}
                        </View>
                    </View>
                </View>
                {receiveError.length > 0 && (
                    <Text
                        style={{
                            marginTop: 16,
                            paddingLeft: 8,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {receiveError.willTokenList}
                    </Text>
                )}
                <PrimaryButton
                    style={{ marginTop: 24 }}
                    onPress={() => {
                        onReceive();
                    }}
                    text={'Receive Legacy'}
                    textColor="white"
                    loading={receiveLoading}
                />
                <SecondaryButton
                    style={{ marginTop: 24 }}
                    onPress={() => {
                        setShow(false);
                    }}
                    text={'Cancel'}
                    textColor="white"
                />
            </View>
            : <></>
        }

    </Modal>
}

const RegisterPanel = ({ registerLegacy, currentNetworkObject, currentAccount, onHide }) => {
    const [heritorAddress, setHeritorAddress] = useState('');
    const [error, setError] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);

    const onRegisterLegacy = () => {
        if (!utils.isAddress(heritorAddress)) {
            setError('Must be valid address.');
            return;
        }
        registerLegacy(
            {
                currentNetworkObject,
                currentAccount,
                heritorAddress,
            },
            () => {
                setRegisterLoading(true);
            },
            () => {
                setRegisterLoading(false);
                onHide();
            },
            (err) => {
                setRegisterLoading(false);
                setError(err);
            }
        );
    };

    return <>
        <View style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: colors.BG,
        }}>
            <Text style={{
                color: 'white',
                ...fonts.title2
            }}>Register Legacy
            </Text>
            <Text style={{
                marginTop: 24,
                color: colors.grey9,
                ...fonts.para_regular
            }}>{"Heritor Address "}
                <Text style={{
                    color: 'red'
                }}>*</Text>
            </Text>
            <FloatLabelInput
                style={{ marginTop: 8 }}
                value={heritorAddress}
                label="Heritor Address"
                onChangeText={value => {
                    setHeritorAddress(value);
                    if (error.length > 0) {
                        setError('');
                    }
                }}
            />
            {error.length > 0 && (
                <Text
                    style={{
                        paddingTop: 8,
                        paddingLeft: 16,
                        ...fonts.caption_small12_16_regular,
                        color: colors.red5,
                    }}>
                    {error}
                </Text>
            )}
        </View>
        <View style={{ flex: 1 }}></View>
        <PrimaryButton style={{
        }} text="Register" textColor='white' onPress={() => {
            onRegisterLegacy()
        }} loading={registerLoading} />
        <SecondaryButton style={{
            marginTop: 12,
        }} text="Cancel" textColor='white' onPress={() => {
            onHide()
        }} />
    </>
}

const LegacyTab = ({
    legacyInfo,
    networks,
    currentNetwork,
    accounts,
    currentAccountIndex,
    registerLegacy,
    revokeLegacy,
    receiveLegacy,
    navigation,
}) => {
    let symbolInfo = {};

    const [showRegisterPanel, setShowRegisterPanel] = useState(false);
    const [showLegacyModal, setShowLegacyModal] = useState(false)

    const [selectedLegacy, setSelectedLegacy] = useState(undefined);
    const [tokenSymbolInfo, setTokenSymbolInfo] = useState({});

    const [isWillSet, setIsWillSet] = useState(
        willContractAddress[currentNetwork] ? true : false
    );

    useEffect(() => {
        setIsWillSet(willContractAddress[currentNetwork] ? true : false);
    }, [currentNetwork]);

    useEffect(() => {
        if (selectedLegacy) {
            symbolInfo = {};
            const network = networks[currentNetwork];
            selectedLegacy.willTokenList.map((adr) => {
                getTokenDataFromAddress(adr, network.rpc).then(({ symbol }) => {
                    symbolInfo[adr] = symbol;
                    if (
                        Object.keys(symbolInfo).length >=
                        selectedLegacy.willTokenList.length
                    ) {
                        setTokenSymbolInfo(symbolInfo);
                    }
                });
            });
        }
    }, [selectedLegacy]);

    return <View style={{
        paddingHorizontal: 20,
        paddingBottom: 40,
        height: screenHeight - 220,
    }}>
        {!isWillSet ? <View style={{
            marginTop: 48,
            padding: 24,
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white',
                ...fonts.HEADINGS_H2
            }}>Will is not set up.</Text>
        </View> : <>
            <LegacyModal
                navigation={navigation}
                currentAccount={accounts[currentAccountIndex]}
                currentNetworkObject={networks[currentNetwork]}
                legacy={selectedLegacy}
                show={showLegacyModal}
                setShow={setShowLegacyModal}
                tokenSymbolInfo={tokenSymbolInfo}
                receiveLegacy={receiveLegacy}
                revokeLegacy={revokeLegacy}
            />
            {showRegisterPanel && <RegisterPanel
                registerLegacy={registerLegacy}
                currentAccount={accounts[currentAccountIndex]}
                currentNetworkObject={networks[currentNetwork]}
                onHide={() => setShowRegisterPanel(false)} />}
            {!showRegisterPanel && <>
                <ScrollView style={{
                    flex: 1
                }}>
                    {legacyInfo.map((legacy, index) => <LegacyRow key={index} legacy={legacy} onPress={() => {
                        setSelectedLegacy(legacy);
                        setShowLegacyModal(true)
                    }} />)}
                </ScrollView>
                <PrimaryButton text="Register" textColor='white' onPress={() => {
                    setShowRegisterPanel(true);
                }} />
            </>}
        </>}
    </View>
}

const mapStateToProps = (state) => ({
    legacyInfo: state.deadFunction.legacy,
    currentNetwork: state.networks.currentNetwork,
    networks: state.networks.networks,
    currentAccountIndex: state.accounts.currentAccountIndex,
    accounts: state.accounts.accounts,
});
const mapDispatchToProps = (dispatch) => ({
    registerLegacy: (data, beforeWork, successCallback, failCallback) =>
        registerLegacy(dispatch, data, beforeWork, successCallback, failCallback),
    revokeLegacy: (data, beforeWork, successCallback, failCallback) =>
        revokeLegacy(dispatch, data, beforeWork, successCallback, failCallback),
    receiveLegacy: (data, beforeWork, successCallback, failCallback) =>
        receiveLegacy(dispatch, data, beforeWork, successCallback, failCallback),
});
export default connect(mapStateToProps, mapDispatchToProps)(LegacyTab);