import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../styles'
import FontAwesome, { SolidIcons, BrandIcons, RegularIcons } from 'react-native-fontawesome';
import { SvgXml } from 'react-native-svg';

const BottomNavigator = ({
    state, navigation
}) => {
    return <View style={{
        backgroundColor: colors.P3 + 'B2',
        paddingVertical: 18,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'walletscreen') {
                navigation.navigate('walletscreen')
            }
        }}>
            <FontAwesome
                style={{
                    fontSize: 18,
                    color: state === 'walletscreen' ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={SolidIcons.wallet}
            />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'browserscreen') {
                navigation.navigate('browserscreen')
            }
        }}>
            <FontAwesome
                style={{
                    fontSize: 18,
                    color: state === 'browserscreen' ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={BrandIcons.chrome}
            />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'credit') {
            }
        }}>
            <FontAwesome
                style={{
                    fontSize: 18,
                    color: state === 'credit' ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={RegularIcons.creditCard}
            />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'history') {
            }
        }}>
            <FontAwesome
                style={{
                    fontSize: 18,
                    color: state === 'history' ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={SolidIcons.history}
            />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'deadscreen') {
                navigation.navigate('deadscreen')
            }
        }}>
            <SvgXml xml={fonts.deadFunctionSvgXml} width={24} height={24} fill={state === 'deadscreen' ? colors.PRIMARY_P1 : colors.grey9} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
            if (state !== 'settingscreen') {
                navigation.navigate('settingscreen')
            }
        }}>
            <FontAwesome
                style={{
                    fontSize: 18,
                    color: state === 'settingscreen' ? colors.PRIMARY_P1 : colors.grey9,
                }}
                icon={SolidIcons.cog}
            />
        </TouchableOpacity>
    </View>
}

export default BottomNavigator;