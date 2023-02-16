import React from 'react';
import { Text } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { colors } from '../styles';

const commonInputContainerStyles = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: 'grey',
  paddingHorizontal: 10,
};
const commonInputCustomLabelStyles = {
  colorFocused: 'grey',
  colorBlurred: 'grey',
  fontFamily: 'Poppins',
  fontSize: 12,
  color: 'grey',
  lineHeight: 16,
  letterSpacing: 0,
};
const commonInputInputStyles = {
  color: 'white',
  fontFamily: 'Poppins',
  fontSize: 14,
  color: 'white',
  lineHeight: 24,
  height: 64,
  letterSpacing: 0,
  fontWeight: 'bold',
};

const FloatLabelInput = ({ label, isPassword, value, onChangeText, showTopLabel = false, showAsterisk = false, topLabel = "", ...rest }) => {
  return (<>
    {showTopLabel &&
      <Text style={{ color: 'white', marginLeft: -12, marginBottom: 8 }}>
        {`${topLabel || "No Text"} `}{
          showAsterisk && <Text style={{ color: colors.red5 }}>*</Text>
        }
      </Text>}
    <FloatingLabelInput
      label={label}
      isPassword={isPassword}
      value={value}
      onChangeText={onChangeText}
      containerStyles={Object.assign(
        {},
        commonInputContainerStyles,
        rest.style,
      )}
      customLabelStyles={commonInputCustomLabelStyles}
      inputStyles={rest.inputStyles ? rest.inputStyles : commonInputInputStyles}
      {...rest}
    />
  </>
  );
};

export default FloatLabelInput;
