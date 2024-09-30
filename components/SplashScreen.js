import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';


const SplashScreen = () => {
  const image = require('../assets/images/background-1.webp');
  const logo = require('../assets/images/hat.png');
  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.overlay} className="flex-row">
          <View style={styles.LottieContainer}>
          <LottieView
        source={require('../assets/animations/splash-animation.json')} 
        autoPlay
        loop
        style={styles.lottie}
      />
  
        <Text style={styles.text}>HealthMaster</Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>
          Explore a World of Health with <Text style={styles.companyName} className="bg-[#4BE3AC]">
            Health Master
          </Text>
          </Text>
        </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain', 
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  LottieContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  aboutContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  aboutText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Sora-Bold',
  },
  companyName: {
    fontWeight: 'normal',
    color:'#4BE3AC'
  },

});
