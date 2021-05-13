import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InGameStratsScreen from '../screens/InGameStratsScreen';
import ScoutingScreen from '../screens/ScoutingScreen';
import TeamsScreen from '../screens/TeamsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

/* Home Screen */
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
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

/* In Game Strategy Calculator Screen */
const InGameStratsStack = createStackNavigator(
  {
    InGameStrats: InGameStratsScreen,
  },
  config
);

InGameStratsStack.navigationOptions = {
  tabBarLabel: 'Strategy',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

InGameStratsStack.path = '';

/* Teams Screen */
const TeamsStack = createStackNavigator(
  {
    Teams: TeamsScreen,
  },
  config
);

TeamsStack.navigationOptions = {
  tabBarLabel: 'Teams',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

TeamsStack.path = '';

/* Scouting Screen */
const ScoutingStack = createStackNavigator(
  {
    Scouting: ScoutingScreen,
  },
  config
);

ScoutingStack.navigationOptions = {
  tabBarLabel: 'Notes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-paper'
        : 'md-paper'} />
  ),
};

ScoutingStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  InGameStratsStack,
  TeamsStack,
  ScoutingStack
},
{
  'lazy': false,
  swipeEnabled: true
});

tabNavigator.path = '';

export default tabNavigator;
