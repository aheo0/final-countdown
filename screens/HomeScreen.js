import * as WebBrowser from 'expo-web-browser';
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


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.titleImage} source={require('../assets/images/robot-prod.png')}/>
        <Text style={styles.titleText1}>
          <Text style={{color: '#ee8780'}}>Tower </Text>
          <Text style={{color: '#95b3f0'}}>Takeover</Text>
        </Text>
        <Text style={styles.titleText2}>Strategist</Text>
      </View>

      <View>
        <Text style={styles.creditsSection}>Team 5327C proudly presents Tower Takeover Strategist, a mobile application ...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In Game Strategy Calculator</Text>
        <Text style={styles.sectionDescription}>
        This in-game strategy calculator takes the current field setup (cubes and towers) in order to calculate the best course of action our robot should take, using an algorithm that was created perfectly for our (5327C) team. There is also a timer that can be started so that our strategy algorithm also accounts for the amount of time left in the match.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Analyzer</Text>
        <Text style={styles.sectionDescription}>
        At competitions, other teams may potentially become alliance partners, or be on the opposing alliance. In VEX, it is crucial to know the status of other teams' progress in the season, as knowing what features to improve upon can help with planning our own progress. Team Analyzer uses VEX's official database online with data on every single team registered and their match results. Given a team name, outputs their rank, ccwm, win-ratio, opr, and max scores they have obtained at each competition they have attended, in the form of aesthetic line charts.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scouting Notes</Text>
        <Text style={styles.sectionDescription}>
        Once having qualified into elliminations, scouting for other potential alliances becomes an important aspect of a VEX competition. This feature aims to simplifty the process of taking notes of other teams' features such as the amount of cubes they can potential stack, if they have a lift or not, their autonomous processes, and other unique remarks about them.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Match Estimator</Text>
        <Text style={styles.sectionDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#121420',
  },

  title: {
    marginBottom: 20,
    padding: 13,
    paddingTop: 51,
    height: 130
  },

  titleImage: {
    position: 'absolute',
    marginTop: 35,
    marginLeft: 30,
    width: 100,
    height: 100,

    borderRadius: 30
  },

  titleText1: {
    fontSize: 29,
    fontFamily: 'Palatino-Italic',

    paddingLeft: 145
  },

  titleText2: {
    fontSize: 33,
    fontFamily: 'Palatino',
    color: '#fffffc',

    paddingLeft: 165
  },

  creditsSection: {
    margin: 21,
    marginTop: 15,
    padding: 8,

    color: '#fffffc',
    fontFamily: 'SpaceMono'
  },

  section: {
    marginLeft: 21,
    marginRight: 21,
    marginTop: 5,
    marginBottom: 21,
    padding: 8,

    borderRadius: 20,
    backgroundColor: '#fffffc'
  },

  sectionTitle: {
    margin: 6,
    paddingLeft: 10,
    paddingTop: 5,

    fontSize: 20,
    fontWeight: '600',
    color: '#ff7f11'
  },

  sectionDescription: {
    margin: 6,
    paddingLeft: 10,
    paddingBottom: 5,


    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});
