import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { fontSize, spacing } from '../../Utilis/config';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.state)}>{item.subjet}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Things we've Focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                title="clear"
                size={75}
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (state) => ({
    color: state > 1 ? 'red' : 'green',
    fontSize: fontSize.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSize.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
