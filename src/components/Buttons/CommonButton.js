import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { fonts } from '../../styles';

const CommonButton = ({
    onPress,
    enableFlag,
    text,
    icon,
    icon2,
    loading,
    ...rest
}) => {
    const backgroundDisabled =
        (typeof enableFlag === 'boolean' && !enableFlag) ||
        (typeof loading === 'boolean' && loading) ||
        false;
    return (
        <TouchableOpacity
            style={Object.assign(
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 8,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                },
                rest.style ? rest.style : {},
                backgroundDisabled
                    ? { opacity: 0.5 } : {}
            )}
            onPress={onPress}
            disabled={backgroundDisabled}>
            {icon ? icon : <></>}
            {!loading && (
                <Text
                    style={{
                        ...fonts.BODY_CAPTION,
                        color:
                            typeof enableFlag === 'boolean'
                                ? enableFlag
                                    ? 'white'
                                    : 'grey'
                                : 'white'
                    }}>
                    {text}
                </Text>
            )}
            {loading && <ActivityIndicator size={'small'} color={'white'} />}
            {icon2 ? icon2 : <></>}
        </TouchableOpacity>
    );
};

export default CommonButton;
