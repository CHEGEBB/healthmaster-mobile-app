import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  return (
    <View>
      <Text>Signup Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
