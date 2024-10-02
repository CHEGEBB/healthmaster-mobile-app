import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import CustomSplashScreen from '../components/SplashScreen';
import { Slot } from 'expo-router';

const fontFiles = {
  'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
  'Jost-SemiBold': require('../assets/fonts/Jost-SemiBold.ttf'),
  'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
  'Jost-ExtraBold': require('../assets/fonts/Jost-ExtraBold.ttf'),
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
  'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
  'Sora-SemiBold': require('../assets/fonts/Sora-SemiBold.ttf'),
  'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
  'Sora-ExtraBold': require('../assets/fonts/Sora-ExtraBold.ttf'),
  'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
  'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
  'Kanit-SemiBold': require('../assets/fonts/Kanit-SemiBold.ttf'),
  'Kanit-Bold': require('../assets/fonts/Kanit-Bold.ttf'),
  'Kanit-ExtraBold': require('../assets/fonts/Kanit-ExtraBold.ttf'),
  'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
  'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
  'Outfit-ExtraBold': require('../assets/fonts/Outfit-ExtraBold.ttf'),
  'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
  'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
  'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
  'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
  'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
  'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
  'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-ExtraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
};

export default function Layout() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const [fontsLoaded, fontError] = useFonts(fontFiles);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 7000)); // simulate loading time
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsSplashScreen(false);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts haven't loaded yet, keep showing the splash screen
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {isSplashScreen ? (
        <CustomSplashScreen />
      ) : (
        <Stack>
          <Slot /> {/* This will allow navigation to other routes like /signup */}
        </Stack>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
