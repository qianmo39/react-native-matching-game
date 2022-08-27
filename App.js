import React, {Component} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Card from './components/Card';

class App extends Component {
  state = {
    cardSymbols: ['😅', '😍', '💩', '😴', '👻', '😈', '💣', '😎'],
    cardSymbolsInRand: [],
    isOpen: [],
  };

  componentDidMount() {
    let newCardSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols];
    let cardSymbolsInRand = this.shuffleArray(newCardSymbols);
    let isOpen = [];

    this.setState({
      cardSymbolsInRand,
      isOpen,
    });
  }

  cardPressHandler = index => {
    let isOpen = [...this.state.isOpen];
    isOpen[index] = true;

    this.setState({
      isOpen,
    });
  };

  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
  };
  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Matching Game</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.gameBoard}>
              {this.state.cardSymbolsInRand.map((symbol, index) => (
                <Card
                  key={index}
                  onPress={() => this.cardPressHandler(index)}
                  style={styles.button}
                  title={symbol}
                  cover="❓"
                  isShow={this.state.isOpen[index]}
                />
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Footer text</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 3,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 20,
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#ccc',
    width: 48,
    height: 48,
    margin: (Dimensions.get('window').width - 48 * 4) / (5 * 2),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
