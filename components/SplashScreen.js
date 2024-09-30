import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  const image = require('../assets/images/background-1.webp');
  const logo = require('../assets/images/hat.png');
  
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.overlay}>
          <Image source={logo} style={styles.logo} alt="logo" />
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
});
