import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MatchEstimatorScreen() {
  const [screenChange, setScreenChange] = useState(false);

  function screenDisplay() {
    var returnScreen = [];

    // Back Button
    if (subscreen.length != 1) {
      returnScreen.push(
        <TouchableOpacity key={0} style={styles.backButton} onPress={() => updateScreen('remove')}>
          <Text style={styles.backButtonText}>
            {'<'}
          </Text>
        </TouchableOpacity>
      );
    }

    returnScreen.push(
      <View key={1}>
        <Text>team</Text>
      </View>
    );

    return(
      <ScrollView style={styles.container}>
        {returnScreen}
      </ScrollView>
    );
  }

  return (
    screenDisplay()
  );
}

MatchEstimatorScreen.navigationOptions = {
  title: 'Match Estimator',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});