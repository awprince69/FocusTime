import React,{useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton'
import {fontSize, spacing} from '../../Utilis/config'
import {color} from '../../Utilis/color'
export function Focus({addSubject}) {
  const [subjet,setsubject] = useState(null)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What do you want to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput style={{flex:1,marginRight:20}}
          onSubmitEditing = {
            ({ nativeEvent})=>{
              setsubject(nativeEvent.text)
            }
            }
           />
          <RoundedButton size={50} title='+'
          onPress ={()=>{
            addSubject(subjet)
          }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 0.5,
    padding:spacing.md,
    justifyContent:'center'
  },
  title:{
    fontSize:fontSize.lg,
    fontWeight:'bold',
    color:color.white
  },
  inputContainer:{
    paddingTop:spacing.md,
    flexDirection:'row'
  }
});
