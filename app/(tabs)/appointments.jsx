// Use this for index.jsx, appointments.jsx, and myMeds.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2D', 

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});