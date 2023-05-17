import {Text, StyleSheet, Platform} from 'react-native'
import Colors from '../../constants/colors'
function Title({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}
export default Title;

const styles= StyleSheet.create({
    title: {
        fontFamily:'open-sans-bold',
        padding: 12,
        fontSize:24,
        
        color: 'white',
        textAlign:'center',
        borderWidth: 0
        borderColor: 'white' ,
        maxWidth: '80%',
        width: 300
      }
}
    
)