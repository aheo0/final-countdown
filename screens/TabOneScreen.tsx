import * as React from 'react';
import { StyleSheet } from 'react-native';

import WatchDisplayer from '../components/WatchDisplayer';
import TitleDisplayer from '../components/TitleDisplayer';
import SeparatorDisplayer from '../components/SeparatorDisplayer';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [watchHour, setWatchHour] = React.useState(13);
  const [watchMinute, setWatchMinute] = React.useState(5);
  const [watchSecond, setWatchSecond] = React.useState(49);

  const watchTextFunction = (time, mod) => {
    var currentTime = time % mod;
    if (currentTime >= 10) return (String(currentTime));
    return ("0" + String(currentTime));
  };

  return (
    <View style={styles.container}>
      <TitleDisplayer title="Watch"/>
      <SeparatorDisplayer/>
      <View style={styles.extraPadding}>
        <WatchDisplayer
          hour={watchTextFunction(watchHour, 12)}
          minute={watchTextFunction(watchMinute, 60)}
          second={watchTextFunction(watchSecond, 100)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraPadding: {
    top: 43 
  }
});
