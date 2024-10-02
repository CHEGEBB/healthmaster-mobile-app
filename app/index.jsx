// app/index.js
import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View>
      <Text>Welcome to the App!</Text>
      {/* Link to Home Screen */}
      <Link href="/home" style={{ margin: 10, color: 'blue' }}>
        Go to Home
      </Link>
      {/* Link to Sign Up Screen */}
      <Link href="/sign-up" style={{ margin: 10, color: 'blue' }}>
        Go to Sign Up
      </Link>
    </View>
  );
}
