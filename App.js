
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';

import GameOverScreen from './screens/GameOverScreen'

import { StatusBar } from 'expo-status-bar';

import { LinearGradient } from 'expo-linear-gradient';

import { useState, useEffect, useCallback } from 'react';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);


const [userNumber, setUserNumber] = useState()
const [GameIsOver, setGameIsOver] = useState(true)
const [guessRounds, setGuessRounds] = useState(0)

const [fontsLoaded] = useFonts({
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
});

if(!fontsLoaded){
  return <AppLoading/>;
}

function pickedNumberHandler (pickedNumber){
  setUserNumber(pickedNumber)
  setGameIsOver(false)
}

function gameOverHandler(numberOfRounds){
  setGameIsOver(true)
  setGuessRounds(numberOfRounds)
}
function startNewGameHandler(){
  setUserNumber(null);
  setGuessRounds(0);
}
let screen = <StartGameScreen onPress={pickedNumberHandler}/>

if(userNumber){
  screen= <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
}

if(GameIsOver && userNumber){
  screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
}

  return (
    <>
    <StatusBar style='light'/>
 <LinearGradient colors={[Colors.primary700 , Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
        source={require('./assets/images/background.jpg')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.image}>
          
          {screen}
          {/* <SafeAreaView style={styles.rootScreen}>
           
           </SafeAreaView> */}
        </ImageBackground>
     
    </LinearGradient>
</>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
    paddingTop: Platform.OS === 'android' ? 15 : 0    
  },
  image:{
    opacity: 0.15
  }
});
