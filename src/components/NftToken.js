import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import {setCachedNftData} from '../redux/actions/NftInfoCacheActions';
import {colors, fonts} from '../styles';

const NftToken = ({
  nftData,
  currentNetworkObject,
  currentNetwork,
  nftInfoCache,
  setCachedNftData,
}) => {
  const refImageRBSheet = useRef(null);
  const {nftId, nftAddress} = nftData;
  const cachedData = nftInfoCache[currentNetwork.toString()]
    ? nftInfoCache[currentNetwork.toString()][nftAddress.toString()]
      ? nftInfoCache[currentNetwork.toString()][nftAddress.toString()]
      : {}
    : {};
  if (!cachedData.nftData || !cachedData.nftData[nftId]) {
    setCachedNftData({currentNetwork, currentNetworkObject, nftData});
  } else {
    console.log(cachedData);
  }

  const renderImageRBSheet = () => {
    console.log(
      cachedData.nftData[nftId].image.startsWith('ipfs:')
        ? 'https://ipfs.io/ipfs/' +
            cachedData.nftData[nftId].image.split('//')[1]
        : cachedData.nftData[nftId].image,
    );
    return (
      <RBSheet
        height={700}
        ref={refImageRBSheet}
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
        {cachedData.nftData && cachedData.nftData[nftId] ? (
          <View
            style={{
              width: '100%',
              height: '80%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: cachedData.nftData[nftId].image.startsWith('ipfs:')
                  ? 'https://ipfs.io/ipfs/' +
                    cachedData.nftData[nftId].image.split('//')[1]
                  : cachedData.nftData[nftId].image,
              }}
              style={{width: 300, height: 300}}
            />
          </View>
        ) : (
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: colors.turquoise3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                ...fonts.big_type1,
                color: colors.turquoise8,
              }}>
              Loading...
            </Text>
          </View>
        )}
      </RBSheet>
    );
  };

  return (
    <View>
      {cachedData.nftData && cachedData.nftData[nftId] ? (
        <View>
          {renderImageRBSheet()}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              refImageRBSheet.current.open();
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.grey23,
                marginRight: 16,
              }}></View>
            <Text style={{...fonts.title2, color: 'white'}}>
              {cachedData.nftData[nftId].name || '# ' + nftId}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{...fonts.title2, color: 'white'}}>Loading...</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  nftInfoCache: state.nftInfoCache,
});
const mapDispatchToProps = dispatch => ({
  setCachedNftData: data => setCachedNftData(dispatch, data),
});
export default connect(mapStateToProps, mapDispatchToProps)(NftToken);
