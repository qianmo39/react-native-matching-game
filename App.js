import React, {Component} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Card from './components/Card';

class App extends Component {
  state = {
    cardSymbols: ['😅', '😍', '💩', '😴', '👻', '😈', '💣', '😎'],
    cardSymbolsInRand: [],
    isOpen: [],
    firstPickedIndex: null,
    secondPickedIndex: null,
    steps: 0,
    isEnded: null,
  };

  initGame = () => {
    let newCardSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols];
    let cardSymbolsInRand = this.shuffleArray(newCardSymbols);
    let isOpen = [];

    this.setState({
      cardSymbolsInRand,
      isOpen,
    });
  };

  resetGame = () => {
    this.initGame();
    this.setState({
      isOpen: [],
      firstPickedIndex: null,
      secondPickedIndex: null,
      steps: 0,
      isEnded: null,
    });
  };

  componentDidMount() {
    this.initGame();
  }

  cardPressHandler = index => {
    if (this.state.isOpen[index]) {
      return;
    }
    let isOpen = [...this.state.isOpen];
    isOpen[index] = true;

    if (
      this.state.firstPickedIndex == null &&
      this.state.secondPickedIndex == null
    ) {
      let firstPickedIndex = index;
      this.setState({
        firstPickedIndex,
      });
    } else if (
      this.state.firstPickedIndex != null &&
      this.state.secondPickedIndex == null
    ) {
      let secondPickedIndex = index;
      this.setState({
        secondPickedIndex,
      });
    }
    this.setState({
      steps: this.state.steps + 1,
      isOpen,
    });
  };

  calculateGameResult = () => {
    let totalOpen = this.state.isOpen.filter(isOpen => isOpen);
    if (totalOpen.length == this.state.cardSymbolsInRand.length) {
      this.setState({
        isEnded: true,
      });
    }
    if (this.state.secondPickedIndex != null) {
      let firstSymbol =
        this.state.cardSymbolsInRand[this.state.firstPickedIndex];
      let isOpen = [...this.state.isOpen];
      let secondSymbol =
        this.state.cardSymbolsInRand[this.state.secondPickedIndex];
      if (firstSymbol != secondSymbol) {
        setTimeout(() => {
          isOpen[this.state.firstPickedIndex] = null;
          isOpen[this.state.secondPickedIndex] = null;
          this.setState({
            isOpen,
            firstPickedIndex: null,
            secondPickedIndex: null,
          });
        }, 1000);
      } else {
        this.setState({
          firstPickedIndex: null,
          secondPickedIndex: null,
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.secondPickedIndex != prevState.secondPickedIndex) {
      this.calculateGameResult();
    }
  }

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
            <Text style={styles.footerText}>
              {this.state.isEnded
                ? `you have completed this game in ${this.state.steps} steps`
                : `You have tried ${this.state.steps} times.`}
            </Text>
            {this.state.isEnded ? (
              <TouchableOpacity onPress={this.resetGame}>
                <Text>Try again!</Text>
              </TouchableOpacity>
            ) : null}
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
    fontSize: 16,
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
