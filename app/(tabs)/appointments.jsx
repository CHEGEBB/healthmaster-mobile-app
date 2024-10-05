import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Calendar } from 'react-native-calendars';
import { Stack } from 'expo-router';


const Appointments = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', image: require('../../assets/images/1.png'), rating: 4.8, patients: 1000, availability: '9:00 AM - 5:00 PM' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', image: require('../../assets/images/2.png'), rating: 4.9, patients: 1200, availability: '10:00 AM - 6:00 PM' },
    { id: 3, name: 'Dr. Mike Johnson', specialization: 'Pediatrician', image: require('../../assets/images/3.png'), rating: 4.7, patients: 800, availability: '8:00 AM - 4:00 PM' },
    { id: 4, name: 'Dr. Sarah Brown', specialization: 'Neurologist', image: require('../../assets/images/4.png'), rating: 4.6, patients: 950, availability: '11:00 AM - 7:00 PM' },
  ];

  const appointments = [
    { id: 1, doctorName: 'Dr. John Doe', date: '2024-06-07', time: '10:00 AM', status: 'upcoming', image: require('../../assets/images/1.png') },
    { id: 2, doctorName: 'Dr. Jane Smith', date: '2024-06-08', time: '2:00 PM', status: 'upcoming', image: require('../../assets/images/2.png') },
    { id: 3, doctorName: 'Dr. Mike Johnson', date: '2024-06-09', time: '11:30 AM', status: 'upcoming', image: require('../../assets/images/3.png') },
    { id: 4, doctorName: 'Dr. Sarah Brown', date: '2024-06-10', time: '3:30 PM', status: 'upcoming', image: require('../../assets/images/4.png') },
    { id: 5, doctorName: 'Dr. John Doe', date: '2024-06-05', time: '9:00 AM', status: 'completed', image: require('../../assets/images/1.png') },
    { id: 6, doctorName: 'Dr. Jane Smith', date: '2024-06-06', time: '1:00 PM', status: 'cancelled', image: require('../../assets/images/2.png') },
  ];

  const recentVisits = [
    { id: 1, doctorName: 'Dr. John Doe', date: '2024-05-30', diagnosis: 'Regular checkup', image: require('../../assets/images/1.png') },
    { id: 2, doctorName: 'Dr. Jane Smith', date: '2024-05-25', diagnosis: 'Skin consultation', image: require('../../assets/images/2.png') },
    { id: 3, doctorName: 'Dr. Mike Johnson', date: '2024-05-20', diagnosis: 'Flu symptoms', image: require('../../assets/images/3.png') },
    { id: 4, doctorName: 'Dr. Sarah Brown', date: '2024-05-15', diagnosis: 'Headache treatment', image: require('../../assets/images/4.png') },
  ];

  const renderAppointmentCard = ({ item }) => (
    <View style={[styles.appointmentCard, getStatusColor(item.status)]}>
      <View style={styles.appointmentDateColumn}>
        <Text style={styles.appointmentDate}>{new Date(item.date).getDate()}</Text>
        <Text style={styles.appointmentMonth}>{new Date(item.date).toLocaleString('default', { month: 'short' })}</Text>
      </View>
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDoctorName}>{item.doctorName}</Text>
        <Text style={styles.appointmentTime}>{item.time}</Text>
        <View style={styles.appointmentInfoBar}>
          <Ionicons name="time-outline" size={16} color="#007AFF" />
          <Text style={styles.appointmentInfoText}>{item.time}</Text>
          <Ionicons name="calendar-outline" size={16} color="#007AFF" />
          <Text style={styles.appointmentInfoText}>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</Text>
        </View>
      </View>
      <View style={styles.appointmentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentVisitCard = ({ item }) => (
    <View style={styles.recentVisitCard}>
      <Image source={item.image} style={styles.recentVisitDoctorImage} />
      <Text style={styles.recentVisitDate}>{item.date}</Text>
      <Text style={styles.recentVisitDoctorName}>{item.doctorName}</Text>
      <Text style={styles.recentVisitDiagnosis}>{item.diagnosis}</Text>
    </View>
  );

  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={() => handleDoctorSelect(item)}>
      <Image source={item.image} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
      <View style={styles.doctorRating}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.doctorRatingText}>{item.rating}</Text>
      </View>
      <Text style={styles.doctorPatients}>{item.patients} patients</Text>
      <Text style={styles.doctorAvailability}>{item.availability}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => handleBookAppointment(item)}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentForm(true);
  };

  const handleBookAppointment = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setShowAppointmentForm(false);
      setSelectedDoctor(null);
      setAppointmentDetails({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: '',
      });
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { borderLeftColor: '#4CAF50' };
      case 'cancelled':
        return { borderLeftColor: '#F44336' };
      case 'upcoming':
        return { borderLeftColor: '#2196F3' };
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
                    <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/images/new2.jpeg')} style={styles.backgroundImage}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Appointments</Text>
            <TouchableOpacity style={styles.notificationButton} onPress={() => setShowNotifications(true)}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerBottom}>
            <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              <Text style={styles.calendarDate}>{new Date().toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.todayAppointments}>
        <Text style={styles.sectionTitle}>Today's Appointments</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={appointments.filter(a => a.date === new Date().toISOString().split('T')[0])}
          renderItem={renderAppointmentCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.appointmentList}
        />
      </View>

      <View style={styles.appointmentsContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
            onPress={() => setActiveTab('cancelled')}
          >
            <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={appointments.filter(a => a.status === activeTab)}
          renderItem={renderAppointmentCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.appointmentList}
        />
      </View>

      <View style={styles.recentVisits}>
        <Text style={styles.sectionTitle}>Recent Visits</Text>
        <FlatList
          data={recentVisits}
          renderItem={renderRecentVisitCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.recentVisitList}
        />
      </View>

      <View style={styles.findDoctor}>
        <Text style={styles.sectionTitle}>Find a Doctor</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search doctors..."
          placeholderTextColor="#999"
        />
        <FlatList
          data={doctors}
          renderItem={renderDoctorCard}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorList}
        />
      </View>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <FlatList
              data={[
                { id: 1, message: 'Appointment reminder: Dr. John Doe in 1 hour' },
                { id: 2, message: 'New message from Dr. Jane Smith' },
                { id: 3, message: 'Your prescription is ready for pickup' },
              ]}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <Text>{item.message}</Text>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowNotifications(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Appointment Calendar</Text>
            <Calendar
              markedDates={{
                '2024-06-07': { marked: true, dotColor: '#2196F3' },
                '2024-06-08': { marked: true, dotColor: '#2196F3' },
                '2024-06-09': { marked: true, dotColor: '#2196F3' },
                '2024-06-10': { marked: true, dotColor: '#2196F3' },
                '2024-06-05': { marked: true, dotColor: '#4CAF50' },
                '2024-06-06': { marked: true, dotColor: '#F44336' },
              }}
              onDayPress={(day) => {
                console.log('Selected day', day);
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showAppointmentForm && (
        <View style={styles.appointmentForm}>
          <Text style={styles.formTitle}>Book Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={appointmentDetails.name}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={appointmentDetails.email}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={appointmentDetails.phone}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={appointmentDetails.date}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={appointmentDetails.time}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, time: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Reason for appointment"
            value={appointmentDetails.reason}
            onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, reason: text })}
          />
          <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAppointmentForm(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={require('../../assets/animations/success.json')}
              autoPlay
              loop={false}
              style={styles.successAnimation}
            />
            <Text style={styles.successText}>Appointment Booked Successfully!</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#334155',
  },
  headerContainer: {
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  calendarDate: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  todayAppointments: {
    marginTop: 20,
  },
  appointmentList: {
    paddingHorizontal: 10,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    elevation: 3,
  },
  appointmentDateColumn: {
    alignItems: 'center',
    marginRight: 15,
  },
  appointmentDate: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appointmentMonth: {
    fontSize: 14,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentDoctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  appointmentInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  appointmentInfoText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
    marginRight: 10,
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 5,
    marginHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recentVisits: {
    marginTop: 20,
  },
  recentVisitList: {
    paddingHorizontal: 10,
  },
  recentVisitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    flex: 1,
    alignItems: 'center',
    elevation: 2,
  },
  recentVisitDoctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  recentVisitDate: {
    fontSize: 14,
    color: '#777',
  },
  recentVisitDoctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  recentVisitDiagnosis: {
    fontSize: 14,
    textAlign: 'center',
  },
  findDoctor: {
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  doctorList: {
    paddingHorizontal: 10,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    width: 200,
    elevation: 3,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 5,
  },
  doctorRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  doctorRatingText: {
    marginLeft: 5,
  },
  doctorPatients: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  doctorAvailability: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    backgroundColor: '#F44336',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  appointmentForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Appointments;