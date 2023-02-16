import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import {colors, fonts} from '../../../../styles';
import {PrimaryButton, SecondaryButton} from '../../../../components/Buttons';
import FloatLabelInput from '../../../../components/FloatLabelInput';

import {passwordStrength} from 'check-password-strength';

import Constants from '../../../../constants';
import {changePassword, checkAuthentication} from '../../../../utils/auth';
const passwordStrengthCheckOption = Constants.passwordStrengthCheckOption;
const passwordLevelColor = Constants.passwordLevelColor;

const ChangePasswordRBSheet = ({onSuccess}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [canPass, setCanPass] = useState(false);
  const [passwordStrengthLabel, setPasswordStrengthLabel] =
    useState('No Password');
  const [createPasswordModalVisible, setCreatePasswordModalVisible] =
    useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState('confirm');
  const [confirmError, setConfirmError] = useState('');
  const [error, setError] = useState('');

  const checkCanPass = data => {
    if (!data.password) {
      setCanPass(false);
      return;
    }
    if (!data.passwordConfirm) {
      setCanPass(false);
      return;
    }
    setCanPass(true);
  };

  const confirmPassword = () => {
    setConfirmLoading(true);
    checkAuthentication(
      currentPassword,
      () => {
        setConfirmLoading(false);
        setStep('set');
      },
      () => {
        setConfirmLoading(false);
        setConfirmError('Password is not correct.');
      },
      () => {
        setConfirmLoading(false);
        setConfirmError('Something went wrong.');
      },
    );
  };

  const onChangePassword = () => {
    setLoading(true);
    changePassword(
      password,
      () => {
        setLoading(false);
        onSuccess();
      },
      () => {
        setLoading(false);
        setError('Something is wrong.');
      },
    );
  };

  const renderConfirmStep = () => {
    return (
      <View style={{paddingHorizontal: 24, height: '100%'}}>
        <View>
          <Text
            style={{
              marginTop: 12,
              ...fonts.title2,
              color: 'white',
              textAlign: 'center',
            }}>
            Confirm password
          </Text>
          <View style={{marginTop: 60}}>
            <FloatLabelInput
              label={'Current Password'}
              isPassword
              value={currentPassword}
              onChangeText={value => {
                setCurrentPassword(value);
                if (confirmError.length > 0) [setConfirmError('')];
              }}
            />
            {confirmError.length > 0 && (
              <Text
                style={{
                  paddingLeft: 16,
                  marginTop: 12,
                  ...fonts.caption_small12_16_regular,
                  color: colors.red5,
                }}>
                {confirmError}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{flexDirection: 'column-reverse', marginBottom: 80, flex: 1}}>
          <PrimaryButton
            text="Confirm"
            onPress={() => {
              confirmPassword();
            }}
            enableFlag={currentPassword.length > 0}
            loading={confirmLoading}
          />
        </View>
      </View>
    );
  };

  const renderSetStep = () => {
    return (
      <>
        <View style={{paddingHorizontal: 24}}>
          <Modal
            isVisible={createPasswordModalVisible}
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 24,
                borderRadius: 12,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                <Text style={{...fonts.title2}}>Password is not strong.</Text>
                {'\n'}Are you sure you want to use this passord?
              </Text>
              <View
                style={{
                  marginTop: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <PrimaryButton
                  enableFlag={!loading}
                  onPress={() => {
                    setCreatePasswordModalVisible(false);
                  }}
                  text={'No, try again.'}
                />
                <SecondaryButton
                  onPress={() => {
                    onChangePassword();
                  }}
                  style={{width: 200}}
                  text="Yes, I am sure."
                  loading={loading}
                />
              </View>
            </View>
          </Modal>
          <Text
            style={{
              marginTop: 12,
              color: 'white',
              ...fonts.title2,
              textAlign: 'center',
            }}>
            Change Password
          </Text>
          <View style={{marginBottom: 24, marginTop: 24}}>
            <FloatLabelInput
              label={'New Password'}
              isPassword
              value={password}
              onChangeText={value => {
                setPassword(value);
                checkCanPass({password: value, passwordConfirm});
                setPasswordStrengthLabel(
                  passwordStrength(value, passwordStrengthCheckOption).value,
                );
              }}
            />
            {password.length > 0 && (
              <>
                <Text
                  style={{
                    paddingLeft: 16,
                    ...fonts.caption_small12_16_regular,
                    color: colors.grey12,
                  }}>
                  Password strength:{' '}
                  <Text
                    style={{color: passwordLevelColor[passwordStrengthLabel]}}>
                    {passwordStrengthLabel}
                  </Text>
                </Text>
                {password.length < 8 && (
                  <Text
                    style={{
                      paddingLeft: 16,
                      paddingTop: 4,
                      ...fonts.caption_small12_16_regular,
                      color: colors.grey12,
                    }}>
                    Must be at least 8 characters.
                  </Text>
                )}
              </>
            )}
          </View>
          <View style={{marginBottom: 24}}>
            <FloatLabelInput
              label={'Confirm Password'}
              isPassword
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                checkCanPass({password, passwordConfirm: value});
              }}
            />
            {passwordConfirm.length > 0 && (
              <Text
                style={{
                  paddingLeft: 16,
                  ...fonts.caption_small12_16_regular,
                  color:
                    password === passwordConfirm
                      ? colors.green5
                      : colors.grey12,
                }}>
                {password === passwordConfirm
                  ? 'Password matched. '
                  : 'Password must match. '}
                {password === passwordConfirm && (
                  <FontAwesome
                    style={{
                      fontSize: 12,
                      color: colors.green5,
                      marginLeft: 12,
                    }}
                    icon={SolidIcons.check}
                  />
                )}
              </Text>
            )}
          </View>
          {error.length > 0 && (
            <Text
              style={{
                paddingLeft: 16,
                marginTop: 24,
                ...fonts.caption_small12_16_regular,
                color: colors.red5,
              }}>
              {error}
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 60,
            marginHorizontal: 24,
          }}>
          <SecondaryButton
            enableFlag={canPass}
            onPress={() => {
              if (
                passwordStrength(password, passwordStrengthCheckOption).id < 2
              ) {
                setCreatePasswordModalVisible(true);
                return;
              } else {
                onChangePassword();
              }
            }}
            text="Change"
            loading={loading}
          />
        </View>
      </>
    );
  };

  return (
    <>
      {step === 'confirm' && renderConfirmStep()}
      {step === 'set' && renderSetStep()}
    </>
  );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  createWallet: (data, beforeWork, successCallback, failCallback) =>
    createWallet(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordRBSheet);
