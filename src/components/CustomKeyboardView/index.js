import React from 'react'
import { SafeAreaView, Dimensions, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from '../../styles';

const screenHeight = Dimensions.get('screen').height - StatusBar.currentHeight || 24;

const CustomKeyboardView = ({ children, keyboardAwareScrollViewProps = {}, offset = 0, style, ...rest }) => {
    return <KeyboardAwareScrollView
        style={{ backgroundColor: colors.grey24, }} {...keyboardAwareScrollViewProps}>
        <SafeAreaView
            style={{
                height: screenHeight - offset,
                ...(style || {})
            }}
            {...rest} >
            {children}
        </SafeAreaView>
    </KeyboardAwareScrollView>
}

export default CustomKeyboardView