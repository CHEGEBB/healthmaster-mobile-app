import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import SplashScreen from '../components/SplashScreen';
import Signup from './signup';

// Load fonts function
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
    'Sora-Medium': require('../assets/fonts/Sora-Medium.ttf'),
    'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
    'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    'Jost-Medium': require('../assets/fonts/Jost-Medium.ttf'),
    'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Medium': require('../assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Bold': require('../assets/fonts/Kanit-Bold.ttf'),
  });
};

const _layout = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error('Error loading fonts:', error));

    const splashTimeout = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 5000); 

    return () => clearTimeout(splashTimeout);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (isSplashScreenVisible) {
    return (
      <View style={styles.container} className="min-h-screen">
        <SplashScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.indexContainer} className="flex items-center justify-center bg-slate-700 min-h-screen">
        <Signup />
      </View>
    );
  }
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily:'Poppins-Bold',
  },
  indexContainer: {
    flex: 1,
  },
});
