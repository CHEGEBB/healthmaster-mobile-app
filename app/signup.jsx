import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <View style={styles.containerSignup}>
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        style={styles.bgImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="john doe"
            placeholderTextColor="#ccc"
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ex johndoe@gmail.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
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
    // height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'hsla(240, 10%, 15%, 0.8)',
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
  label: {
    width: '100%',
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Kanit-Regular',
    textAlign: 'left',
    alignSelf: 'flex-start', 
  },
});