import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


export default function Dashboard() {
  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }}/>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E383F', 

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});