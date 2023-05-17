import { useState } from 'react' 
import 
{
    TextInput, 
    View, 
    StyleSheet, 
    Text, 
    Alert, 
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import Colors from '../constants/colors'
import Card from '../compnents/ui/Card';
import Title from '../compnents/ui/Title';
import PrimaryButton from '../compnents/ui/PrimaryButton';
import InstructionText from '../compnents/ui/InstructionText';


function StartGameScreen({onPress}) {
    const [enteredNumber, setEnteredNumber] = useState('')
    const {width, height} = useWindowDimensions()
    const marginTopDistance = height < 380 ? 30 : 100
        

    function numberInputHandler (enteredText){
        setEnteredNumber((enteredText))
    }
    function resetInputHandler(){
        setEnteredNumber('')
    }

    function confirmInputHandler(){
        const choseNumber=parseInt(enteredNumber)

        if(isNaN(choseNumber) || choseNumber <=0 || choseNumber > 99){
            Alert.alert('Invalid Number!',
            'Number has to be a number between 1 and 99.',
            [{text: 'Onkay', style:'destructive', onPress: resetInputHandler}])
        return;
        }
        onPress(choseNumber);
    }
  return (
    <ScrollView style={styles.screen}>
<KeyboardAvoidingView style={styles.screen} behavior='position'>
    <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
        <Title>Guess My Number</Title>
    <Card>

        <InstructionText>Enter a Number</InstructionText>

        <TextInput style={styles.numberInput} 
        maxLength={2}
        keyboardType= 'number-pad'
        autoCapitalize= 'none'
        autoCorrect= {false}
        onChangeText={numberInputHandler}
        value={enteredNumber}/>

        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
           <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
           </View>
        </View>
    </Card>
    
    </View>
</KeyboardAvoidingView>
</ScrollView>
    );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height

const styles= StyleSheet.create({
    screen:{
        flex:1
    },
    rootContainer:{
        flex:1,
        // marginTop: marginTopDistance,
        alignItems:'center'
    },

    numberInput:{
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex: 1
    }

})
