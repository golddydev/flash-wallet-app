import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { colors, fonts } from '../../styles';

const TextButton = ({ onPress, text, icon, fontWeight = 'normal', ...rest }) => {
  return (
    <TouchableOpacity onPress={onPress} style={rest.style ? rest.style : {}}>
      <View
        style={Object.assign({}, {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        })}>
        {icon ? icon : <></>}
        <Text
          style={{
            textAlign: 'center',
            ...fonts.btn_large_normal,
            color: colors.primary5,
            fontWeight: fontWeight
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
