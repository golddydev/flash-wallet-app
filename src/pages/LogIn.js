import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { colors, fonts } from '../styles';
import FloatLabelInput from '../components/FloatLabelInput';
import { PrimaryButton, TextButton } from '../components/Buttons';
import ToggleSwitch from 'toggle-switch-react-native';
import { checkAuthentication, saveRememberOption } from '../utils/auth';

//import actions
import { loadAccountsDataFromStorage } from '../redux/actions/AccountsActions';
import { loadNetworksDataFromStorage } from '../redux/actions/NetworkActions';
import { loadTokensDataFromStorage } from '../redux/actions/TokensActions';
import { loadSettingsDataFromStorage } from '../redux/actions/SettingsAction';
import { loadNftBalancesInfo } from '../redux/actions/NftBalanceActions';
import { loadDeadFunctionInfo } from '../redux/actions/DeadFunctionActions';
import CustomKeyboardView from '../components/CustomKeyboardView';
import CustomTextInput from '../components/CustomTextInput';
import { SvgXml } from 'react-native-svg';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const mainImage = require('../assets/images/through/image5.png');

const LogIn = ({
  navigation,
  loadAccountsDataFromStorage,
  loadNetworksDataFromStorage,
  loadTokensDataFromStorage,
  loadSettingsDataFromStorage,
  loadNftBalancesInfo,
  loadDeadFunctionInfo,
}) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { }, []);

  const onPressLogIn = () => {
    setIsLoading(true);
    checkAuthentication(
      password,
      () => {
        saveRememberOption(
          rememberMe ? 'true' : 'false',
          () => {
            setIsLoading(false);
            loadAccountsDataFromStorage();
            loadNetworksDataFromStorage();
            loadTokensDataFromStorage();
            loadSettingsDataFromStorage();
            loadNftBalancesInfo();
            loadDeadFunctionInfo();
            navigation.replace('walletscreen');
          },
          () => {
            setIsLoading(false);
            console.log('Something went wrong in login save rememberme');
          },
        );
      },
      () => {
        setIsLoading(false);
        setError('Password is wrong.');
      },
      () => {
        setIsLoading(false);
        console.log('Something went wrong in login');
      },
    );
  };

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.replace('through');
    // }, 3000);
    return () => { };
  });

  return (
    <CustomKeyboardView>
      <View style={{
        height: '100%',
        width: '100%',
        backgroundColor: colors.BG,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={mainImage} style={{
              width: 100, height: 100
            }} />
          </View>
          <Text style={{
            marginTop: 32,
            color: 'white',
            ...fonts.HEADINGS_H1,
            textAlign: 'center'
          }}>FLASH<Text style={{ color: colors.PRIMARY_P1 }}>WALLET</Text></Text>
          <Text style={{
            marginTop: 32,
            color: 'white',
            ...fonts.BODY_T1,
            textAlign: 'center'
          }}>Welcome Back!</Text>
          <View style={{ marginTop: 48, width: '100%' }}>
            <CustomTextInput
              isPassword
              style={{
                borderRadius: 8,
                borderColor: error.length > 0 ? colors.red5 : colors.grey22,
                backgroundColor: colors.P3,
                padding: 12
              }}
              rightElement={
                <SvgXml xml={fonts.fingerPrintSvgXml} />
              }
              onChangeText={value => {
                setError('');
                setPassword(value);
              }}
              value={password}
              placeholder="Password"
            />
            {error.length > 0 && (
              <Text
                style={{
                  paddingLeft: 16,
                  ...fonts.caption_small12_16_regular,
                  color: colors.red5,
                }}>
                {error}
              </Text>
            )}
          </View>
          <Text style={{
            marginTop: 20,
            marginLeft: 12,
            color: 'white',
            ...fonts.BODY_T2
          }}>Signin with Biometrics?</Text>
          <View style={{
            marginTop: 48,
            marginHorizontal: 6
          }}>
            <PrimaryButton
              textColor='white'
              text={'Log In'}
              loading={isLoading}
              onPress={onPressLogIn}
            />
          </View>
          <Text style={{
            marginHorizontal: 8,
            marginTop: 48,
            color: 'white',
            ...fonts.BODY_T2,
            textAlign: 'center'
          }}>
            Can't login? You can ERASE your current wallet and setup a new one.
          </Text>
          <View style={{ marginTop: 50 }}>
            <TextButton
              fontWeight='bold'
              text={'Reset Wallet'}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  loadAccountsDataFromStorage: () => loadAccountsDataFromStorage(dispatch),
  loadNetworksDataFromStorage: () => loadNetworksDataFromStorage(dispatch),
  loadTokensDataFromStorage: () => loadTokensDataFromStorage(dispatch),
  loadSettingsDataFromStorage: () => loadSettingsDataFromStorage(dispatch),
  loadNftBalancesInfo: () => loadNftBalancesInfo(dispatch),
  loadDeadFunctionInfo: () => loadDeadFunctionInfo(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
