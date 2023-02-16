import React, {useState, useRef, useEffect} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import ComboBox from '../../../../components/ComboBox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setBaseCurrency,
  setCurrentLanguage,
  setPrivacyCurrency,
  setSearchEngine,
} from '../../../../redux/actions/SettingsAction';

const currencyConversionProps = require('../../../../constants').default
  .currencyConversionProps;
const privacyCurrencyProps = require('../../../../constants').default
  .privacyCurrencyProps;
const languageProps = require('../../../../constants').default.languageProps;
const searchEngineProps = require('../../../../constants').default
  .searchEngineProps;

const GeneralRBSheet = ({
  onPressClose,
  settingsInfo,
  setBaseCurrency,
  setPrivacyCurrency,
  setCurrentLanguage,
  setSearchEngine,
}) => {
  const {baseCurrency, privacyCurrency, currentLanguage} = settingsInfo;
  const currentSearchEngine = settingsInfo.searchEngine;
  const refRBBaseCurrencySheet = useRef(null);
  const refRBLanguageSheet = useRef(null);
  const refRBSearchEngineSheet = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('settings_info').then(res => {
      let data = JSON.parse(res);
      (data.searchEngine = {label: 'DuckDuckGo', value: 'duckduckgo'}),
        // console.log(data);
        AsyncStorage.setItem('settings_info', JSON.stringify(data));
    });
  }, []);

  // console.log(settingsInfo);

  const renderBaseCurrencyRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refRBBaseCurrencySheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <ScrollView style={{height: '100%', marginBottom: 24}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Base Currency
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            {currencyConversionProps.map(currency => {
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setBaseCurrency(currency);
                    refRBBaseCurrencySheet.current.close();
                  }}
                  key={'generalRBSheet_' + currency.value}>
                  <Text style={{...fonts.para_regular, color: 'white'}}>
                    {currency.value + ' - ' + currency.label}
                  </Text>
                  {currency.value === baseCurrency.value && (
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                      <FontAwesome
                        style={{fontSize: 16, color: colors.green5}}
                        icon={RegularIcons.checkCircle}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>
    );
  };

  const renderLanguageRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refRBLanguageSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <ScrollView style={{height: '100%', marginBottom: 24}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Current Language
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            {languageProps.map(language => {
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setCurrentLanguage(language);
                    refRBLanguageSheet.current.close();
                  }}
                  key={'generalRBSheet_language_' + language.value}>
                  <Text style={{...fonts.para_regular, color: 'white'}}>
                    {language.label}
                  </Text>
                  {language.value === currentLanguage.value && (
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                      <FontAwesome
                        style={{fontSize: 16, color: colors.green5}}
                        icon={RegularIcons.checkCircle}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>
    );
  };

  const renderSearchEngineRBSheet = () => {
    return (
      <RBSheet
        height={250}
        ref={refRBSearchEngineSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <ScrollView style={{height: '100%', marginBottom: 24}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Search Engine
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            {searchEngineProps.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSearchEngine(item);
                    refRBSearchEngineSheet.current.close();
                  }}
                  key={'generalRBSheet_searchE_' + item.value}>
                  <Text style={{...fonts.para_regular, color: 'white'}}>
                    {item.label}
                  </Text>
                  {item.value === currentSearchEngine.value && (
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                      <FontAwesome
                        style={{fontSize: 16, color: colors.green5}}
                        icon={RegularIcons.checkCircle}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>
    );
  };

  return (
    <View style={{marginHorizontal: 24}}>
      {renderBaseCurrencyRBSheet()}
      {renderLanguageRBSheet()}
      {renderSearchEngineRBSheet()}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onPressClose}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...fonts.title2,
            color: 'white',
            textAlign: 'center',
            flex: 1,
          }}>
          General
        </Text>
        <TouchableOpacity
          onPress={onPressClose}
          style={{flexDirection: 'row-reverse'}}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.times}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginTop: 40,
          marginBottom: 120,
        }}>
        <View style={{marginTop: 40}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              Currency Conversion
            </Text>
            <Text
              style={{
                ...fonts.para_regular,
                color: colors.grey9,
                marginTop: 8,
              }}>
              Display fiat values in using o specific currency throughout the
              application
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            <ComboBox
              onPress={() => {
                refRBBaseCurrencySheet.current.open();
              }}>
              <Text style={{...fonts.para_semibold, color: 'white'}}>
                {`${baseCurrency.value} - ${baseCurrency.label}`}
              </Text>
            </ComboBox>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              Privacy Currency
            </Text>
            <Text
              style={{
                ...fonts.para_regular,
                color: colors.grey9,
                marginTop: 8,
              }}>
              Select Native to prioritize displaying values in the native
              currency of the chain (e.g. ETH). Select Fiat to prioritize
              displaying values in your selected fiat currency
            </Text>
          </View>
          <View style={{marginTop: 40, flexDirection: 'row'}}>
            <RadioForm formHorizontal={true} animation={true}>
              {/* To create radio buttons, loop through your array of options */}
              {privacyCurrencyProps.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  wrapStyle={{marginRight: 50}}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={obj.value === privacyCurrency}
                    onPress={() => {
                      setPrivacyCurrency(obj.value);
                    }}
                    borderWidth={2}
                    buttonSize={15}
                    buttonOuterSize={30}
                    buttonInnerColor={colors.primary5}
                    buttonOuterColor={
                      obj.value === privacyCurrency
                        ? colors.primary5
                        : colors.grey9
                    }
                    buttonStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => {
                      setPrivacyCurrency(obj.value);
                    }}
                    labelStyle={{color: 'white', ...fonts.para_regular}}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={{marginTop: 40}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Current Language
            </Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              Translate the application to a different supported language
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox
                onPress={() => {
                  refRBLanguageSheet.current.open();
                }}>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  {currentLanguage.label}
                </Text>
              </ComboBox>
            </View>
          </View>
          <View style={{marginTop: 40, paddingBottom: 20}}>
            <Text style={{...fonts.title2, color: 'white'}}>Search Engine</Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              Change the default search engine used when entering search terms
              in the URL bar
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox
                onPress={() => {
                  refRBSearchEngineSheet.current.open();
                }}>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  {currentSearchEngine.label}
                </Text>
              </ComboBox>
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Account Identicon
            </Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              You can customize your account
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  Custom Account
                </Text>
              </ComboBox>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  settingsInfo: state.settings,
});
const mapDispatchToProps = dispatch => ({
  setBaseCurrency: value => setBaseCurrency(dispatch, value),
  setPrivacyCurrency: value => setPrivacyCurrency(dispatch, value),
  setCurrentLanguage: value => setCurrentLanguage(dispatch, value),
  setSearchEngine: value => setSearchEngine(dispatch, value),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralRBSheet);
