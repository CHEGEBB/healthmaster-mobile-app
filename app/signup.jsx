import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.containerSignup}>
      <ImageBackground
        source={require('../assets/images/welcome.png')} 
        style={styles.bgImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  containerSignup: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});