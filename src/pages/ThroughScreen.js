import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import Dots from 'react-native-dots-pagination';

import { colors, fonts } from '../styles';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { SvgXml } from 'react-native-svg';
import CustomKeyboardView from '../components/CustomKeyboardView';

//import images
const imageList = [
  require('../assets/images/through/image1.png'),
  require('../assets/images/through/image2.png'),
  require('../assets/images/through/image3.png'),
  require('../assets/images/through/image4.png'),
  require('../assets/images/through/image5.png'),
];

const titleList = [
  "Dead Function", "Crypto vs Cash\nCash Vs Crypto", "Pay directly", "Have an amazing experience with Flash Wallet right now!", ""
]
const descriptionList = [
  "Dead function to send your cryptocurrency to your testament automatically or in case of loss of your seed phrase.",
  "Exchange your cryptocurrency vs cash and vice versa at our merchant partners with Flash Transfer.",
  "Pay directly with a bank card linked to your crypto balance.",
  "", ""
]

const ThroughScreen = ({ navigation }) => {
  const [current, setCurrent] = useState(0);

  return (
    <CustomKeyboardView>
      <View
        style={{
          top: current <= 3 ? '25%' : '20%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
        }}>
        {current === 0 ? <SvgXml xml={fonts.deadFunctionSvgXml} fill={colors.grey9} width={200} height={200} /> : <Image source={imageList[current]} />}
      </View>

      {current <= 3 && (
        <>
          <View style={{
            position: 'absolute',
            bottom: -10,
            width: '100%',
          }}>
            <View style={{
              position: 'absolute',
              top: current === 3 ? 64 : 48,
              width: '100%',
              zIndex: 10,
              paddingHorizontal: 48,
            }}>
              <Text style={{
                ...fonts.title1,
                ...current === 3 && {
                  fontSize: 28,
                  lineHeight: 32,
                },
                color: 'white',
                textAlign: 'center'
              }}>{titleList[current]}</Text>
              <Text style={{
                marginTop: 8,
                ...fonts.para_regular,
                textAlign: 'center',
                color: colors.grey9
              }}>{descriptionList[current]}</Text>
            </View>
            <SvgXml xml={fonts.throughEllipse} width="100%" />
          </View>
          <View style={{ width: '100%', bottom: '15%', position: 'absolute' }}>
            <Dots
              length={4}
              active={current}
              passiveDotHeight={8}
              activeDotHeight={8}
              passiveDotWidth={8}
              activeDotWidth={24}
              passiveColor={colors.grey18}
              activeColor={colors.primary5}
            />
          </View>
          <View
            style={{
              width: '90%',
              bottom: '6%',
              position: 'absolute',
              left: '5%',
            }}>
            <PrimaryButton textColor='white'
              onPress={() => {
                setCurrent((current + 1) % 5);
              }}
              text={current < 3 ? 'Next' : 'Get Start'}
              style={{
                borderRadius: 100,
              }}
            />
          </View>
        </>
      )}
      {current == 4 && (
        <>
          <View style={{
            position: 'absolute',
            bottom: 240,
            width: '100%',
          }}>
            <Text style={{
              ...fonts.title1,
              color: 'white',
              textAlign: 'center',
              fontSize: 36,
              lineHeight: 40
            }}>
              Wallet Setup
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column-reverse',
              marginBottom: 60,
              marginHorizontal: 24,
            }}>
            <View>
              <SecondaryButton
                onPress={() => {
                  navigation.navigate('importwallet');
                }}
                text="Import Using Seed Phrase"
              />
              <View style={{ height: 15 }}></View>
              <PrimaryButton textColor="white"
                onPress={() => {
                  navigation.navigate('createwallet');
                }}
                text="Create a New Wallet"
              />
            </View>
          </View>
        </>
      )}
    </CustomKeyboardView>
  );
};

export default ThroughScreen;
