import { Link } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  Image 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const backgroundImage = require('../assets/images/welcome.png');
const logoImage = require('../assets/images/fav.png');
const backIcon = require('../assets/images/icons/back.png');
const socialIcons = {
  google: require('../assets/images/icons/google1.png'),
  facebook: require('../assets/images/icons/facebook.png'),
  apple: require('../assets/images/icons/apple.png'),
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const socialIconsAnim = useRef(new Animated.Value(0)).current;

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(socialIconsAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(socialIconsAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const socialIconScale = socialIconsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <View style={styles.containerSignup}>
      <ImageBackground
        source={backgroundImage}
        style={styles.bgImage}
      >
        <Animated.View style={[
          styles.overlay,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}>
          <View style={styles.back}>
            <Image source={backIcon} style={styles.backCon}/>
          </View>
          <View style={styles.logoContainer}>
            <View>
              <Image source={logoImage} style={styles.logoImage}/>
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or sign up with</Text>
          
          <View style={styles.socialIconsContainer}>
            {Object.keys(socialIcons).map((platform) => (
              <Animated.View
                key={platform}
                style={{
                  transform: [{ scale: socialIconScale }],
                }}
              >
                <TouchableOpacity style={styles.socialIcon}>
                  <Image
                    source={socialIcons[platform]}
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
           <View>
          <Text style={styles.account}>Already have an account? 
            <Link to="/login" className="text-green-600" style={styles.login}>Login</Link>
          </Text>
        </View>
        </Animated.View>
       
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSignup: {
    flex: 1,
  },
  bgImage: {
    width: width,
    resizeMode: 'cover',
    flex:2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'hsla(240, 10%, 15%, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  back: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1000,
  },
  backCon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    gap: 10,
    top: 30,
  },
  logoImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#4BE3AC',
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Sora-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
        top: 40,

  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'hsla(240, 10%, 15%, 0.9)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    top: 70,
  },
  label: {
    width: '100%',
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    top: 60,

  },
  button: {
    backgroundColor: '#4BE3AC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 200,
    marginTop: 30,
        top: 60,

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
  orText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
        top: 60,

  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
        top: 60,

  },
  socialIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  account: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
        top: 70,

  },
  login: {
    color: '#4BE3AC',
  },
});

export default Signup;