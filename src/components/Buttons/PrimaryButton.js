import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors, commonStyles, fonts } from '../../styles';

const PrimaryButton = ({
  onPress,
  enableFlag,
  text,
  icon,
  icon2,
  loading,
  textColor = "black",
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
        { flexDirection: 'row' },
        backgroundDisabled
          ? commonStyles.disabledButton
          : commonStyles.primaryButton,
        rest.style ? rest.style : {},
      )}
      onPress={onPress}
      disabled={backgroundDisabled}>
      {icon ? icon : <></>}
      {((typeof loading === 'boolean' && !loading) ||
        typeof loading !== 'boolean') && (
          <Text
            style={{
              ...fonts.btn_large_normal,
              fontWeight: 'bold',
              color:
                typeof enableFlag === 'boolean'
                  ? enableFlag
                    ? textColor
                    : colors.grey18
                  : textColor,
            }}>
            {text}
          </Text>
        )}
      {typeof loading === 'boolean' && loading && (
        <ActivityIndicator size={'small'} color={colors.PRIMARY_P1} />
      )}
      {icon2 ? icon2 : <></>}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
