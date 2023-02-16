import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux';
import FloatLabelInput from '../../../components/FloatLabelInput';
import { colors, fonts } from '../../../styles';

import { willContractAddress } from '../../../engine/constants'
import CheckBox from 'react-native-check-box';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import { ethers, utils } from 'ethers';
import { addWill, renounceWill, setWillInfo } from '../../../redux/actions/DeadFunctionActions';
import willContractAbi from '../../../abis/willContractAbi.json';
import moment from 'moment';

const WillTab = ({
    navigation,
    tokens,
    currentAccountIndex,
    currentNetwork,
    networks,
    accounts,
    setWillInfo,
    addWill,
    renounceWill,
}) => {
    let componentDestroyed = false;

    const [hasWill, setHasWill] = useState(false);
    const [isWillSet, setIsWillSet] = useState(
        willContractAddress[currentNetwork] ? true : false
    );

    const [sendAddress, setSendAddress] = useState('');
    const [period, setPeriod] = useState('');
    const [willTokenList, setWillTokenList] = useState({});
    const [error, setError] = useState({
        sendAddress: '',
        period: '',
        willTokenList: '',
    });

    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [currentWill, setCurrentWill] = useState(undefined);

    const tokensList = tokens[currentNetwork.toString()]
        ? tokens[currentNetwork.toString()][currentAccountIndex]
            ? tokens[currentNetwork.toString()][currentAccountIndex].tokensList
            : []
        : [];

    useEffect(() => {
        return () => {
            componentDestroyed = true;
        };
    }, []);

    useEffect(() => {
        const network = networks[currentNetwork];
        const provider = new ethers.providers.JsonRpcProvider(network.rpc);
        setIsWillSet(willContractAddress[currentNetwork] ? true : false);
        if (!willContractAddress[currentNetwork]) {
            return;
        }
        setLoading(true);
        const willContract = new ethers.Contract(
            willContractAddress[currentNetwork],
            willContractAbi,
            provider
        );
        willContract
            .willOf(accounts[currentAccountIndex].address)
            .then((res) => {
                if (!componentDestroyed) {
                    setWillInfo({
                        testator: res.testator,
                        fromTime: res.fromTime,
                        afterTime: res.afterTime,
                        willTokenList: res.tokens.reduce(
                            (cur, adr) => Object.assign(cur, { [adr]: true }),
                            {}
                        ),
                    });
                    setLoading(false);
                    setHasWill(res.fromTime.toNumber() === 0 ? false : true);
                    setCurrentWill({
                        testator: res.testator,
                        fromTime: res.fromTime,
                        afterTime: res.afterTime,
                        willTokenList: res.tokens.reduce(
                            (cur, adr) => Object.assign(cur, { [adr]: true }),
                            {}
                        ),
                    });
                }
            })
            .catch((err) => {
                console.log('Will Get ERR: ', err);
                setLoading(false);
            });
    }, [currentNetwork, currentAccountIndex]);

    const checkCanSave = () => {
        if (sendAddress.length == 0 || period.length == 0) {
            return false;
        }
        let tempError = {
            sendAddress: '',
            period: '',
            willTokenList: '',
        };
        let canDo = true;
        if (!utils.isAddress(sendAddress)) {
            tempError.sendAddress = 'Must be valid address.';
            canDo = false;
        }
        if (parseInt(period) !== Number(period)) {
            tempError.period = 'Must be valid integer.';
            canDo = false;
        }
        if (parseInt(period) < 1) {
            tempError.period = 'Must be bigger than 0.';
            canDo = false;
        }
        if (Object.keys(willTokenList).length === 0) {
            tempError.willTokenList =
                'Must select at least one token to add to your will.';
            canDo = false;
        }
        if (!canDo) {
            setError({ ...tempError });
        }

        return canDo;
    };

    const onSaveWill = () => {
        if (!checkCanSave()) {
            return;
        }
        setError({
            sendAddress: '',
            period: '',
            willTokenList: '',
        });
        addWill(
            {
                currentNetworkObject: networks[currentNetwork],
                currentAccount: accounts[currentAccountIndex],
                sendAddress,
                period,
                willTokenList: Object.keys(willTokenList),
            },
            () => {
                setSaveLoading(true);
            },
            (resWill) => {
                setSaveLoading(false);
                setHasWill(true);
                setCurrentWill({
                    ...resWill,
                    willTokenList: resWill.tokens.reduce(
                        (cur, adr) => Object.assign(cur, { [adr]: true }),
                        {}
                    ),
                });
                setWillTokenList(
                    resWill.tokens.reduce(
                        (cur, adr) => Object.assign(cur, { [adr]: true }),
                        {}
                    )
                );
                setIsEditing(false);
            },
            (errText) => {
                setSaveLoading(false);
            }
        );
    }

    const onRenounceWill = () => {
        renounceWill(
            {
                currentNetworkObject: networks[currentNetwork],
                currentAccount: accounts[currentAccountIndex],
            },
            () => {
                setRemoveLoading(true);
            },
            () => {
                setRemoveLoading(false);
                setCurrentWill(undefined);
                setIsEditing(false);
                setHasWill(false);
            },
            () => {
                setRemoveLoading(false);
            }
        );
    }

    const renderCreateWillPanel = () => {
        return <>

            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>Recepient Address</Text>
                <Text style={{
                    marginTop: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>This is the address where you save all your crypto-currencies when your account is dead.</Text>
                <Text style={{
                    marginTop: 24,
                    color: colors.grey9,
                    ...fonts.BODY_T4
                }}>Recepient Address</Text>
                <FloatLabelInput
                    style={{ marginTop: 8 }}
                    value={sendAddress}
                    label="Recepient Address"
                    onChangeText={value => {
                        setSendAddress(value);
                        setError({ ...error, sendAddress: '' });
                    }}
                />
                {error.sendAddress.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 16,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.sendAddress}
                    </Text>
                )}
            </View>
            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>Period</Text>
                <Text style={{
                    marginTop: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>After this period (in days) sice there is no action or change in your account ,then all of your crypto-currencies will be moved to recepient's account.</Text>
                <Text style={{
                    marginTop: 24,
                    color: colors.grey9,
                    ...fonts.BODY_T4
                }}>Period (in days)</Text>
                <FloatLabelInput
                    style={{ marginTop: 8 }}
                    value={period}
                    label="Period"
                    onChangeText={value => {
                        setPeriod(value);
                        setError({ ...error, period: '' });
                    }}
                />
                {error.period.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 16,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.period}
                    </Text>
                )}
            </View>
            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>Tokens</Text>
                <Text style={{
                    marginTop: 8,
                    marginBottom: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>Which tokens do you want to add to your will.Only the tokens added to your will list will be sent to the testator</Text>
                {tokensList.map(token => <CheckBox
                    key={token.tokenAddress}
                    style={{
                        paddingTop: 8,
                        paddingLeft: 12
                    }}
                    checkedCheckBoxColor={colors.primary5}
                    checkBoxColor={colors.grey13}
                    isChecked={willTokenList[token.tokenAddress] ? true : false}
                    onClick={() => {
                        let temp = Object.assign({}, willTokenList);
                        let value = willTokenList[token.tokenAddress] ? false : true;
                        if (value) {
                            temp[token.tokenAddress] = true;
                        } else {
                            delete temp[token.tokenAddress];
                        }
                        setWillTokenList(temp);
                    }}
                    rightText={token.tokenSymbol}
                    rightTextStyle={{
                        color: 'white'
                    }}
                />)}
                {tokensList.length == 0 &&
                    <View style={{
                        paddingBottom: 20
                    }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>
                            There is no token for will.
                        </Text>
                    </View>
                }
                {error.willTokenList.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 8,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.willTokenList}
                    </Text>
                )}
            </View>
            <PrimaryButton
                text="Add Will"
                textColor='white'
                onPress={() => { onSaveWill(); }}
                enableFlag={sendAddress.length > 0 && period.length > 0}
                loading={saveLoading}
                style={{
                    marginTop: 40
                }} />
        </>
    }

    const renderEditWillPanel = () => {
        return <>

            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>Recepient Address</Text>
                <Text style={{
                    marginTop: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>This is the address where you save all your crypto-currencies when your account is dead.</Text>
                {!isEditing ? (
                    <>
                        {currentWill && (
                            <Text
                                style={{
                                    marginTop: 20,
                                    ...fonts.title2,
                                    color: colors.PRIMARY_P1,
                                }}
                            >
                                {currentWill.testator}
                            </Text>
                        )}
                    </>
                ) : (
                    <>
                        <Text style={{
                            marginTop: 24,
                            color: colors.grey9,
                            ...fonts.BODY_T4
                        }}>Recepient Address</Text>
                        <FloatLabelInput
                            style={{ marginTop: 8 }}
                            value={sendAddress}
                            label="Recepient Address"
                            onChangeText={value => {
                                setSendAddress(value);
                                setError({ ...error, sendAddress: '' });
                            }}
                        />
                    </>
                )}
                {error.sendAddress.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 16,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.sendAddress}
                    </Text>
                )}
            </View>
            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>{!isEditing ? "Time" : "Period"}</Text>
                <Text style={{
                    marginTop: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>{isEditing ? "After this period (in days) sice there is no action or change in your account ,then all of your crypto-currencies will be moved to recepient's account." : "Which tokens do you want to add to your will.Only the tokens added to your will list will be sent to the testator"}</Text>
                {!isEditing ? (
                    <>
                        {currentWill && (
                            <Text
                                style={{
                                    marginTop: 20,
                                    ...fonts.title2,
                                    color: colors.PRIMARY_P1,
                                }}
                            >
                                {'After ' +
                                    moment(
                                        new Date(
                                            (currentWill.fromTime.toNumber() +
                                                currentWill.afterTime.toNumber()) *
                                            1000
                                        ).valueOf()
                                    )
                                        .format('MMM DD, YYYY [at] hh:mm a')
                                        .toString()}
                            </Text>
                        )}
                    </>
                ) : (
                    <>
                        <Text style={{
                            marginTop: 24,
                            color: colors.grey9,
                            ...fonts.BODY_T4
                        }}>Period (in days)</Text>
                        <FloatLabelInput
                            style={{ marginTop: 8 }}
                            value={period}
                            label="Period"
                            onChangeText={value => {
                                setPeriod(value);
                                setError({ ...error, period: '' });
                            }}
                        />
                    </>
                )}
                {error.period.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 16,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.period}
                    </Text>
                )}
            </View>
            <View style={{
                marginTop: 24,
                padding: 20,
                backgroundColor: colors.BG
            }}>
                <Text style={{
                    color: 'white', ...fonts.title1
                }}>Tokens</Text>
                <Text style={{
                    marginTop: 8,
                    marginBottom: 8,
                    color: 'grey',
                    ...fonts.BODY_T4
                }}>Which tokens do you want to add to your will.Only the tokens added to your will list will be sent to the testator</Text>
                {!isEditing ? (
                    <>
                        {currentWill && (
                            tokensList.map(token => {
                                if (currentWill.willTokenList[token.tokenAddress]) {
                                    return <Text key={token.tokenAddress}>
                                        <Text style={{
                                            color: colors.PRIMARY_P1,
                                            ...fonts.title2,
                                            fontWeight: '900'
                                        }}>
                                            {token.tokenAddress}
                                        </Text>
                                        <Text style={{ color: 'transparent' }}>A</Text>
                                        <Text style={{
                                            marginLeft: 8,
                                            color: 'white',
                                            ...fonts.title2,
                                        }}>
                                            {token.tokenSymbol}
                                        </Text>
                                    </Text>
                                } else {
                                    return <></>
                                }
                            })
                        )}
                    </>
                ) : (
                    tokensList.map(token => <CheckBox
                        key={token.tokenAddress}
                        style={{
                            paddingTop: 8,
                            paddingLeft: 12
                        }}
                        checkedCheckBoxColor={colors.primary5}
                        checkBoxColor={colors.grey13}
                        isChecked={isEditing
                            ? willTokenList && willTokenList[token.tokenAddress]
                                ? true
                                : false
                            : currentWill &&
                                currentWill.willTokenList[token.tokenAddress]
                                ? true
                                : false}
                        onClick={() => {
                            let temp = Object.assign({}, willTokenList);
                            let value = isEditing
                                ? willTokenList && willTokenList[token.tokenAddress]
                                    ? true
                                    : false
                                : currentWill &&
                                    currentWill.willTokenList[token.tokenAddress]
                                    ? true
                                    : false;
                            if (!value) {
                                temp[token.tokenAddress] = true;
                            } else {
                                delete temp[token.tokenAddress];
                            }
                            setWillTokenList(temp);
                        }}
                        rightText={token.tokenSymbol}
                        rightTextStyle={{
                            color: 'white'
                        }}
                    />)
                )}

                {tokensList.length == 0 &&
                    <View style={{
                        paddingBottom: 20
                    }}>
                        <Text style={{
                            color: 'white',
                            ...fonts.title2
                        }}>
                            There is no token for will.
                        </Text>
                    </View>
                }
                {error.willTokenList.length > 0 && (
                    <Text
                        style={{
                            paddingTop: 8,
                            paddingLeft: 8,
                            ...fonts.caption_small12_16_regular,
                            color: colors.red5,
                        }}>
                        {error.willTokenList}
                    </Text>
                )}
            </View>
            <PrimaryButton
                textColor='white'
                text={isEditing ? 'Save Will' : 'Edit Will'}
                enableFlag={
                    isEditing ? sendAddress.length > 0 && period.length > 0 : true
                }
                onPress={() => {
                    if (!isEditing) {
                        setIsEditing(true);
                        setSendAddress('');
                        setPeriod('');
                    } else {
                        onSaveWill();
                    }
                }}
                loading={isEditing ? saveLoading : false}
                style={{
                    marginTop: 40
                }} />
            <SecondaryButton
                style={{
                    marginTop: 12
                }}
                text={!isEditing ? "Renounce Will" : "Cancel"}
                loading={!isEditing ? removeLoading : false}
                onPress={() => {
                    if (!isEditing) {
                        onRenounceWill()
                    } else {
                        setIsEditing(false);
                    }
                }}
            />
        </>
    }

    return <View style={{
        paddingHorizontal: 20,
        paddingBottom: 40
    }}>
        {loading ? <View style={{
            height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <ActivityIndicator color={colors.primary5} size={50} />
        </View> :
            isWillSet ?
                hasWill ? renderEditWillPanel() : renderCreateWillPanel()
                : <View style={{
                    marginTop: 48,
                    padding: 24,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: 'white',
                        ...fonts.HEADINGS_H2
                    }}>Will is not set up.</Text>
                </View>
        }
    </View >
}

const mapStateToProps = state => ({
    accounts: state.accounts.accounts,
    currentAccountIndex: state.accounts.currentAccountIndex,
    networks: state.networks.networks,
    currentNetwork: state.networks.currentNetwork,
    tokens: state.tokens.tokensData,
});
const mapDispatchToProps = dispatch => ({
    setWillInfo: (data) => setWillInfo(dispatch, data),
    addWill: (data, beforeWork, successCallback, failCallback) =>
        addWill(dispatch, data, beforeWork, successCallback, failCallback),
    renounceWill: (data, beforeWork, successCallback, failCallback) =>
        renounceWill(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(WillTab);