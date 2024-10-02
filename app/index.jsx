import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

const { width, height } = Dimensions.get('window');

const carouselData = [
  {
    title: "Medication Reminders",
    text: "Manage your medications and take them on time with HealthMaster",
    image: require('../assets/images/land1.png'),
  },
  {
    title: "Doctor Appointments",
    text: "HealthMaster helps you manage appointments with doctors",
    image: require('../assets/images/welcome.png'),
  },
  {
    title: "Health Stats",
    text: "See your health stats and track your progress",
    image: require('../assets/images/stats.webp'),
  },
];

export default function Land() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {carouselData.map((item, index) => (
          <View style={styles.slide} key={index}>
            <ImageBackground source={item.image} style={styles.imageContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.pagination}>
        {carouselData.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={i}
              style={[styles.paginationDot, { opacity }]}
            />
          );
        })}
      </View>
      <Pressable 
        style={styles.button}
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsla(231, 19%, 17%, 1)',
  },
  slide: {
    width,
    height,
  },
  imageContainer: {
    flex: 3/4,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    backgroundColor: 'hsla(231, 19%, 17%, 0.8)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF487E',
    margin: 5,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});