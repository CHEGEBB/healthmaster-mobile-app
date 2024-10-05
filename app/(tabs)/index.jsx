import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import Medlist from "../../components/Medlist"
import Appointments from "../../components/Appointments"
import HealthStats from "../../components/HealthStats"
import Reminders from "../../components/Reminders"


export default function Dashboard() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [alarmsCount, setAlarmsCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

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

  const openModal = (schedule) => {
    setSelectedSchedule(schedule);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSchedule(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
              <Stack.Screen options={{ headerShown: false }} />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ImageBackground 
          source={require('../../assets/images/register.png')} 
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay} />

          {/* Greeting and Notification */}
          <View style={styles.row}>
            <Text style={styles.headerText}>Hi, Emily👋!</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.healthText}>How is Your Health Today?</Text>

          {/* Search Bar */}
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

          {/* Date and Profile */}
          <View style={styles.dateRow}>
            <View style={styles.dateSection}>
              <Ionicons name="calendar-outline" size={20} color="#FFF" />
              <Text style={styles.dateText}>Today is {new Date().toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity style={styles.profileContainer}>
              <Image
                source={require('../../assets/images/36.jpg')} // Change the path to your actual profile image
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          {/* Action Cards */}
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
      <View style={styles.appointmentsContainer} className="mt-9">
<Appointments/>
      </View >
      {/* Upcoming Schedule */}
      <View style={styles.upcomingSchedule}>
        <View style={styles.upcomingScheduleHeader}>
          <Text style={styles.upcomingScheduleTitle}>Upcoming Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleRow}>
          {[
            { time: "10:00 AM", doctor: "Dr. John Doe", image: require('../../assets/images/1.png') },
            { time: "12:00 PM", doctor: "Dr. Jane Smith", image: require('../../assets/images/2.png') },
            { time: "14:00 PM", doctor: "Dr. Mike Johnson", image: require('../../assets/images/3.png') }
          ].map((schedule, index) => (
            <View style={styles.scheduleItem} key={index}>
              <Image source={schedule.image} style={styles.doctorImage} />
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleItemTitle}>{schedule.time}</Text>
                <Text style={styles.scheduleItemText}>{schedule.doctor}</Text>
              </View>
              <TouchableOpacity onPress={() => openModal(schedule)}>
                <Ionicons name="ellipsis-vertical" size={24} color="#777" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    


      {/* Modal for Schedule Details */}
      {selectedSchedule && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedSchedule.doctor}</Text>
              <Text style={styles.modalTime}>Scheduled at {selectedSchedule.time}</Text>
              <Image source={selectedSchedule.image} style={styles.modalDoctorImage} />

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButtonDone}>
                  <Ionicons name="checkmark-outline" size={20} color="#FFF" />
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonCancel}>
                  <Ionicons name="close-outline" size={20} color="#FFF" />
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Ionicons name="close-outline" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    
      <View style={styles.medContainer}>
        {/* today's medication plan */}
        {/* upcoming medication reminders */}
        <Medlist/>
      </View>
      <View style={styles.myReminders} className="mt-3" >
       <Reminders />
      </View>
    
      <View style={styles.healthstats}>
       <HealthStats/>
  
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
  upcomingSchedule: {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#161622',
    borderRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  upcomingScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    
    
  },
  upcomingScheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',

  },
  seeAllText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  scheduleRow: {
    flexDirection: 'column',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E383F',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
    borderWidth: 2,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleItemTitle: {
    fontSize: 16,
    color: '#FFF',
  },
  scheduleItemText: {
    fontSize: 14,
    color: '#BBB',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#161622',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
    modalTime: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    modalDoctorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    modalButtonDone: {
        backgroundColor: '#50C878',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: 10,
    },
    modalButtonCancel: {
        backgroundColor: '#FF6F61',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FF6F61',
    },
    selectedSchedule: {
        backgroundColor: '#4A90E2',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selectedScheduleText: {
        fontSize: 16,
        color: '#FFF',
    },
    selectedScheduleDetails: {
        flex: 1,
    },
    selectedDoctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
    },
    selectedScheduleDetails: {
        flex: 1,
    },
    selectedScheduleItemTitle: {
        fontSize: 16,
        color: '#FFF',
    },
    myReminders: {
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#161622',
        borderRadius: 20,
        elevation: 5,
        overflow: 'hidden',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    myRemindersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    myRemindersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    myRemindersText: {
        fontSize: 14,
        color: '#BBB',
    },

  
});

