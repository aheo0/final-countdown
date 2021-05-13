import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';

export default function TeamsScreen() {
  const [screenChange, setScreenChange] = useState(false);
  const [subscreen, setSubscreen] = useState(['Teams']);
  const [screenData, setScreenData] = useState(false);
  const [teamSelectText, setTeamSelectText] = useState('');

  function updateScreen(type=false, title=false) {
    var temp = subscreen;

    if (type == 'add') {
      temp.push(title);
      setSubscreen(temp);
    } else if (type == 'remove') {
      temp.pop();
      setSubscreen(temp);
    } else if (type == 'set') {
      setSubscreen(title);
    }

    // Reset VEX DB Data
    if (subscreen.length <= 1) {
      setTeamSelectText('');
    }

    
    setScreenChange(!screenChange);
  }

  /*  -------------------------------------------------------------------------------------
    Main Teams Screen
  */
  function teamsScreenLoad() {
    var returnScreen = [];

    // Screen
    returnScreen.push(
      <View key={1}>
        <TouchableOpacity style={styles.app1} onPress={() => {updateScreen('add', 'Estimator');}}>
          <Image style={styles.appImage} source={require('../assets/images/robot-prod.png')}/>
          <Text style={styles.appTitle}>Match Estimator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.app2} onPress={() => {updateScreen('add', 'Analyzer');}}>
          <Image style={styles.appImage} source={require('../assets/images/robot-prod.png')}/>
          <Text style={styles.appTitle}>Team Analyzer</Text>
        </TouchableOpacity>
      </View>
    );

    return returnScreen;
  }

  function renderBackButton() {
    return(
      <TouchableOpacity key={0} style={styles.backButton} onPress={() => updateScreen('remove')}>
        <Text style={styles.backButtonText}>
          {'<'}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderTitle1(text) {
    return(
      <View key={1} style={styles.titleBox}>
        <Text style={styles.titleText}>{text}</Text>
      </View>
    );
  }

  // Collect Data on Team
  async function collectData(team) {
    if (team == '') {
      return false;
    }

    let vexdbData = await fetch(
      'https://api.vexdb.io/v1/get_rankings?season=Tower%20Takeover&team=' + team
    );

    jsonData = await vexdbData.json();
    return jsonData;
  }

  async function formatTeamData(team) {
    dbData = await collectData(team);

    // Team doesn't exist
    if (dbData['size'] == 0 || !dbData) {
      console.log(':(');
      return false;
    } else {
      // Team does exist
      var data = {
        "ap": [],
        "ccwm": [],
        "division": [],
        "dpr": [],
        "losses": [],
        "max_score": [],
        "opr": [],
        "rank": [],
        "sku": [],
        "sp": [],
        "team": [],
        "ties": [],
        "trsp": [],
        "wins": [],
        "wp": []
      }
  
      for (var i=0; i < dbData['size']; i++) {
        for (var j in data) {
          var temp = data[j];
          temp.unshift(dbData['result'][i][j]);
          data[j] = temp;
        }
      }
  
      return data;
    }
  }

  /*  -------------------------------------------------------------------------------------
    Match Estimator
  */
  function MatchEstimatorScreen() {
    var renderScreen = [];
    renderScreen.push(renderTitle1('Match Estimator'));
    renderScreen.push(renderBackButton());

    return renderScreen;
  }

  /*  -------------------------------------------------------------------------------------
    Team Analyzer
  */
  async function searchTeam(team) {
    data = await formatTeamData(team);

    // Team doesn't exist
    if (!data) {
      setScreenData('team does not exist');
      updateScreen();
    } else {
      // Team does exist
      setScreenData(data);
      updateScreen('add', [team, 'rank', 'chart']);
    }
  }

  function renderTeamsSelectScreen() {
    return (
      <View key={2} style={analyzerStyles.teamsSelect}>
        <Text style={analyzerStyles.teamsSelectText}>
          SEASON:
        </Text>
        <Text style={analyzerStyles.teamsSelectLargeText}>
          Tower Takeover &lt;2019&gt;
        </Text>
        <View style={analyzerStyles.teamsSelectBreak}></View>
        <Text style={analyzerStyles.teamsSelectText}>
          TEAM NAME:
        </Text>
        <TextInput
          style = {analyzerStyles.teamsSelectInput}
          placeholder = "Team Name"
          onChangeText = {(text) => setTeamSelectText(text)}
          value = {teamSelectText}
        />
        <TouchableOpacity style={analyzerStyles.teamsSelectSearch} onPress={() => searchTeam(teamSelectText)}>
          <Text style={analyzerStyles.teamsSelectSearchText}>
            SEARCH
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTeamAnalyzerTab(selectedTab) {
    function renderIndividualTab(index, text) {
      return(
        <TouchableOpacity
          key = {parseFloat('3.' + (index+1).toString())}
          style = {styleTab}
          onPress = {() => {
            subscreen[2][1] = text;
            updateScreen();
          }}>
          <Text>
            {text.toUpperCase()}
          </Text>
        </TouchableOpacity>
      );
    }
    var tabs = ['rank', 'ccwm', 'win-ratio', 'opr', 'score'];

    const selectedIndex = tabs.indexOf(selectedTab);
    returnTabs = [];

    for (var i=0; i < tabs.length; i++) {
      var styleTab;
      if (i == selectedIndex) {
        styleTab = analyzerStyles.tabTextSelected;
      } else {
        styleTab = analyzerStyles.tabText;
      }

      returnTabs.push(renderIndividualTab(i, tabs[i]));
    }
    
    return (
      <View key={2} style={analyzerStyles.tabBar}>
        <Text key={3.0} style={analyzerStyles.tabTeamText}>
          DATA FOR TEAM {teamSelectText}
        </Text>
        <View style={analyzerStyles.tabFlex}>
          {returnTabs}
        </View>
      </View>
    );
  }

  function renderGraph(stat) {
    const chartConfig = {
			backgroundGradientFrom: '#fff',
			backgroundGradientTo: '#fff',
			color: (opacity = 1) => `rgba(71, 71, 71, ${opacity})`,
      strokeWidth: 2,
      decimalPlaces: 2
    }
    
    if (stat == 'rank') {
      rankData = [...screenData['rank']];
      for (var i=0; i < rankData.length; i++) {
        rankData[i] *= -1;
      }

      chartConfig['decimalPlaces'] = 0;
      return(
        <View key={4}>
          <Text style={analyzerStyles.chartDescription}>
            Rank at competitions before elliminations are displayed.
          </Text>
          <LineChart
            data={{
              datasets: [{
                data: rankData
              }]
            }}
            width = {340}
            height = {320}
            chartConfig = {chartConfig}
            
            formatYLabel = {(data) => {
              return parseFloat(-1 * data);
            }}
            style = {{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } else if (stat == 'ccwm') {
      return(
        <View key={4}>
          <Text style={analyzerStyles.chartDescription}>
            Description for ccwm.
          </Text>
          <LineChart
            data={{
              datasets: [{
                data: screenData['ccwm']
              }]
            }}
            width = {340}
            height = {320}
            chartConfig = {chartConfig}
            
            yLabelsOffset = {5}
            style = {{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } else if (stat == 'win-ratio') {
      var scores = [];
      
      for (var i=0; i < screenData['wins'].length; i++) {
        var tempScore;
        var wins = screenData['wins'][i];
        var ties = screenData['ties'][i];
        var losses = screenData['losses'][i];

        teamScore = (wins + 0.5 * ties) / (wins + ties + losses);
        scores.push(teamScore);
      }

      return(
        <View key={4}>
          <Text style={analyzerStyles.chartDescription}>
            (# of wins) / (# of matches). Losses are weighted half a win.
          </Text>
          <LineChart
            data={{
              datasets: [{
                data: scores
              }]
            }}
            width = {340}
            height = {320}
            chartConfig = {chartConfig}
            
            yLabelsOffset = {5}
            style = {{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } else if (stat == 'opr') {
      return(
        <View key={4}>
          <Text style={analyzerStyles.chartDescription}>
            Description for opr.
          </Text>
          <LineChart
            data={{
              datasets: [{
                data: screenData['opr']
              }]
            }}
            width = {340}
            height = {320}
            chartConfig = {chartConfig}
            
            yLabelsOffset = {5}
            style = {{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } else if (stat == 'score') {
      return(
        <View key={4}>
          <Text style={analyzerStyles.chartDescription}>
            Highest score obtained during a match.
          </Text>
          <LineChart
            data={{
              datasets: [{
                data: screenData['max_score']
              }]
            }}
            width = {340}
            height = {320}
            chartConfig = {chartConfig}
            
            yLabelsOffset = {5}
            style = {{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    }
  }

  function TeamAnalyzerScreen() {
    var renderScreen = [];
    renderScreen.push(renderTitle1('Team Analyzer'));
    renderScreen.push(renderBackButton());

    if (subscreen.length == 2) {
      renderScreen.push(renderTeamsSelectScreen());
    } else {
      renderScreen.push(renderTeamAnalyzerTab(subscreen[2][1]));

      if (subscreen[2][2] == 'stats') {

      } else if (subscreen[2][2] == 'chart') {
        renderScreen.push(renderGraph(subscreen[2][1]));
      }
    }

    return renderScreen;
  }

  function displayScreen() {
    if (subscreen.length == 1) {
      return teamsScreenLoad();
    } else if (subscreen[1] == 'Estimator') {
      return MatchEstimatorScreen();
    } else if (subscreen[1] == 'Analyzer') {
      return TeamAnalyzerScreen();
    }
  }

  return (
    <ScrollView scrollEnabled={false} >    
      <View style={styles.container}>
        {displayScreen()}
      </View>
    </ScrollView>
  );
}

TeamsScreen.navigationOptions = {
  title: 'Teams',
};

/* Main StyleSheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  // First App
  app1: {
    marginTop: 43,

    marginLeft: 77,
    marginRight: 77,
    padding: 13,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 3
  },

  // Second App
  app2: {
    marginTop: 43,

    marginLeft: 77,
    marginRight: 77,
    padding: 13,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 3
  },

  // App Specifics
  appImage: {
    margin: 5
  },

  appTitle: {
    padding: 7,

    fontFamily: 'Ubuntu',
    fontSize: 18
  },

  // Back Button
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

  // Title Text
  titleBox: {
    padding: 13,
    backgroundColor: '#efefef'
  },

  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu'
  }
});

/* Team Analyzer StyleSheet */
const analyzerStyles = StyleSheet.create({
  teamsSelect: {
    margin: 20
  },

  teamsSelectText: {
    margin: 5,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 9
  },

  teamsSelectLargeText: {
    margin: 8,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu'
  },

  teamsSelectBreak: {
    height: 20
  },

  teamsSelectInput: {
    margin: 8,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu'
  },

  teamsSelectSearch: {
    marginTop: 42,
    marginLeft: 40,
    marginRight: 40,
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1
  },

  teamsSelectSearchText: {
    margin: 8,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu'
  },

  tabBar: {
    backgroundColor: '#ccc',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 3,
    paddingBottom: 3
  },

  tabFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  tabText: {
    margin: 3,
    padding: 5,
    borderColor: '#232323',
    borderWidth: 1,
    borderRadius: 5
  },

  tabTextSelected: {
    margin: 3,
    padding: 5,
    borderColor: '#3454d1',
    borderWidth: 1,
    borderRadius: 5,

    color: '#3454d1',
  },

  tabTeamText: {
    fontSize: 12,
    color: '#232323',

    margin: 3,
    paddingLeft: 4
  },

  chartDescription: {
    margin: 20,
    padding: 14,

    color: '#141414',
    fontFamily: 'Ubuntu',
    fontSize: 15,

    backgroundColor: '#efefef',
    borderRadius: 15
  }
});