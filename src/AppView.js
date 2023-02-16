import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import CustomToast from './components/CustomToast';
import Navigator from './navigation/Navigator';
import * as RootNavigation from './navigation/RootNavigation';

const AppView = props => {
  const autoLockTime = parseInt(props.settingsInfo.autoLockTime.value);
  let backgroundTime = Date.now();
  let beforeState = '';

  useEffect(() => {
    AppState.removeEventListener('change');
    AppState.addEventListener('change', handleStateChange);
    return () => {
      AppState.removeEventListener('change', handleStateChange);
    };
  }, [autoLockTime]);

  const handleStateChange = nextAppState => {
    if (nextAppState == 'inactive') {
      beforeState = 'inactive';
      backgroundTime = Date.now();
    } else if (nextAppState == 'background') {
      beforeState = 'background';
      backgroundTime = Date.now();
    } else if (nextAppState == 'active') {
      if (beforeState == 'inactive' || beforeState == 'background') {
        console.log(Date.now() - backgroundTime, autoLockTime);
        if (autoLockTime * 1000 <= Date.now() - backgroundTime) {
          console.log('Lock Lock Lock!!!!!');
          AsyncStorage.getItem('password').then(password => {
            if (password) {
              RootNavigation.navigate('login');
            }
          })
        }
      }
      beforeState = 'active';
    }
  };
  return (
    <>
      <Navigator
        onNavigationStateChange={() => { }}
        uriPrefix="/app"
        props={props}
      />
      <CustomToast />
    </>
  );
};

const mapStateToProps = state => ({
  settingsInfo: state.settings,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
