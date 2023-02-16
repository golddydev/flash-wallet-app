import React, { useState } from 'react';
import { Animated, Dimensions, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { fonts, colors } from '../../styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useColorModeValue } from 'native-base';
import SearchToken from './SearchToken';
import CustomToken from './CustomToken';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import AntIcon from 'react-native-vector-icons/AntDesign'

const ImportToken = ({ navigation }) => {
    const onCancel = () => {
        navigation.goBack()
    }

    const [curTabIndex, setCurTabIndex] = useState(0);
    const [tabRoutes] = useState([
        {
            key: 'first',
            title: 'Search',
        },
        {
            key: 'second',
            title: 'Custom Token',
        },
    ]);

    const initialLayout = {
        width: Dimensions.get('window').width,
    };

    const renderScene = SceneMap({
        first: () => {
            return <SearchToken onCancel={onCancel} />;
        },
        second: () => {
            return <CustomToken onCancel={onCancel} />;
        },
    });

    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={{ flexDirection: 'row' }}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(inputIndex =>
                            inputIndex === i ? 1 : 0.5,
                        ),
                    });
                    const color =
                        curTabIndex === i
                            ? useColorModeValue('white', colors.grey12)
                            : useColorModeValue(colors.grey12, colors.grey12);

                    return (
                        <View
                            key={'tokenaddtabbar_' + i}
                            style={{
                                marginHorizontal: 24,
                                borderBottomWidth: curTabIndex === i ? 3 : 0,
                                borderColor: 'white',
                                flex: 1,
                                alignItems: 'center',
                            }}>
                            <Pressable
                                onPress={() => {
                                    setCurTabIndex(i);
                                }}>
                                <Animated.Text
                                    style={{
                                        color,
                                    }}>
                                    {route.title}
                                </Animated.Text>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <CustomKeyboardView style={{
            backgroundColor: colors.P3
        }}>
            <View style={{ marginTop: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <TouchableOpacity style={{
                    marginLeft: 24,
                }} onPress={() => {
                    navigation.goBack()
                }}>
                    <AntIcon color='white' name="arrowleft" size={32} />
                </TouchableOpacity>
                <Text style={{ ...fonts.title2, color: 'white', textAlign: 'center', flex: 1 }}>
                    Import Tokens
                </Text>
            </View>
            <View style={{ marginTop: 24, height: '90%', width: '100%' }}>
                <TabView
                    swipeEnabled={false}
                    style={{ marginTop: 40, marginHorizontal: 24 }}
                    navigationState={{ index: curTabIndex, routes: tabRoutes }}
                    renderTabBar={renderTabBar}
                    renderScene={renderScene}
                    onIndexChange={setCurTabIndex}
                    initialLayout={initialLayout}
                />
            </View>
        </CustomKeyboardView >
    );
};

export default ImportToken;
