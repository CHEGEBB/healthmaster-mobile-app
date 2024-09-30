import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Animated, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
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
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background-1.webp')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Animated.View style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ]
            }
          ]}>
            <View style={styles.logoContainer}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <View style={styles.Lott}>
                  <LottieView
                    source={require('../assets/animations/splash-animation.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                  />
                </View>
              </Animated.View>
              <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Health Master
              </Animated.Text>
            </View>
            <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
              Where Care and Convenience Converge with{' '}
              <Text style={styles.highlight}>Health Master</Text>
            </Animated.Text>
            
            <Animated.View style={[styles.featureContainer, { opacity: fadeAnim }]}>
              <Text style={styles.featureTitle}>Key Features:</Text>
              <Text style={styles.featureItem}>• 24/7 Virtual Health Assistance</Text>
              <Text style={styles.featureItem}>• Personalized Health Tracking</Text>
              <Text style={styles.featureItem}>• Secure Telemedicine Consultations</Text>
              <Text style={styles.featureItem}>• AI-Powered Health Insights</Text>
            </Animated.View>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              onPress={() => alert('Get Started Clicked')}
            >
              <LinearGradient
                colors={['#4BE3AC', '#45B3E0']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  Lott:{
    backgroundColor:'hsl(240 3.7% 15.9%)',
    width:55,
    height:55,
    padding:4,
    marginTop:80,
    borderRadius:50,
  },
  lottie: {
    width: 50,
    height: 50,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:80
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  highlight: {
    color: '#4BE3AC',
    fontWeight: 'bold',
  },
  featureContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  featureTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    bottom: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;