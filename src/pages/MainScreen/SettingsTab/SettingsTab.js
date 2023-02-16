import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fonts } from '../../../styles';
import { SvgXml } from 'react-native-svg';
import AntIcon from 'react-native-vector-icons/AntDesign';

//import tabs
import Preferences from './Preferences/Preferences';
import ToggleSwitch from 'toggle-switch-react-native';

const userAvatar = require('../../../assets/avatars/default.png')
const buyIconSvgXml = require('../SVGData').buyIcon;

const SettingsTab = ({ navigation }) => {
  const [showStatus, setShowStatus] = useState('default');
  const [darkTheme, setDarkTheme] = useState(true)

  useEffect(() => {
    return () => { };
  });

  const renderSettingsRow = (icon, name, onPress, color) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          marginVertical: 8,
        }}
        onPress={onPress}>
        <View>{icon}</View>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ ...fonts.para_regular, color: color || 'white' }}>{name}</Text>
        </View>
        {name !== 'Logout' &&
          <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
            <SvgXml xml={fonts.rightArrowSvgXml} />
          </View>
        }

      </TouchableOpacity>
    );
  };

  const UserInfoPanel = ({
    user
  }) => {
    const { avatar, name, email } = user;
    return <View style={{
      backgroundColor: colors.BG,
      padding: 50,
      alignItems: 'center',
      borderRadius: 16
    }}>
      <View>
        <Image source={avatar} style={{ width: 100, height: 100 }} />
        <SvgXml style={{
          position: 'absolute',
          bottom: 0,
          right: 0
        }} xml={fonts.profileAvatarEditSvgXml} />
      </View>
      <View style={{ marginTop: 18 }}>
        <Text style={{
          color: 'white',
          ...fonts.HEADINGS_H2
        }}>{name}</Text>
      </View>
      <View style={{ marginTop: 18 }}>
        <Text style={{
          color: 'white',
          ...fonts.BODY_T4
        }}>{email}</Text>
      </View>
    </View>
  }

  const MainSettingsTab = () => {
    return (
      <>
        <View
          style={{ paddingTop: 40, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...fonts.title2, color: 'white', textAlign: 'center' }}>
            Profile
          </Text>
          <TouchableOpacity>
            <SvgXml xml={fonts.profileDetailSvgXml} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 24,
          }}>

          <UserInfoPanel user={{ avatar: userAvatar, name: 'Flash Wallet', email: "numanzafar994@gmail.com" }} />
          <View style={{
            marginTop: 24,
            backgroundColor: colors.BG,
            borderRadius: 16,
            paddingHorizontal: 8
          }}>
            {renderSettingsRow(
              <SvgXml xml={fonts.profileMenuAccountSvgXml} width={28} height={28} />,
              'Account',
              () => { },
            )}
            {renderSettingsRow(
              <AntIcon name="sharealt" size={28} color="white" />,
              'Share My Public Address',
              () => { },
            )}
            {renderSettingsRow(
              <AntIcon name="eyeo" size={28} color="white" />,
              'View on bscscan',
              () => { },
            )}
          </View>

          {renderSettingsRow(
            <SvgXml xml={fonts.profileMenuNotificationSvgXml} width={28} height={28} />,
            'Notifications',
            () => { },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.profileMenuDeadFunctionSvgXml} width={28} height={28} />,
            'Dead Functions',
            () => {
              navigation.navigate('deadscreen')
            },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.profileMenuRevokeSvgXml} width={28} height={28} />,
            'Revoke Contracts',
            () => { },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.profileMenuLanguageSvgXml} width={28} height={28} />,
            'Languages',
            () => { },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.profileMenuSecuritySvgXml} width={28} height={28} />,
            'Security',
            () => { },
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              marginVertical: 8,
            }}>
            <AntIcon name="eyeo" size={28} color="white" />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ ...fonts.para_regular, color: 'white' }}>Dark Theme</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <ToggleSwitch
                isOn={darkTheme}
                onColor={colors.primary5}
                offColor={colors.grey23}
                size="medium"
                onToggle={setDarkTheme}
                animationSpeed={100}
                thumbOnStyle={{ borderRadius: 40 }}
                thumbOffStyle={{ borderRadius: 40 }}
                trackOnStyle={{ borderRadius: 40, width: 48, height: 24 }}
                trackOffStyle={{ borderRadius: 40, width: 48, height: 24 }}
              />
            </View>
          </View>

          <View style={{
            marginTop: 24,
            backgroundColor: colors.BG,
            borderRadius: 16,
            paddingHorizontal: 8,
            marginBottom: 40
          }}>
            {renderSettingsRow(
              <SvgXml xml={fonts.profileMenuPrivacySvgXml} width={28} height={28} />,
              'Privacy Policy',
              () => { },
            )}
            {renderSettingsRow(
              <SvgXml xml={fonts.profileMenuHelpSvgXml} width={28} height={28} />,
              'Help & Support',
              () => { },
            )}
            {renderSettingsRow(
              <SvgXml xml={fonts.profileMenuContactSvgXml} width={28} height={28} />,
              'Contact Us',
              () => { },
            )}
            {renderSettingsRow(
              <SvgXml xml={fonts.profileMenuLogoutSvgXml} width={28} height={28} />,
              'Logout',
              () => { },
              "#F75555"
            )}
          </View>
        </View>
      </>
    );
  };

  const onGoBack = () => {
    setShowStatus('default');
  };

  return (<ScrollView style={{
    backgroundColor: colors.P3,
  }}>
    {showStatus === 'default' && <MainSettingsTab />}
    {showStatus === 'prefereneces' && <Preferences onGoBack={onGoBack} />}
  </ScrollView>
  );
};

export default SettingsTab;
