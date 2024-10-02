import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, ImageBackground, StyleSheet, Dimensions, 
  TextInput, TouchableOpacity, Animated, Keyboard, 
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderInput = (icon, placeholder, value, onChangeText, secureTextEntry = false) => (
    <Animated.View
      style={[
        styles.inputContainer,
        focusedInput === placeholder && styles.focusedInput,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <Ionicons name={icon} size={24} color="#4BE3AC" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocusedInput(placeholder)}
        onBlur={() => setFocusedInput(null)}
      />
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageWrapper}>
          <ImageBackground 
            source={require("../assets/images/back.webp")} 
            style={styles.Imagecontainer}
          >
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
              {/* <LottieView
                source={require('../assets/animations/wave.json')}
                autoPlay
                loop
                style={styles.waveAnimation}
              /> */}
            </Animated.View>
          </ImageBackground>
        </View>
        
        <View style={styles.ContentContainer}>
        <View style={styles.logoContainer}>
                <LottieView
                  source={require('../assets/animations/logo.json')}
                  autoPlay
                  loop
                  style={styles.logoAnimation}
                />
                <Text style={styles.logoText}>Health Master</Text>
              </View>
              <View style={styles.login}>
                <Text className="text-emerald-400 text-md font-bold -mt-2" style={styles.loginText}>
                  Log in
                </Text>
                </View>
          {renderInput('mail-outline', 'Email', email, setEmail)}
          {renderInput('lock-closed-outline', 'Password', password, setPassword, true)}
          
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageWrapper: {
    height: height * 0.4,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  Imagecontainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
    alignSelf : 'flex-start',
    marginLeft: -10,
  
  },
  logoAnimation: {
    width: 50,
    height: 50,
    marginTop: -40,

  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
    marginTop: -40,

  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  ContentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    marginTop: 10,

  },
  focusedInput: {
    borderColor: '#4BE3AC',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 15,
  },
  loginButton: {
    backgroundColor: '#4BE3AC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#161622',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#4BE3AC',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupLink: {
    color: '#4BE3AC',
    fontSize: 14,
    fontWeight: 'bold',
  },
  login: {
    marginBottom: 10,
    alignSelf : 'flex-start',
  },
  loginText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: 20,
    bottom: 10,
    fontSize : 20,
    left: 4,
  },
});