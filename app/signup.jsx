import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});