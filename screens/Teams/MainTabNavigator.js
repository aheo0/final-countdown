import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InGameStratsScreen from '../screens/InGameStratsScreen';
import ScoutingScreen from '../screens/ScoutingScreen';
import MatchEstimatorScreen from '../screens/MatchEstimatorScreen';
import TeamAnalyzerScreen from '../screens/TeamAnalyzerScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const InGameStratsStack = createStackNavigator(
  {
    InGameStrats: InGameStratsScreen,
  },
  config
);

InGameStratsStack.navigationOptions = {
  tabBarLabel: 'In Game Strats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

InGameStratsStack.path = '';

const ScoutingStack = createStackNavigator(
  {
    Scouting: ScoutingScreen,
  },
  config
);

ScoutingStack.navigationOptions = {
  tabBarLabel: 'Scouting Notes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ScoutingStack.path = '';

const MatchEstimatorStack = createStackNavigator(
  {
    MatchEstimator: MatchEstimatorScreen,
  },
  config
);

MatchEstimatorStack.navigationOptions = {
  tabBarLabel: 'Match Estimator',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

MatchEstimatorStack.path = '';

const TeamAnalyzerStack = createStackNavigator(
  {
    TeamAnalyzer: TeamAnalyzerScreen,
  },
  config
);

TeamAnalyzerStack.navigationOptions = {
  tabBarLabel: 'Team Analyzer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

TeamAnalyzerStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  InGameStratsStack,
  ScoutingStack,
  MatchEstimatorStack,
  TeamAnalyzerStack
},
{
  'lazy': false,
  swipeEnabled: true,
  animationEnabled: true,
  tabBarPosition: 'top',
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: '#e91e63'
}});

tabNavigator.path = '';

export default tabNavigator;
