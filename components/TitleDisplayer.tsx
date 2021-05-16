import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { View } from './Themed';

export default function TitleDisplayer({ title }: {title: string }) {
  return (
    <View>
      <TextInput
        style={styles.title}
        editable={false}
        value={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {   
    fontSize: 23,
    fontWeight: 'bold',
    top: "-1%",
    width: "80%",
  }
});
