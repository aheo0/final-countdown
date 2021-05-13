import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function InGameStratsScreen() {
  const [screenChange, setScreenChange] = useState(false);
  const [teamColor, setTeamColor] = useState('blue');
  const [redOrangeCube, setRedOrangeCube] = useState(0);
  const [redGreenCube, setRedGreenCube] = useState(0);
  const [redPurpleCube, setRedPurpleCube] = useState(0);
  const [blueOrangeCube, setBlueOrangeCube] = useState(0);
  const [blueGreenCube, setBlueGreenCube] = useState(0);
  const [bluePurpleCube, setBluePurpleCube] = useState(0);
  const [towerOrangeCube, setTowerOrangeCube] = useState(0);
  const [towerGreenCube, setTowerGreenCube] = useState(0);
  const [towerPurpleCube, setTowerPurpleCube] = useState(0);

  const [redScore, setRedScore] = useState(' 0');
  const [blueScore, setBlueScore] = useState(' 0');

  const [cubeClicker, setCubeClicker] = useState(true);
  const [timer, setTimer] = useState(60);
  const [timerID, setTimerID] = useState(null);
  const [strategies, setStrategies] = useState([]);

  var trackTimer = 60;
  var tempTimerID;

  async function stratDeterminer() {
    trackTimer--;
    setTimer(trackTimer);

    strats = ['Strategy: '];
    
    strats.push('Pray for a miracle.');

    setStrategies(strats);

    if (trackTimer == 0) {
      console.log('stopping');
      console.log(tempTimerID);
      clearInterval(tempTimerID);
    }
  }

  const updateScreen = async (type=false, info=null) => {
    if (type == 'cubes') {
      var orangeMult = towerOrangeCube + 1;
      var greenMult = towerGreenCube + 1;
      var purpleMult = towerPurpleCube + 1;

      var redOrange = redOrangeCube;
      var redGreen = redGreenCube;
      var redPurple = redPurpleCube;

      var blueOrange = blueOrangeCube;
      var blueGreen = blueGreenCube;
      var bluePurple = bluePurpleCube;

      if (info[0] == 'blue') {
        if (info[1] == 'orange') {
          if (info[2] == 'add') {
            blueOrange++;
          } else {
            blueOrange--;
          }
        } else if (info[1] == 'green') {
          if (info[2] == 'add') {
            blueGreen++;
          } else {
            blueGreen--;
          }
        } else {
          if (info[2] == 'add') {
            bluePurple++;
          } else {
            bluePurple--;
          }
        }
      } else if (info[0] == 'red') {
        if (info[1] == 'orange') {
          if (info[2] == 'add') {
            redOrange++;
          } else {
            redOrange--;
          }
        } else if (info[1] == 'green') {
          if (info[2] == 'add') {
            redGreen++;
          } else {
            redGreen--;
          }
        } else {
          if (info[2] == 'add') {
            redPurple++;
          } else {
            redPurple--;
          }
        }
      } else {
        if (info[1] == 'orange') {
          if (info[2] == 'add') {
            orangeMult++;
          } else {
            orangeMult--;
          }
        } else if (info[1] == 'green') {
          if (info[2] == 'add') {
            greenMult++;
          } else {
            greenMult--;
          }
        } else {
          if (info[2] == 'add') {
            purpleMult++;
          } else {
            purpleMult--;
          }
        }
      }

      setRedScore(' ' + parseFloat(redOrange * orangeMult + redGreen * greenMult + redPurple * purpleMult));
      setBlueScore(' ' + parseFloat(blueOrange * orangeMult + blueGreen * greenMult + bluePurple * purpleMult));

    } else if (type == 'timer') {
      await stratDeterminer();
    }

    setScreenChange(!screenChange);
  };

  function renderCube(team, color) {
    renderCubeSet = [];

    if (color == 'orange') {
      renderCubeSet.push(
        <Image key={'image'} style={styles.cubeImage} source={require('../assets/images/orangecube.png')}/>
      );

      if (team == 'blue') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{blueOrangeCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueOrangeCube + redOrangeCube + towerOrangeCube < 22) {
                setBlueOrangeCube(blueOrangeCube + 1);
                updateScreen('cubes', ['blue', 'orange', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (blueOrangeCube > 0) {
                setBlueOrangeCube(blueOrangeCube - 1);
                updateScreen('cubes', ['blue', 'orange', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'red') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{redOrangeCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueOrangeCube + redOrangeCube + towerOrangeCube < 22) {
                setRedOrangeCube(redOrangeCube + 1);
                updateScreen('cubes', ['red', 'orange', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (redOrangeCube > 0) {
                setRedOrangeCube(redOrangeCube - 1);
                updateScreen('cubes', ['red', 'orange', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'tower') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{towerOrangeCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueOrangeCube + redOrangeCube + towerOrangeCube < 22 && towerOrangeCube + towerPurpleCube + towerGreenCube < 7) {
                setTowerOrangeCube(towerOrangeCube + 1);
                updateScreen('cubes', ['tower', 'orange', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (towerOrangeCube > 0) {
                setTowerOrangeCube(towerOrangeCube - 1);
                updateScreen('cubes', ['tower', 'orange', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      }

    } else if (color == 'green') {
      renderCubeSet.push(
        <Image key={'image'} style={styles.cubeImage} source={require('../assets/images/greencube.png')}/>
      );
      
      if (team == 'blue') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{blueGreenCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueGreenCube + redGreenCube + towerGreenCube < 22) {
                setBlueGreenCube(blueGreenCube + 1);
                updateScreen('cubes', ['blue', 'green', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (blueGreenCube > 0) {
                setBlueGreenCube(blueGreenCube - 1);
                updateScreen('cubes', ['blue', 'green', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'red') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{redGreenCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueGreenCube + redGreenCube + towerGreenCube < 22) {
                setRedGreenCube(redGreenCube + 1);
                updateScreen('cubes', ['red', 'green', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (redGreenCube > 0) {
                setRedGreenCube(redGreenCube - 1);
                updateScreen('cubes', ['red', 'green', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'tower') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{towerGreenCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (blueGreenCube + redGreenCube + towerGreenCube < 22 && towerOrangeCube + towerPurpleCube + towerGreenCube < 7) {
                setTowerGreenCube(towerGreenCube + 1);
                updateScreen('cubes', ['tower', 'green', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (towerGreenCube > 0) {
                setTowerGreenCube(towerGreenCube - 1);
                updateScreen('cubes', ['tower', 'green', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      }
      
    } else if (color == 'purple') {
      renderCubeSet.push(
        <Image key={'image'} style={styles.cubeImage} source={require('../assets/images/purplecube.png')}/>
      );
      
      if (team == 'blue') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{bluePurpleCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (bluePurpleCube + redPurpleCube + towerPurpleCube < 22) {
                setBluePurpleCube(bluePurpleCube + 1);
                updateScreen('cubes', ['blue', 'purple', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (bluePurpleCube > 0) {
                setBluePurpleCube(bluePurpleCube - 1);
                updateScreen('cubes', ['blue', 'purple', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'red') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{redPurpleCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (bluePurpleCube + redPurpleCube + towerPurpleCube < 22) {
                setRedPurpleCube(redPurpleCube + 1);
                updateScreen('cubes', ['red', 'purple', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (redPurpleCube > 0) {
                setRedPurpleCube(redPurpleCube - 1);
                updateScreen('cubes', ['red', 'purple', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      } else if (team == 'tower') {
        renderCubeSet.push(
          <View key={'count'} style={styles.cubeText}>
            <Text style={styles.cubeTextText}>{towerPurpleCube}</Text>
          </View>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'plus'} style={styles.plusButton}
            onPress={() => {
              if (bluePurpleCube + redPurpleCube + towerPurpleCube < 22 && towerOrangeCube + towerPurpleCube + towerGreenCube < 7) {
                setTowerPurpleCube(towerPurpleCube + 1);
                updateScreen('cubes', ['tower', 'purple', 'add']);
              }
            }}
          >
            <Text>+</Text>
          </TouchableOpacity>
        );
        renderCubeSet.push(
          <TouchableOpacity key={'minus'} style={styles.minusButton}
            onPress={() => {
              if (towerPurpleCube > 0) {
                setTowerPurpleCube(towerPurpleCube - 1);
                updateScreen('cubes', ['tower', 'purple', 'minus']);
              }
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
        );
      }
    }
    

    keyDict = ['redandorange', 'redandgreen', 'redandpurple', 'blueandorange', 'blueandgreen', 'blueandpurple', 'towerandorange', 'towerandgreen', 'towerandpurple'];

    return(
      <View key={keyDict.indexOf(team + 'and' + color)} style={styles.cubeSet}>
        {renderCubeSet}
      </View>
    );


  }

  function renderField() {
    renderScreens = []

    if (!teamColor) {
      renderScreens.push(
        <Text>hi</Text>
      );
    }

    else {
      function top() {
        function renderTimer() {
          async function startTimer() {
            if (!timerID) {
              const setTimeIntervalFunction = async () => {await stratDeterminer();};
              tempTimerID = setInterval(setTimeIntervalFunction, 1000);
              setTimerID(tempTimerID);
            }
          }

          if (!timerID) {
            return(
              <TouchableOpacity key={'timer'} onPress={async () => {await startTimer()}}>
                <Text style={styles.timerText}>60</Text>
              </TouchableOpacity>
            );
          } else if (timer == 0) {
            return(
              <Text key={'timer'} style={styles.timerFinishedText}>00</Text>
            );
          } else {
            return(
              <Text key={'timer'} style={styles.timerText}>{timer}</Text>
            );
          }
        }

        function renderBlueScore() {
          return(
            <View key={'topScore'}>
              <Text style={styles.topScore}>
                <Text style={{color: '#4d4dff'}}>{blueScore}</Text>
                <Text>   </Text>
                <Text style={{color: '#ff4d4d'}}>{redScore}</Text>
              </Text>
            </View>
          );
        }

        function renderRedScore() {
          return(
            <View key={'topScore'} style={styles.topScore}>
              <Text>
                <Text style={{color: '#ff4d4d'}}>{redScore}</Text>
                <Text>   </Text>
                <Text style={{color: '#4d4dff'}}>{blueScore}</Text>
              </Text>
            </View>
          );
        }

        var scores = [];

        scores.push(renderTimer());

        if (teamColor == 'blue') {
          scores.push(renderBlueScore());
        }
        else {
          scores.push(renderRedScore());
        }

        return(
          <View key={'top'} style={styles.fieldTop}>
            {scores}
          </View>
        );
      };

      function towers() {
        return(
          <View key={'towers'} style={styles.towers}>
            <Image style={styles.towerImage} source={require('../assets/images/greencube.png')}/>
            {renderCube('tower', 'orange')}
            {renderCube('tower', 'green')}
            {renderCube('tower', 'purple')}
          </View>
        );
      }

      function blueField() {
        return(
          <LinearGradient
            key={'blueField'}
            style={styles.blueField}
            colors={['#6666ff', '#b3b3ff']}>
            {renderCube('blue', 'orange')}
            {renderCube('blue', 'green')}
            {renderCube('blue', 'purple')}
          </LinearGradient>
        );
      };

      function redField() {
        return(
          <LinearGradient
            key={'redField'}
            style={styles.redField}
            colors={['#ff6666', '#ffb3b3']}>
            {renderCube('red', 'orange')}
            {renderCube('red', 'green')}
            {renderCube('red', 'purple')}
          </LinearGradient>
        );
      };

      function stratBox() {
        renderStrats = [];

        for (var i=0; i < strategies.length; i++) {
          renderStrats.push(
            <Text key={'strats' + parseFloat(i+1)} style={styles.stratText}>
              {strategies[i]}
            </Text>
          );
        }

        return(
          <View key={'stratBox'} style={styles.stratBox}>
            {renderStrats}
          </View>
        );
      };

      renderScreens.push(top());
      if (teamColor == 'blue') {
        renderScreens.push(blueField());
        renderScreens.push(towers());
        renderScreens.push(redField());
      }
      else { // will not be available in the prototype version
        renderScreens.push(redField());
        renderScreens.push(towers());
        renderScreens.push(blueField());
      }
      renderScreens.push(stratBox());
    }

    return renderScreens;
  }

  return (
    <ScrollView style={styles.container}>
      {renderField()}
    </ScrollView>
  );
}

InGameStratsScreen.navigationOptions = {
  title: 'In Game Strategy Calculator',
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  /* Field Top */
  fieldTop: {
    height: 50,
    backgroundColor: '#cfdbd5'
  },

  timerText: {
    position: 'absolute',
    fontSize: 27,
    marginTop: 6,
    marginLeft: 130,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#323232',

    backgroundColor: '#bebebe',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#323232',

    width: 48,
    textAlign: 'right',
    //fontFamily: 'Ubuntu'
  },

  timerFinishedText: {
    position: 'absolute',
    fontSize: 27,
    marginTop: 6,
    marginLeft: 130,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#eeeeee',

    backgroundColor: '#bebebe',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#323232',

    width: 48,
    textAlign: 'right',
    //fontFamily: 'Ubuntu'
  },

  topScore: {
    position: 'absolute',
    height: 50,
    marginLeft: 263,
    marginTop: 8,

    fontSize: 27
  },

  /* Red Field */
  redField: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingLeft: 60,
    height: 110,
  },

  /* Blue Field */
  blueField: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    paddingLeft: 60,
    height: 110,
  },

  /* Towers */
  towers: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    height: 110,
    backgroundColor: '#eeeeec'
  },

  towerImage: {
    width: 60,
    height: 60,
    marginTop: 23,
    marginLeft: 9,
    marginRight: -9
  },

  /* Strat Box */
  stratBox: {
    height: 95,
    backgroundColor: '#cfdbd5'
  },

  stratText: {
    margin: 4,

    fontFamily: 'Ubuntu'
  },

  /* Cube Set */
  cubeSet: {
    marginTop: 13,
    marginLeft: 18,
  },
  
  cubeImage: {
    width: 80,
    height: 80,

    borderRadius: 30
  },

  cubeText: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80
  },

  cubeTextText: {
    fontSize: 40,
    color: '#444',
    fontFamily: 'Ubuntu',
  },

  plusButton: {
    width: 25,
    height: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    borderRadius: 45,
    borderColor: '#111',
    borderWidth: 1,
    backgroundColor: '#95e8f5',
    color: '#111',

    position: 'absolute',
    marginTop: -3,
    marginLeft: 59
  },

  minusButton: {
    width: 25,
    height: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    borderRadius: 45,
    borderColor: '#111',
    borderWidth: 1,
    backgroundColor: '#95e8f5',
    color: '#111',

    position: 'absolute',
    marginTop: 59,
    marginLeft: -3
  },
});