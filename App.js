import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,Platform } from 'react-native';
import {Focus} from './src/Fetaure/Focus/Focus';
import {FocusHistory} from './src/Fetaure/Focus/FocusHistory'
import {Timer} from './src/Fetaure/Timer/Timer';
import {color} from './src/Utilis/color'
import {spacing} from './src/Utilis/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [focusSubject, setFocusSubjet] = useState(null);
  const [focusHistory,setFocusHistory] = useState([])
  const STATUES ={
    COMPLETE: 1,
    CANCLED:2
  }
 const addFocusHistorySubjectWithStae=(subjet,state)=>{
   setFocusHistory([...focusHistory,{key:String(focusHistory.length+1), subjet,state}])
 }
  const onClear=()=>{
    setFocusHistory([]);
  }

  const saveFocusHistory = async()=>{
    try{
      await AsyncStorage.setItem('focusHistory',JSON.stringify(focusHistory));
    }catch(e){
      console.log(e)
    }
  }

  const loadFocusHistory=async()=>{
    try{
      const history = await AsyncStorage.getItem('focusHistory');
      if( history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    loadFocusHistory();
  },[])

  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
       <Timer focusSubject={focusSubject} onTimerEnd={()=>{
         addFocusHistorySubjectWithStae(focusSubject,STATUES.COMPLETE)
         setFocusSubjet(null); 
       }}
       clearSubject={()=>{
       addFocusHistorySubjectWithStae(focusSubject,STATUES.CANCLED)
       setFocusSubjet(null)
       }}
       />
      ) : (
        <View style={{flex:1}}>
        <Focus addSubject={setFocusSubjet}/>
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.xxxxl : spacing.xxl,
    backgroundColor:color.darkBlue
  },
});
