import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from "../components/SplashScreen"
import Index from "./index"

const _layout = () => {
  const [isSplashScreenVisible , setIsSplashScreenVisible] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsSplashScreenVisible(false)
    }, 3000)
  });

  if(isSplashScreenVisible){
    return (
      <View style={styles.container} className=" min-h-screen">
        <SplashScreen />
      </View>
    )
  }
  else{
    return (
      <View style={styles.indexContainer} className="flex items-center justify-center bg-slate-700 min-h-screen">
        <Index/>
      </View>
    )
  }



  return (
    <View className="bg-red-400 min-h-screen">
      <Text>_layout</Text>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({
 container:{
  flex: 1,
 },
 indexContainer:{
  flex: 1,
 }
})