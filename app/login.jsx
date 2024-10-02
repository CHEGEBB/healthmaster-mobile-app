import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
