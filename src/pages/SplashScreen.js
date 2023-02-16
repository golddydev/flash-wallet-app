import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { PrimaryButton } from '../components/Buttons';

const splashImage = require('../assets/images/splash/splash.png')

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.replace('through');
    // }, 3000);
    return () => { };
  });

  const nextSplash = async () => {
    const savedPassword = await AsyncStorage.getItem('password');
    const rememberMe = await AsyncStorage.getItem('remember_me');
    if (rememberMe === 'true') {
      navigation.replace('walletscreen');
      return;
    }
    if (savedPassword) {
      navigation.replace('login');
    } else {
      navigation.replace('through');
    }
  };

  return (
    <CustomKeyboardView>
      <View style={{
        height: '100%',
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}>
        <View style={{ height: '100%', width: '100%' }}>
          <View style={{
            height: '90%',
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}>
            <Image source={splashImage} style={{ marginLeft: 50 }} />
          </View>
          <PrimaryButton
            textColor='white'
            onPress={nextSplash}
            text={"Continue"}
            style={{
              marginTop: -50,
              borderRadius: 100,
              marginLeft: '5%',
              width: '90%'
            }}
          />
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SplashScreen;
