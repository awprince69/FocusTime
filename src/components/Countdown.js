import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSize } from '../Utilis/config';
import { color } from '../Utilis/color';
import { spacing } from '../Utilis/config';

const minuteToMilis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused,onProgress,onEnd }) => {

  const interval = React.useRef(null)
  const [milis, setMilis] = useState(null);
  const Countdown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft
    });
  };
  useEffect(()=>{
    setMilis(minuteToMilis(minutes))
  },[minutes])
  useEffect(()=>{
    onProgress(milis / minuteToMilis(minutes))
    if(milis === 0 ){
        onEnd();
    }
  },[milis])
 useEffect(()=>{
   if(isPaused){
     if(interval.current) clearInterval(interval.current)
     return;
   }
   interval.current = setInterval(Countdown,1000)
   return ()=> clearInterval(interval.current)
 },[isPaused])

  

  const minute = Math.floor(milis / 1000 / 60) % 60;
  const seconds = Math.floor(milis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxxl,
    fontWeight: 'bold',
    color: color.white,
    padding: spacing.md,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
