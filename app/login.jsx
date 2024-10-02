import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {Stack} from 'expo-router'

export default function Login() {
  const router = useRouter();
  const {width, height }= Dimensions.get('window');

  return (
    <View className="bg-[#161622] flex-1 justify-center items-center" style={styles.container}>
      <Stack.Screen options={{headerShown:false}}/>
      {/* <Button title="Go Back" onPress={() => router.back()} /> */}
      <View style={styles.imageWrapper}>
        <ImageBackground source={require("../assets/images/back.webp")}  className="flex-1" style={styles.Imagecontainer}>
        <Text style={styles.Text}>Medication Reminders</Text>
        </ImageBackground>
        </View>
        <View style={styles.ContentContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderBottomLeftRadius : 30,
    borderBottomRightRadius : 30,
    
    
  },
  Imagecontainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    
  },
  ContentContainer:{
    flex:2,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
  },

});