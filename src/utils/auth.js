import AsyncStorage from '@react-native-async-storage/async-storage';
import crypto from 'crypto'; // eslint-disable-line import/no-nodejs-modules, no-unused-vars
import bcrypt from 'bcrypt-react-native';
import constants from '../constants';

export const checkAuthentication = (
  password,
  successCallback,
  failCallback,
  errorCallback,
) => {
  AsyncStorage.getItem('password')
    .then(savedPassword => {
      bcrypt
        .compareSync(password, savedPassword)
        .then(res => {
          if (res) {
            successCallback();
          } else {
            failCallback();
          }
        })
        .catch(err => {
          console.log('Auth Utils: ERROR!!!!!!!: ', err);
          errorCallback();
        });
    })
    .catch(err => {
      console.log('Auth Utils: ERROR!!!!!!!: ', err);
      errorCallback();
    });
};

export const changePassword = (password, successCallback, errorCallback) => {
  bcrypt
    .getSalt(constants.saltRound)
    .then(salt => {
      bcrypt
        .hash(salt, password)
        .then(hash => {
          AsyncStorage.setItem('password', hash)
            .then(() => {
              successCallback();
            })
            .catch(err => {
              console.log('change password err: ', err);
              errorCallback();
            });
        })
        .catch(err => {
          console.log('Change Password error: ', err);
          errorCallback();
        });
    })
    .catch(err => {
      console.log('Change password error: ', err);
      errorCallback();
    });
};

export const saveRememberOption = (
  rememberMe,
  successCallback,
  errorCallback,
) => {
  AsyncStorage.setItem('remember_me', rememberMe)
    .then(() => {
      successCallback();
    })
    .catch(err => {
      console.log('Auth Utils: ERROR!!!!!: ', err);
      errorCallback();
    });
};
