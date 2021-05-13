import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TeamAnalyzerScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

TeamAnalyzerScreen.navigationOptions = {
  title: 'Team Analyzer for Tower Takeover',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});