import React from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {setCachedNftName} from '../redux/actions/NftInfoCacheActions';
import {colors, fonts} from '../styles';
import NftToken from './NftToken';

const NftTokenRow = ({
  nftData,
  currentNetworkObject,
  currentNetwork,
  nftInfoCache,
  setCachedNftName,
}) => {
  const {idList, nftAddress} = nftData;
  const cachedData = nftInfoCache[currentNetwork.toString()]
    ? nftInfoCache[currentNetwork.toString()][nftAddress.toString()]
      ? nftInfoCache[currentNetwork.toString()][nftAddress.toString()]
      : {}
    : {};
  if (!cachedData.name) {
    setCachedNftName({currentNetwork, currentNetworkObject, nftData});
  }
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{...fonts.title2, color: 'white'}}>
          {cachedData.name ? cachedData.name : 'Loading...'}
        </Text>
        {cachedData.name ? (
          <Text
            style={{
              marginLeft: 8,
              ...fonts.title2,
              color: colors.grey9,
            }}>{`(${idList.length})`}</Text>
        ) : (
          <></>
        )}
      </View>
      <View style={{marginLeft: 18, marginTop: 18}}>
        {idList.map(id => {
          return (
            <View key={nftAddress + '_' + id}>
              <NftToken
                nftData={{nftAddress: nftAddress, nftId: id}}
                currentNetwork={currentNetwork}
                currentNetworkObject={currentNetworkObject}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  nftInfoCache: state.nftInfoCache,
});
const mapDispatchToProps = dispatch => ({
  setCachedNftName: data => setCachedNftName(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(NftTokenRow);
