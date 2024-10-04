import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Animated, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const AnimatedPhrase = ({ phrases }) => {
  const fadeAnim = useRef(phrases.map(() => new Animated.Value(0))).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const animate = (index) => {
      Animated.sequence([
        Animated.timing(fadeAnim[index], { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(fadeAnim[index], { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(fadeAnim[index], { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      });
    };

    animate(currentIndex);
  }, [currentIndex]);

  return (
    <View style={styles.animatedPhraseContainer}>
      {phrases.map((phrase, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.animatedPhrase,
            { opacity: fadeAnim[index], display: index === currentIndex ? 'flex' : 'none' }
          ]}
        >
          {phrase}
        </Animated.Text>
      ))}
    </View>
  );
};

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

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

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const animatedPhrases = [
    "Your Health, Your Way",
    "Empowering Wellness",
    "Smart Health Decisions",
    "Medication Reminders"
  ];

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
                  {/* <LottieView
                    source={require('../assets/animations/splash-animation.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                  /> */}
                  <Image source={require('../assets/images/healthmaster.png')} style={styles.lottie}/>
                </View>
              </Animated.View>
              <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Health Master
              </Animated.Text>
            </View>
            <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
              Where Care and Convenience Converge
            </Animated.Text>
            
            <AnimatedPhrase phrases={animatedPhrases} />
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: pulseAnim }] }}>
            {/* <TouchableOpacity
              onPress={() => alert('Get Started Clicked')}
              style={styles.buttonContainer}
            >
              <View style={styles.button}>
                <Animated.View style={[
                  styles.shimmer,
                  {
                    transform: [{ translateX: shimmerTranslate }],
                  }
                ]} />
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </TouchableOpacity> */}
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
    // backgroundColor:'hsl(240 3.7% 15.9%)',
    // width:75,
    // height:75,
    padding:4,
    marginTop:120,
    borderRadius:50,
  },
  lottie: {
    width: 85,
    height: 85,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: -10,
    marginTop:120,
    fontFamily: 'Outfit-Bold',
  },
  tagline: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  animatedPhraseContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  animatedPhrase: {
    color: '#4BE3AC',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 30,
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#4BE3AC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'white',
  },
});

export default SplashScreen;