// hooks/useFonts.js
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
        'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
        'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
        'Kanit-Bold': require('../assets/fonts/Kanit-Bold.ttf'),
        'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;
