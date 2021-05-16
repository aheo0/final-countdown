import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ButtonDisplayer({ text, topSpace, leftSpace, pressFunction }: {text: string, topSpace: string, leftSpace: string, pressFunction: any }) {
    const left_styles = StyleSheet.create({
        custom: {
            marginTop: topSpace,
            marginLeft: leftSpace,
        }
    });

    return (
        <View style={left_styles.custom}>
            <TouchableOpacity onPress={() => pressFunction()}>
                <Text style={[styles.ButtonText]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  ButtonText: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 8
  }
});
