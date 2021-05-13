import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

export default function ScoutingScreen() {
  const [screenChange, setScreenChange] = useState(false);
  const [newTeamInputText, setNewInputText] = useState('');
  const [teamScoutTextStack, setTeamScoutTextStack] = useState('');
  const [teamScoutTextAuton, setTeamScoutTextAuton] = useState('');
  const [teamScoutTextNotes, setTeamScoutTextNotes] = useState('');

  function updateScreen(type=false, title=false) {
    if (type == 'add') {
      screenInfo.push(title);
    }
    else if (type == 'remove') {
      screenInfo.pop();
    }
  
    setNewInputText('');
    setScreenChange(!screenChange);
  }

  function screenDisplay() {
    screenRender = [];
    if (screenInfo.length == 0) {
      screenRender.push(renderTitle('Competitions'));
  
      count = 0
      for (var i in scout_data) {
        screenRender.push(renderBox('comp', i, parseFloat('2.' + String(count+1))));
        count++;
      }
  
    }
  
    else if (screenInfo.length == 1) {
      screenRender.push(renderTitle(screenInfo[0]));
      screenRender.push(renderBackButton());

      count = 0
      for (var i in scout_data[screenInfo[0]]) {
        screenRender.push(renderBox('team', i, parseFloat('2.' + String(count+1))));
        count++;
      }

      screenRender.push(renderAddTeamButton());
    }

    else if (screenInfo.length == 2) {
      screenRender.push(renderTitle(screenInfo[1]));
      screenRender.push(renderBackButton());

      screenRender.push(renderEditTeamScout());
    }
  
    return screenRender;
  }

  function renderBackButton() {
    return(
      <TouchableOpacity key={0} style={styles.backButton} onPress={() => updateScreen('remove')}>
        <Text style={styles.backButtonText}>
          {'<'}
        </Text>
      </TouchableOpacity>
    )
  }

  function renderBox(type, title, key) {
    // if (type == 'comp') {
    if (true) {
      var boxStyle = styles.compBox;
      var boxTitle = styles.compName;
    }
  
    return(
      <TouchableOpacity key={key} style={boxStyle} onPress={() => updateScreen('add', title)}>
        <Text style={boxTitle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderAddTeamButton() {
    return(
      <View key={3}>
        <TextInput
          style = {styles.addTeamBox}
          placeholder = "+ Add Team"
          onChangeText = {(text) => setNewInputText(text)}
          value = {newTeamInputText}
        />
        <TouchableOpacity style={styles.addTeamButton} onPress={() => {addTeam(screenInfo[0], newTeamInputText); updateScreen();}}>
          <Text>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderEditTeamScout() {
    return(
      <View key={2}>
        <View style = {styles.teamScoutInfo}>
          <Text style={styles.teamScoutInfoText}>Stack Size: </Text>
          <TextInput
            style = {styles.teamScoutInfoInputText}
            placeholder = {teamScoutTextStack == '' ? 'Type here' : teamScoutTextStack}
            onChangeText = {(text) => setTeamScoutTextStack(text)}
            value = {teamScoutTextStack}
          />
        </View>

        <View style = {styles.teamScoutInfo}>
          <Text style={styles.teamScoutInfoText}>Auton: </Text>
          <TextInput
            style = {styles.teamScoutInfoInputText}
            placeholder = {teamScoutTextAuton == '' ? 'Type here' : teamScoutTextAuton}
            onChangeText = {(text) => setTeamScoutTextAuton(text)}
            value = {teamScoutTextAuton}
          />
        </View>

        <View style = {styles.teamScoutInfo}>
          <Text style={styles.teamScoutInfoText}>Notes: </Text>
          <TextInput
            style = {styles.teamScoutInfoInputText}
            placeholder = {teamScoutTextNotes == '' ? 'Type here' : teamScoutTextNotes}
            onChangeText = {(text) => setTeamScoutTextNotes(text)}
            value = {teamScoutTextNotes}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      { screenDisplay() }
    </ScrollView>
  );
}

ScoutingScreen.navigationOptions = {
  title: 'Scouting Notes',
};

var scout_data = {
  'DV': {
    '5327C': {
      'Stack Size': '',
      'Auton': '',
      'Notes': ''
    }
  },
  'Bellarmine': {},
  'BotB': {},
  'States': {},
  'Worlds': {}
};

var screenInfo = [];

function renderTitle(title) {
  return(
    <View key={1}>
      <Text style={styles.title}>
        { title }
      </Text>
    </View>
  )
}


function addTeam(comp, team) {
  scout_data[comp][team] = {
    'Stack Size': '',
    'Auton': '',
    'Notes': ''
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  title: {
    marginBottom: 15,
    padding: 13,
    paddingLeft: 60,
    backgroundColor: '#88c',

    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu'
  },

  backButton: {
    position: 'absolute',
    marginTop: 14,
    marginLeft: 16,

    height: 29,
    width: 29,

    borderWidth: 1,
    borderRadius: 15
  },

  backButtonText: {
    position: 'relative',
    top: -5,
    left: 6,

    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu'
  },

  compBox: {
    marginBottom: 6,
    padding: 15,
    paddingLeft: 60,
    backgroundColor: '#8c8',
    height: 70
  },

  compName: {
    fontSize: 28,
    color: '#4287f5'
  },

  addTeamBox: {
    marginTop: 6,
    padding: 13,
    paddingLeft: 85,
    backgroundColor: '#bbb',
    height: 50,

    fontSize: 23
  },

  addTeamButton: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 280,
    height: 33,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,

    fontSize: 18,
    borderRadius: 8,
    borderColor: '#595',
    borderWidth: 1
  },

  teamScoutInfo: {
    flex: 0,
    
    marginTop: 6,
    padding: 13,
    paddingLeft: 55,
    backgroundColor: '#4287f5',
    height: 92
  },

  teamScoutInfoText: {
    fontSize: 23,
    color: '#ebbd28'
  },

  teamScoutInfoInputText: {
    fontSize: 23,
    color: 'white'
  }
});