import React from 'react';

import SettingsTab from './SettingsTab/SettingsTab';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import BottomNavigator from './BottomNavigator';

const SettingScreen = ({
    navigation,
}) => {

    return (
        <CustomKeyboardView>
            <SettingsTab navigation={navigation} />
            <BottomNavigator navigation={navigation} state="settingscreen" />
        </CustomKeyboardView>
    );
};

export default SettingScreen;
