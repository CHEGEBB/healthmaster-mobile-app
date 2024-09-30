import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [focusedInput, setFocusedInput] = useState(null); 

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <View style={styles.containerSignup}>
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        style={styles.bgImage}
      >
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <View>
            <Image source={require('../assets/images/fav.png') } style={styles.logoImage}/>
            </View>
            <View>
              <Text style={styles.textStyle}>Health Master</Text>
            </View>
          </View>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'username' && styles.focusedInput,
            ]}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
            placeholder="john doe"
            placeholderTextColor="#ccc"
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'email' && styles.focusedInput,
            ]}
            placeholder="ex johndoe@gmail.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === 'password' && styles.focusedInput,
            ]}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
          />
          <TouchableOpacity style={styles.button} >
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'hsla(240, 10%, 15%, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf:'flex-start',
    gap:10,

  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4BE3AC',
    alignItems: 'left',
  },
  textStyle:{
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Sora-Bold',
    textAlign:'left',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
    textAlign:'left',
    alignSelf: 'flex-start', 
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
  label: {
    width: '100%',
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'semibold',
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start', 
  },
  button: {
    backgroundColor: '#4BE3AC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width:200,
    top:30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  focusedInput: {
    borderColor: '#4BE3AC', 
    borderWidth: 2,
  },
});
