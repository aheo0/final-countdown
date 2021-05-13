import React from 'react';
import { Ionicons } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
// import { FontAwesome } from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
