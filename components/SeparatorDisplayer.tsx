import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { View } from './Themed';

export default function SeparatorDisplayer() {
  return (
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  );
}

const styles = StyleSheet.create({
separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
},
});
