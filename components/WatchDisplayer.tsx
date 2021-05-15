import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function WatchDisplayer({ hour, minute, second }: {hour: string, minute: string, second:string }) {
  return (
      <View>
        <View style={styles.watchDisplay}>
            <MonoText style={styles.watchText}>
                <Text style={styles.watchTextHour}>{hour}</Text>
                <Text>:</Text>
                <Text style={styles.watchTextHour}>{minute}</Text>
                <Text style={styles.watchTextSecond}>:</Text>
                <Text style={styles.watchTextSecond}>{second}</Text>
            </MonoText>
        </View>

        <Text style={[styles.watchButtons, styles.watchButtonOne]}>seseefe</Text>
        <Text style={[styles.watchButtons, styles.watchButtonTwo]}>sesdseefe</Text>
        <Text style={[styles.watchButtons, styles.watchButtonThree]}>seseefe</Text>
        <Text style={[styles.watchButtons, styles.watchButtonFour]}>sesdseefe</Text>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  watchDisplay: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: "11%",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  watchText: {
    fontSize: 60
  },
  watchTextHour: {

  },
  watchTextSecond: {
    fontSize: 20
  },
  watchButtons: {
    paddingTop: 0,
    height: 4,
    width: "5%",
    borderColor: "red",
    borderWidth: 4
  },
  watchButtonOne: {
    top: -4,
    left: 18,
  },
  watchButtonTwo: {
    top: -12,
    left: 182,
  },
  watchButtonThree: {
    top: -130,
    left: 199,
  },
  watchButtonFour: {
    top: -138,
    left: 18,
  }
});
