import {View, Text} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

const QrCode = () => {
  return (
    <View>
      <Text style={tw.style('text-4xl')}>QRCode</Text>
    </View>
  );
};

export default QrCode;
