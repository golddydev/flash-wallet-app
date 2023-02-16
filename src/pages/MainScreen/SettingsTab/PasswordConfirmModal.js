import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons';
import FloatLabelInput from '../../../components/FloatLabelInput';
import {fonts, colors} from '../../../styles';
import {checkAuthentication} from '../../../utils/auth';

const PasswordConfirmModal = ({onSuccess, onCancel}) => {
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onConfirm = () => {
    setLoading(true);
    checkAuthentication(
      password,
      () => {
        setLoading(true);
        if (typeof onSuccess == 'function') {
          onSuccess();
        }
      },
      () => {
        setLoading(false);
        setError("Password isn't correct.");
      },
      () => {
        setLoading(false);
        setError('Something went wrong.');
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.grey24,
        padding: 24,
        borderRadius: 12,
      }}>
      <Text
        style={{
          marginTop: 12,
          textAlign: 'center',
          ...fonts.title2,
          color: 'white',
        }}>
        Password Confirm
      </Text>
      <View style={{marginTop: 40}}>
        <FloatLabelInput
          value={password}
          onChangeText={value => {
            if (error.length > 0) {
              setError('');
            }
            setPassowrd(value);
          }}
          isPassword
          label={'Password'}
        />
        {error.length > 0 && (
          <Text
            style={{
              paddingLeft: 16,
              marginTop: 8,
              ...fonts.caption_small12_16_regular,
              color: colors.red5,
            }}>
            {error}
          </Text>
        )}
      </View>
      <PrimaryButton
        style={{marginTop: 60}}
        text="Confirm"
        onPress={() => {
          onConfirm();
        }}
        loading={loading}
        enableFlag={password.length > 0}
      />
      <SecondaryButton
        style={{marginTop: 24}}
        text="Cancel"
        onPress={() => {
          onCancel();
        }}
      />
    </View>
  );
};

export default PasswordConfirmModal;
