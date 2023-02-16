import React from 'react';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import BottomNavigator from './BottomNavigator';
import DeadFunctionTab from './DeadFunctionTab/DeadFunctionTab';

const DeadFunctionScreen = ({
    navigation,
}) => {

    return (
        <CustomKeyboardView>
            <DeadFunctionTab navigation={navigation} />
            <BottomNavigator navigation={navigation} state="deadscreen" />
        </CustomKeyboardView>
    );
};


export default DeadFunctionScreen;
