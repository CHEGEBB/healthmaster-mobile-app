// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/SplashScreen'; // Ensure the path is correct
import { View, StyleSheet, Text } from 'react-native';
import useFonts from '../hooks/useFonts';

export default function Layout() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const fontsLoaded = useFonts();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreen(false);
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreen) {
    return (
      <SplashScreen />
    );
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Change to your preferred background color
  },
});
