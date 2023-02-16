import React from 'react';

import CustomKeyboardView from '../../components/CustomKeyboardView';
import BottomNavigator from './BottomNavigator';
import BrowserTab from './BrowserTab/BrowserTab';

const BrowserScreen = ({
    navigation,
}) => {

    return (
        <CustomKeyboardView>
            <BrowserTab navigation={navigation} />
            <BottomNavigator navigation={navigation} state="browserscreen" />
        </CustomKeyboardView>
    );
};

export default BrowserScreen;
