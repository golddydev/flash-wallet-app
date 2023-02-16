import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { Text } from 'react-native';

const ScanQRScreen = () => {
  return (
    <QRCodeScanner
      onRead={e => {
        console.log(e.data);
      }}
      topContent={<Text>Top</Text>}
      bottomContent={<Text>Bottom</Text>}
    />
  );
};

export default ScanQRScreen;
