import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ImageBackground, StyleSheet, Dimensions,
  TextInput, TouchableOpacity, Animated, Keyboard,
  KeyboardAvoidingView, Platform, ScrollView, Modal, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Client, Account, ID } from "appwrite";

const { width, height } = Dimensions.get('window');

// Initialize Appwrite
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6704d37c003c8a2f6a36');

const account = new Account(client);

export default function AuthScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSendVerification = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Check if the user already exists
      const existingUser = await account.get();
      setIsNewUser(false);
      setUserId(existingUser.$id);
      setIsVerificationStep(true);
      Alert.alert('Welcome back!', 'Please enter the verification code sent to your phone.');
    } catch (error) {
      if (error.code === 401) {
        // User doesn't exist, proceed with new user registration
        setIsNewUser(true);
        if (!name) {
          Alert.alert('Error', 'Please enter your name');
          setIsLoading(false);
          return;
        }
        try {
          const token = await account.createPhoneToken(ID.unique(), phoneNumber);
          setUserId(token.userId);
          setIsVerificationStep(true);
          Alert.alert('Success', 'Verification code sent to your phone');
        } catch (createTokenError) {
          console.error('Send verification error:', createTokenError);
          Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
      } else {
        console.error('Error checking user existence:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);
    try {
      if (isNewUser) {
        // Create a new session for new users
        const session = await account.createSession(userId, verificationCode);
        console.log('Authentication successful', session);
        // Update user name
        await account.updateName(name);
      } else {
        // Verify the phone for existing users
        await account.updatePhoneVerification(userId, verificationCode);
        console.log('Phone verification successful');
      }

      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.push('/started');
      }, 3000);
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (icon, placeholder, value, onChangeText, keyboardType = 'default') => (
    <Animated.View
      style={[
        styles.inputContainer,
        focusedInput === placeholder && styles.focusedInput,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Ionicons name={icon} size={24} color="#4BE3AC" style={styles.icon} />
      </Animated.View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
      <ImageBackground
        source={require("../assets/images/register.png")}
        style={styles.backgroundPattern}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.imageWrapper}>
              <ImageBackground
                source={require("../assets/images/back.webp")}
                style={styles.Imagecontainer}
              >
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
              </ImageBackground>
            </View>

            <Animated.View style={[styles.ContentContainer, { transform: [{ translateY: floatAnim }] }]}>
              <View style={styles.logoContainer}>
                <LottieView
                  source={require('../assets/animations/logo.json')}
                  autoPlay
                  loop
                  style={styles.logoAnimation}
                />
                <Text style={styles.logoText}>Health Master</Text>
              </View>
              <View style={styles.authTypeContainer}>
                <Text style={styles.authTypeText}>{isNewUser ? 'Welcome!' : 'Welcome Back!'}</Text>
              </View>
              {!isVerificationStep ? (
                <>
                  {renderInput('person-outline', 'Name', name, setName)}
                  {renderInput('phone-portrait-outline', 'Phone Number', phoneNumber, setPhoneNumber, 'phone-pad')}
                  <TouchableOpacity 
                    style={[styles.authButton, isLoading && styles.authButtonDisabled]}
                    onPress={handleSendVerification}
                    disabled={isLoading}
                  >
                    <Text style={styles.authButtonText}>
                      {isLoading ? 'Processing...' : 'Continue'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {renderInput('key-outline', 'Verification Code', verificationCode, setVerificationCode, 'numeric')}
                  <TouchableOpacity 
                    style={[styles.authButton, isLoading && styles.authButtonDisabled]}
                    onPress={handleVerifyCode}
                    disabled={isLoading}
                  >
                    <Text style={styles.authButtonText}>
                      {isLoading ? 'Verifying...' : 'Verify and Proceed'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
          </ScrollView>
        </View>
      </ImageBackground>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{isNewUser ? 'Welcome!' : 'Welcome Back!'}</Text>
            <LottieView
              source={require('../assets/animations/confetti.json')}
              autoPlay
              loop={false}
              style={styles.confettiAnimation}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(22, 22, 34, 0.5)',
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
  ContentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
    alignSelf: 'flex-start',
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
    fontFamily: 'Poppins-Regular',
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
    fontSize: 14,
    paddingVertical: 15,
    fontFamily: 'Poppins-Regular',
  },
  authButton: {
    backgroundColor: '#4BE3AC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  authButtonDisabled: {
    backgroundColor: '#2A7159',
    opacity: 0.7,
  },
  authButtonText: {
    color: '#161622',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  authTypeContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  authTypeText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: 20,
    bottom: 10,
    fontSize: 20,
    left: 4,
    color: '#4BE3AC',
    fontFamily: 'Poppins-Regular',
  },
  switchAuthText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#161622',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    color: '#4BE3AC',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  confettiAnimation: {
    width: 200,
    height: 200,
  },
});