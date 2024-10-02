import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, 
  Dimensions, Modal, Platform, Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';


const { height, width } = Dimensions.get('window');

export default function SignUp() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
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

  const handleSignUp = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowModal(true);
    }, 2000);
  };

  const renderInput = (icon, placeholder, keyboardType = 'default', secureTextEntry = false) => (
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
        keyboardType={keyboardType}
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <View style={styles.imageWrapper}>
          <ImageBackground
            source={require('../assets/images/register.png')}
            style={styles.Imagecontainer}
          >
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
              <View style={styles.welcomeContainer}>
                <LottieView
                  source={require('../assets/animations/welcome.json')}
                  autoPlay
                  loop
                  style={styles.welcomeAnimation}
                  backgroundColor="transparent"
                />
                <View style={styles.logo}>
                  <View>
                    <Image source={require('../assets/images/fav.png')} style={styles.lottie}/>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Health Master</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 justify-center items-start ml-5 ">
  <Text className="text-emerald-400 text-md font-bold -mt-2" style={styles.signupText}>Sign Up</Text>
</View>

              
              <View style={styles.FormContainer}>
                {renderInput('person-outline', 'Username')}
                {renderInput('mail-outline', 'Email', 'email-address')}
                {renderInput('lock-closed-outline', 'Password', 'default', true)}
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/login')}>
                  <Text style={styles.loginLinkText}>Already have an account? <Text className="text-emerald-400">Login here</Text> 
                    </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ImageBackground>
        </View>
      </ScrollView>
      {showConfetti && (
        <LottieView
          source={require('../assets/animations/confetti.json')}
          autoPlay
          loop={false}
          style={styles.confetti}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Up Successful! 🤝</Text>
            <Text style={styles.modalText}>Welcome to HealthMaster!</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.loginButton]}
              onPress={() => {
                setShowModal(false);
                router.push('/login');
              }}
            >
              <Text style={styles.modalButtonText}>Login to your account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.stayButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Stay on this page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232533',
    
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    
  },
  Imagecontainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(200,200,200,0.2)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flex: 1,
    
  },
  welcomeAnimation: {
    width: "80%",
    height: 200,
    top: 20,
  },
  FormContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    
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
  button: {
    backgroundColor: '#4BE3AC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#fff',
    fontSize: 14,
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1E1E2D',
    color: 'white',
    borderRadius: 20,
    padding: 30,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',

  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',

  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    minWidth: 200,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  stayButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  lottie: {
    width: 30,
    height: 30,
  },
  logo: {
    display: 'flex',
    flexDirection:'row',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 15,
  },
  nameContainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
    fontFamily: 'Sora-Bold',
    marginTop: 3,
  },
  signupText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: -10,
    bottom: 10,
  },

});