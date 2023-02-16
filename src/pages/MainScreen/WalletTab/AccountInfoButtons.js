import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

// import styls
import { fonts, colors } from '../../../styles'
import { SvgXml } from 'react-native-svg';
import { CommonButton } from '../../../components/Buttons';

const stakingButtonImage = require('../../../assets/images/wallettab/staking.png');
const cashButtonImage = require('../../../assets/images/wallettab/cash.png');

const AccountInfoButtons = ({
    navigation,
    accounts,
    currentAccountIndex,
    networks,
    currentNetwork,
    onSend,
    onReceive,
    onBuy,
    onSwap,
    showFlags = {}
}) => {
    const [show, setShow] = useState(true)

    const renderTopButton = ({ icon, text, onPress }) => {
        return <TouchableOpacity style={{ marginHorizontal: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={onPress} style={{ backgroundColor: colors.P3, padding: 14, borderRadius: 6 }}>
                {icon}
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: 8, ...fonts.BODY_T3, color: 'white' }}>{text}</Text>
        </TouchableOpacity>
    }

    return (
        <>
            <View style={{ paddingHorizontal: 24, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{
                            ...fonts.BODY_CAPTION, color: 'white', marginRight: 8
                        }}>
                            Total Amount
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setShow(!show)
                        }}>
                            <SvgXml xml={fonts.eyeSvgXml} width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                    {show && <>
                        <Text style={{
                            ...fonts.HEADINGS_H2,
                            color: colors.PRIMARY_P1,
                            paddingVertical: 10
                        }}>7 500$</Text>
                        <CommonButton text={"Dead Function"} style={{ backgroundColor: '#FBBF0455', borderRadius: 12 }} icon={<SvgXml xml={fonts.deadFunctionSvgXml} style={{ marginRight: 8 }} width={16} height={16} fill={colors.grey9} />} />
                    </>}
                </View>
                {show && <View>
                    <SvgXml xml={fonts.qrCodeBigSvgXml} />
                    <Text style={{
                        ...fonts.BODY_CAPTION,
                        color: 'white',
                        marginTop: 8
                    }}>Scan &amp; Pay</Text>
                </View>}
            </View>

            <View style={{ marginTop: 24, paddingHorizontal: 6, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {showFlags.send && renderTopButton({ icon: <SvgXml xml={fonts.topSendButtonSvgXml} />, text: "Send", onPress: onSend })}
                {showFlags.receive && renderTopButton({ icon: <SvgXml xml={fonts.topReceiveButtonSvgXml} />, text: "Receive", onPress: onReceive })}
                {showFlags.buy && renderTopButton({ icon: <SvgXml xml={fonts.topBuyButtonSvgXml} />, text: "Buy", onPress: onBuy })}
                {showFlags.swap && renderTopButton({ icon: <SvgXml xml={fonts.topSwapButtonSvgXml} />, text: "Swap", onPress: onSwap })}
                {showFlags.staking && renderTopButton({ icon: <Image source={stakingButtonImage} />, text: "Staking" })}
                {showFlags.cash && renderTopButton({ icon: <Image source={cashButtonImage} />, text: "Cash" })}
            </View>
        </>
    );
};

const mapStateToProps = state => ({
    accounts: state.accounts.accounts,
    currentAccountIndex: state.accounts.currentAccountIndex,
    networks: state.networks.networks,
    currentNetwork: state.networks.currentNetwork,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoButtons);
