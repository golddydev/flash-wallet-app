import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import { PrimaryButton } from '../../../components/Buttons';
import { fonts, colors } from '../../../styles';

// import components
import WillTab from './WillTab';
import LegacyTab from './LegacyTab'

const Header = ({ onBack, state, onStateChange }) => {
    return <View style={{ paddingTop: 40, backgroundColor: colors.BG }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <TouchableOpacity onPress={onBack}>
                <FontAwesome
                    style={{ paddingLeft: 8, fontSize: 16, color: 'white' }}
                    icon={SolidIcons.chevronLeft}
                /></TouchableOpacity>
            <View style={{
                flex: 1,
                alignItems: 'center', marginLeft: -24
            }}>
                <Text style={{ ...fonts.title2, color: 'white', }}>Set Dead Function</Text>
            </View>

        </View>
        <View style={{
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 18
        }}>
            {state === 'will' ? <PrimaryButton style={{ width: '40%' }} text="Will" /> : <TouchableOpacity style={{ width: '40%', alignItems: 'center' }} onPress={() => {
                onStateChange('will')
            }}>
                <Text style={{ color: 'grey', ...fonts.title2 }}>Will</Text>
            </TouchableOpacity>}
            {state === 'legacy' ? <PrimaryButton style={{ width: '40%' }} text="Legacy" /> : <TouchableOpacity style={{ width: '40%', alignItems: 'center' }} onPress={() => {
                onStateChange('legacy')
            }}>
                <Text style={{ color: 'grey', ...fonts.title2 }}>Legacy</Text>
            </TouchableOpacity>}
        </View>
    </View>
}

const DeadFunctionTab = ({
    navigation,
}) => {
    const [currentState, setCurrentState] = useState('will');

    return (
        <ScrollView style={{
            backgroundColor: colors.P3,
        }}>
            <Header onBack={() => navigation.goBack()} state={currentState} onStateChange={setCurrentState} />
            {currentState === 'will' && <WillTab />}
            {currentState === 'legacy' && <LegacyTab navigation={navigation} />}
        </ScrollView>
    );
};


export default DeadFunctionTab;
