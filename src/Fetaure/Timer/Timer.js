import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { Countdown } from '../../components/Countdown';
import { color } from '../../Utilis/color';
import { spacing } from '../../Utilis/config';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, onTimerEnd,clearSubject}) => {
  useKeepAwake();
  const defaultTime = 0.1;
  const [minutes, setMinutes] = useState(defaultTime);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const onEnd = () => {
    vibrate();
    setMinutes(defaultTime);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 15 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubjet}>
        <RoundedButton 
        title="-"
        size={60}
        onPress={() =>
        clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: color.white,
    textAlign: 'center',
  },
  task: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjet:{
    paddingBottom:50,
    paddingLeft:50
  }
});
