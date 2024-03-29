import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors, commonStyles, fonts } from '../../styles';

const SecondaryButton = ({
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
        {},
        { flexDirection: 'row', },
        backgroundDisabled
          ? commonStyles.disabledButton
          : commonStyles.secondaryButton,
        rest.style ? rest.style : {},
      )}
      onPress={onPress}
      disabled={backgroundDisabled}>
      {icon ? icon : <></>}
      {!loading && (
        <Text
          style={{
            ...fonts.btn_large_normal,
            fontWeight: 'bold',
            color:
              typeof enableFlag === 'boolean'
                ? enableFlag
                  ? 'white'
                  : colors.grey18
                : 'white',
          }}>
          {text}
        </Text>
      )}
      {loading && <ActivityIndicator size={'small'} color={'white'} />}
      {icon2 ? icon2 : <></>}
    </TouchableOpacity>
  );
};

export default SecondaryButton;
