// app/home.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.TextHome}>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles= StyleSheet.create({
  TextHome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Kanit-Bold',
  },
})