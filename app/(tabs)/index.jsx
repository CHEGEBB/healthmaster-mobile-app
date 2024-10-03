import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [alarmsCount, setAlarmsCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);

  useEffect(() => {
    const countUp = (setCount, targetValue) => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < targetValue) {
          count += 1;
          setCount(count);
        } else {
          clearInterval(interval);
        }
      }, 50); 
    };

    countUp(setAppointmentsCount, 10); 
    countUp(setAlarmsCount, 5); 
    countUp(setScheduleCount, 3); 
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerContainer}>
        <ImageBackground 
          source={require('../../assets/images/register.png')} 
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}  
        >
          <View style={styles.overlay} />

          <View style={styles.row}>
            <Text style={styles.headerText}>Hi, Emily👋 !</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.healthText}>How is Your Health Today?</Text>

          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#555" style={styles.iconLeft} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#777"
              style={styles.input}
            />
            <TouchableOpacity>
              <Ionicons name="mic-outline" size={20} color="#555" style={styles.iconRight} />
            </TouchableOpacity>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateSection}>
              <Ionicons name="calendar-outline" size={20} color="#FFF" />
              <Text style={styles.dateText}>Today is {new Date().toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity style={styles.profileContainer}>
    <Image
      source={require('../../assets/images/36.jpg')} 
      style={styles.profileImage}
    />
  </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <View style={[styles.card, styles.cardAppointments]}>
              <Ionicons name="calendar-outline" size={30} color="#FFF" />
              <Text style={styles.cardText}>Appointments</Text>
              <Text style={styles.cardCount}>{appointmentsCount}</Text>
            </View>
            <View style={[styles.card, styles.cardAlarms]}>
              <Ionicons name="alarm-outline" size={30} color="#FFF" />
              <Text style={styles.cardText}>Alarms</Text>
              <Text style={styles.cardCount}>{alarmsCount}</Text>
            </View>
            <View style={[styles.card, styles.cardSchedule]}>
              <Ionicons name="list-outline" size={30} color="#FFF" />
              <Text style={styles.cardText}>Schedule</Text>
              <Text style={styles.cardCount}>{scheduleCount}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E383F',
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    width: '100%',
    height: 400,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 100, 0.2)',  
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
 
},
iconButton: {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: 10,
  borderRadius: 50,
},
healthText: {
  fontSize: 18,
  color: '#fff',  
  textAlign: 'left',
  marginVertical: 15,
  marginLeft: 20,
},
searchBar: {
  flexDirection: 'row',
  backgroundColor: '#FFF',
  borderRadius: 30,
  paddingHorizontal: 10,
  marginHorizontal: 20,
  alignItems: 'center',
  marginBottom: 15,
},
input: {
  flex: 1,
  height: 40,
  color: '#000',
},
iconLeft: {
  marginRight: 10,
},
iconRight: {
  marginLeft: 10,
},
dateRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginVertical: 10,
},
dateSection: {
  flexDirection: 'row',
  alignItems: 'center',
},
dateText: {
  marginLeft: 10,
  fontSize: 16,
  color: '#FFF',
},
glassyIconButton: {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: 10,
  borderRadius: 50,
},
actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 15,
},
card: {
  width: 100,
  height: 90,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
},
cardAppointments: {
  backgroundColor: '#4A90E2', 
},
cardAlarms: {
  backgroundColor: '#FF6F61', 
},
cardSchedule: {
  backgroundColor: '#50C878', 
},
cardText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 10,
},
cardCount: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFF',
  marginTop: 5,
  fontFamily: 'Poppins-Bold',
},
profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: 2,
    borderRadius: 50,
    overflow: 'hidden',
  },
  
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  
});

