import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { PrimaryButton } from '../../../components/Buttons';
import FloatLabelInput from '../../../components/FloatLabelInput';
import { addNFT } from '../../../redux/actions/NftBalanceActions';
import { colors, fonts } from '../../../styles';
import { isValidAddress } from '../../../utils/common';
import { checkOwnerShip } from '../../../utils/nft';

const CollectibleAdd = ({
  onCancel,
  networks,
  currentNetwork,
  accounts,
  currentAccountIndex,
  addNFT,
}) => {
  const [nftAddress, setNftAddress] = useState('');
  const [nftId, setNftId] = useState('');
  const [error, setError] = useState({ address: '', id: '' });
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const checkCanAdd = data => {
    const { address, id } = data;
    if (!(address.length > 0 && id.length > 0)) {
      return false;
    }
    let res = true;
    let tempError = error;
    if (!isValidAddress(address)) {
      tempError.address = 'Must be Valid Address.';
      res = false;
    }
    if (parseInt(id) !== Number(id)) {
      tempError.id = 'Must be Valid Integer.';
      res = false;
    }
    setError({ ...tempError });
    return res;
  };

  const onAdd = () => {
    if (!checkCanAdd({ address: nftAddress, id: nftId })) {
      return;
    }
    checkOwnerShip(
      {
        currentNetworkObject: networks[currentNetwork],
        token: { tokenAddress: nftAddress },
        address: accounts[currentAccountIndex].address,
        id: nftId,
      },
      () => {
        setAddLoading(true);
      },
      () => {
        addNFT(
          {
            currentNetworkObject: networks[currentNetwork],
            currentNetwork,
            currentAccountIndex,
            nftAddress,
            nftId,
          },
          () => { },
          () => {
            setAddLoading(false);
            onCancel();
          },
          err => {
            setAddError(err);
            setAddLoading(false);
          },
          () => {
            setAddLoading(false);
          },
        );
      },
      err => {
        setAddLoading(false);
        setAddError(err);
      },
    );
  };

  return (
    <View style={{ marginHorizontal: 24, height: '100%' }}>
      <Text style={{ ...fonts.title2, color: 'white', textAlign: 'center' }}>
        Import Tokens
      </Text>
      <View style={{ marginTop: 40 }}>
        <FloatLabelInput
          showTopLabel
          showAsterisk
          topLabel="Token Address"
          value={nftAddress}
          onChangeText={value => {
            setNftAddress(value);
            setError({ ...error, address: '' });
            setAddError('');
          }}
          label="Address"
        />
        {error.address.length > 0 && (
          <Text
            style={{
              paddingLeft: 16,
              ...fonts.caption_small12_16_regular,
              color: colors.red5,
            }}>
            {error.address}
          </Text>
        )}
      </View>
      <View style={{ marginTop: 24 }}>
        <FloatLabelInput
          showTopLabel
          showAsterisk
          topLabel="ID"
          value={nftId}
          onChangeText={value => {
            setError({ ...error, id: '' });
            setAddError('');
            setNftId(value);
          }}
          label="ID"
        />
        {error.id.length > 0 && (
          <Text
            style={{
              paddingLeft: 16,
              ...fonts.caption_small12_16_regular,
              color: colors.red5,
            }}>
            {error.id}
          </Text>
        )}
      </View>
      {addError.length > 0 && (
        <Text
          style={{
            marginTop: 16,
            textAlign: 'center',
            ...fonts.caption_small12_16_regular,
            color: colors.red5,
          }}>
          {addError}
        </Text>
      )}
      <View
        style={{ flex: 1, flexDirection: 'column-reverse', marginBottom: 60 }}>
        <PrimaryButton
          textColor='white'
          text={'Add'}
          onPress={() => {
            setError({ address: '', id: '' });
            setAddError('');
            onAdd();
          }}
          enableFlag={nftAddress.length > 0 && nftId.length > 0}
          loading={addLoading}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
});
const mapDispatchToProps = dispatch => ({
  addNFT: (data, beforeWork, successCallback, failCallback, errorCallback) =>
    addNFT(
      dispatch,
      data,
      beforeWork,
      successCallback,
      failCallback,
      errorCallback,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectibleAdd);
