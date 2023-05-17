import {Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
function InstructionText({children, style}) {
 return(
    <Text style={[styles.InstructionsText, style]}>{children}</Text>
 )   
}

export default InstructionText;

const styles = StyleSheet.create({
    InstructionsText:{
        fontFamily:'open-sans',
        color: Colors.accent500,
        fontSize:24
    }
})