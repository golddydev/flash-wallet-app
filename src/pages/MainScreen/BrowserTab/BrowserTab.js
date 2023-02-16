import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { fonts, colors } from '../../../styles';

const appInfos = [
    {
        logo: require('../../../assets/images/browser/1.png'),
        name: 'Dashboard',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/2.png'),
        name: 'Curve',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/3.png'),
        name: 'Open Sea',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/4.png'),
        name: 'Uniswap',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/5.png'),
        name: 'Biswap',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/6.png'),
        name: 'Stake',
        description: "Lorem ipsum text will come here"
    },
    {
        logo: require('../../../assets/images/browser/7.png'),
        name: 'Bag',
        description: "Lorem ipsum text will come here"
    },
]

const tabStates = ["Popular", "DEX", "DeFi", "NFT"];

const AppRow = ({ app }) => {
    return <TouchableOpacity style={{
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 4
    }}>
        <Image source={app.logo} style={{
            width: 48, height: 48
        }} />
        <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{
                color: 'white',
                ...fonts.BODY_T3
            }}>{app.name}</Text>
            <Text style={{
                color: 'grey',
                ...fonts.BODY_T4
            }}>{app.description}</Text>
        </View>
    </TouchableOpacity>
}

const BrowserTab = ({
    navigation,
}) => {
    const [currentTabState, setCurrentTabState] = useState(tabStates[0])

    return (
        <View style={{
            backgroundColor: colors.BG,
            paddingHorizontal: 20,
            flex: 1,
        }}>
            <View style={{
                marginTop: 60,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    color: 'white',
                    ...fonts.title1
                }}>App Pricipales</Text>
                <TouchableOpacity>
                    <Text style={{
                        color: 'white',
                        ...fonts.BODY_T4
                    }}>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal style={{
                marginTop: 20, marginHorizontal: 24
            }}>
                {appInfos.map((info, index) => <TouchableOpacity key={index} style={{
                    marginHorizontal: 12,
                    alignItems: 'center'
                }}>
                    <Image source={info.logo} style={{ width: 48, height: 48 }} />
                    <Text style={{
                        marginTop: 8,
                        color: 'white',
                        ...fonts.BODY_T4
                    }}>{info.name}</Text>
                </TouchableOpacity>)}
            </ScrollView>

            <Text style={{
                color: 'white',
                ...fonts.title1,
                marginTop: 60
            }}>App Pricipales</Text>
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                {tabStates.map((tabState, index) => <TouchableOpacity
                    key={index}
                    style={{
                        paddingBottom: 8,
                        paddingHorizontal: 8,
                        borderBottomWidth: currentTabState === tabState ? 4 : 0,
                        borderBottomColor: colors.PRIMARY_P1
                    }} onPress={() => setCurrentTabState(tabState)}>
                    <Text style={{
                        color: 'white',
                        ...fonts.HEADINGS_H4
                    }}>{tabState}</Text>
                </TouchableOpacity>)}
            </View>
            <ScrollView style={{
                marginTop: 40,
                paddingBottom: 20
            }}>
                {appInfos.map((app, index) => <AppRow key={index} app={app} />)}
            </ScrollView>
        </View>
    );
};


export default BrowserTab;
