import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import WatchDisplayer from '../components/WatchDisplayer';
import TitleDisplayer from '../components/TitleDisplayer';
import SeparatorDisplayer from '../components/SeparatorDisplayer';
import ButtonDisplayer from '../components/ButtonDisplayer';
import { Text, View } from '../components/Themed';

export default function TabThreeScreen() {
  const [watchHour, setWatchHour] = React.useState(0);
  const [watchMinute, setWatchMinute] = React.useState(0);
  const [watchSecond, setWatchSecond] = React.useState(0);

  const watchTextFunction = (time, mod) => {
    var currentTime = time % mod;
    if (currentTime >= 10) return (String(currentTime));
    return ("0" + String(currentTime));
  };

  const buttonOneFunction = (hour, minute, second) => {
    setWatchHour(hour);
    setWatchMinute(minute);
    setWatchSecond(second);
  };

  return (
    <View style={styles.container}>
        <View>
            <TextInput
                style={styles.SATcontainer}
                editable={false}
                value="SAT"
            />
        </View>
      <SeparatorDisplayer/>
      
      <ButtonDisplayer text="Reading" topSpace="1%" leftSpace="-40%" pressFunction={()=>buttonOneFunction(1, 5, 0)}/>
      <ButtonDisplayer text="Writing" topSpace="-5.2%" leftSpace="-12%" pressFunction={()=>buttonOneFunction(0, 35, 0)}/>
      <ButtonDisplayer text="Math 1" topSpace="-5.2%" leftSpace="15%" pressFunction={()=>buttonOneFunction(0, 25, 0)}/>
      <ButtonDisplayer text="Math 2" topSpace="-5.2%" leftSpace="40%" pressFunction={()=>buttonOneFunction(0, 55, 0)}/>
    
        <View>
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
    paddingTop: 42
  },
  SATcontainer: {
    fontSize: 23,
    fontWeight: 'bold',
    top: "-1%",
    width: "80%",
  }
});
