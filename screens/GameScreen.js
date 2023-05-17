import { useEffect, useState } from 'react';
import PrimaryButton from '../compnents/ui/PrimaryButton';
import 
{ 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  FlatList,
useWindowDimensions } from 'react-native'
import NumberContainer from '../compnents/game/NumberContainer'
import Title from '../compnents/ui/Title'
import Card from '../compnents/ui/Card';
import InstructionText from '../compnents/ui/InstructionText';
import {Ionicons} from '@expo/vector-icons'
import GuessLogItem from '../compnents/game/GuessLogItem'

function generateRandomBetween(min, max, exclude){
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if(rndNum === exclude){
    return generateRandomBetween(min , max, exclude);
  }
  else{
    return rndNum;
  }
}
let minBoundary=1
let maxBoundary=100

export default function GameScreen({userNumber, onGameOver}) {

  const initialGuess = generateRandomBetween
  ( 1, 
    100, 
    userNumber);
  
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds]= useState([initialGuess])
  const {width, height} = useWindowDimension() 
  
  useEffect(()=>{
  if(currentGuess === userNumber){
    onGameOver(guessRounds.length)
  }
},[currentGuess, userNumber, onGameOver])

useEffect(()=>{
  minBoundary=1;
  maxBoundary=100;
}, [])
  function nextGuessHandler(direction){// direction => 'lower' , 'Higher'
    if(
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ){
      Alert.alert("Don't lie ", "You know that this is wrong...",[
        {text: "Sorry!", style:'cancel'}
      ]);
      return;
    }

    if(direction === 'lower')
    {
      maxBoundary = currentGuess
    }
    else{
      minBoundary = currentGuess + 1
    }

    console.log(minBoundary, maxBoundary)

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber)
    setGuessRounds(previousGuessRounds => [newRndNumber, ...previousGuessRounds])
  }
  let content= <>
          <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Lower or Higher</InstructionText>
         <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />

              </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color="white" />
            </PrimaryButton>
          </View>
         </View>
    </Card>
    </>
if(width > 580){
  content =
        <>      
        <InstructionText style={styles.instructionText}>Lower or Higher</InstructionText>
<View style={styles.buttonsContainerWide}>
<View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />

              </PrimaryButton>
          </View>
          
          <NumberContainer>{currentGuess}</NumberContainer>
          
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color="white" />
            </PrimaryButton>
          </View>
</View>

      
    </>
}

  const guessRoundsListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
    {content}
    <View style={styles.listContainer}>
    <FlatList 
      data={guessRounds}
      renderItem={(itemData) =>{
        return <GuessLogItem roundNumber ={guessRoundsListLength - itemData.index} guess={itemData.item}/>      
      }}

      keyExtractor={(item)=>{
        return item
      }}
      />
  
    </View>
    </View>
  )
}

const styles=StyleSheet.create({
  screen:{
    flex: 1,
    padding: 24
  } ,
  instructionText:{
    marginBottom:12
  },
  buttonsContainer:{
    flexDirection:'row'
},
buttonsContainerWide:[
  flexDirection: 'row',
  alignItems: 'center'
],
buttonContainer:{
    flex: 1
},
listContainer:{
  flex: 1,
  padding:16
}
})