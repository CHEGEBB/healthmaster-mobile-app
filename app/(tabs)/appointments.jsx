import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Calendar } from 'react-native-calendars';
import { Stack } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Appointments = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [severity, setSeverity] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', image: require('../../assets/images/1.png'), rating: 4.8, patients: 1000, availability: '9:00 AM - 5:00 PM' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', image: require('../../assets/images/2.png'), rating: 4.9, patients: 1200, availability: '10:00 AM - 6:00 PM' },
    { id: 3, name: 'Dr. Mike Johnson', specialization: 'Pediatrician', image: require('../../assets/images/3.png'), rating: 4.7, patients: 800, availability: '8:00 AM - 4:00 PM' },
    { id: 4, name: 'Dr. Sarah Brown', specialization: 'Neurologist', image: require('../../assets/images/4.png'), rating: 4.6, patients: 950, availability: '11:00 AM - 7:00 PM' },
  ];

  const todayAppointments = [
    { id: 1, doctorName: 'Dr. John Doe', time: '10:00 AM', image: require('../../assets/images/1.png') },
    { id: 2, doctorName: 'Dr. Jane Smith', time: '2:00 PM', image: require('../../assets/images/2.png') },
    { id: 3, doctorName: 'Dr. Mike Johnson', time: '11:30 AM', image: require('../../assets/images/3.png') },
    { id: 4, doctorName: 'Dr. Sarah Brown', time: '3:30 PM', image: require('../../assets/images/4.png') },
    { id: 5, doctorName: 'Dr. Alex Wilson', time: '5:00 PM', image: require('../../assets/images/5.png') },
    { id: 6, doctorName: 'Dr. Emily Clark', time: '6:30 PM', image: require('../../assets/images/6.png') },
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

  const categories = [
    { id: 1, name: 'Cardiology', color: '#FF6B6B' },
    { id: 2, name: 'Dermatology', color: '#4ECDC4' },
    { id: 3, name: 'Pediatrics', color: '#45B7D1' },
    { id: 4, name: 'Neurology', color: '#FFA07A' },
    { id: 5, name: 'Orthopedics', color: '#98D8C8' },
  ];

  const availableSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const renderTodayAppointmentCard = ({ item }) => (
    <TouchableOpacity style={styles.todayAppointmentCard}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
        style={styles.todayAppointmentGradient}
      >
        <BlurView intensity={20} style={styles.blurView}>
          <Image source={item.image} style={styles.todayDoctorImage} />
          <Text style={styles.todayDoctorName}>{item.doctorName}</Text>
          <Text style={styles.todayAppointmentTime}>{item.time}</Text>
        </BlurView>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderAppointmentCard = ({ item }) => (
    <TouchableOpacity style={[styles.appointmentCard, getStatusColor(item.status)]}>
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDoctorName}>{item.doctorName}</Text>
        <Text style={styles.appointmentDate}>{item.date}</Text>
        <Text style={styles.appointmentTime}>{item.time}</Text>
        <Text style={styles.appointmentStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentVisitCard = ({ item }) => (
    <TouchableOpacity style={styles.recentVisitCard}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.recentVisitGradient}
      >
        <Image source={item.image} style={styles.recentVisitDoctorImage} />
        <Text style={styles.recentVisitDoctorName}>{item.doctorName}</Text>
        <Text style={styles.recentVisitDate}>{item.date}</Text>
        <Text style={styles.recentVisitDiagnosis}>{item.diagnosis}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={() => setSelectedDoctor(item)}>
      <Image source={item.image} style={styles.doctorCardImage} />
      <View style={styles.doctorCardDetails}>
        <Text style={styles.doctorCardName}>{item.name}</Text>
        <Text style={styles.doctorCardSpecialization}>{item.specialization}</Text>
        <View style={styles.doctorCardRating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.doctorCardRatingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.color }]}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { borderColor: '#4CAF50' };
      case 'cancelled':
        return { borderColor: '#F44336' };
      case 'upcoming':
        return { borderColor: '#2196F3' };
      default:
        return {};
    }
  };

  const handleBookAppointment = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setReason('');
      setSeverity('');
      setNotificationCount(prevCount => prevCount + 1);
    }, 6000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.notificationButton} onPress={() => setShowNotifications(true)}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>{notificationCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.todayAppointments}>
        <Text style={styles.sectionTitle}>Today's Appointments</Text>
        <FlatList
          data={todayAppointments}
          renderItem={renderTodayAppointmentCard}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.todayAppointmentList}
        />
      </View>

      <View style={styles.findDoctor}>
        <Text style={styles.sectionTitle}>Find a Doctor</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            placeholderTextColor="#CCCCCC"
          />
        </View>
        <FlatList
          data={doctors}
          renderItem={renderDoctorCard}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorList}
        />
      </View>

      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.bookAppointment}>
        <Text style={styles.sectionTitle}>Book Appointment Now</Text>
        <Calendar
          markedDates={{
            '2024-06-07': { marked: true, dotColor: '#4CAF50' },
            '2024-06-08': { marked: true, dotColor: '#4CAF50' },
            '2024-06-09': { marked: true, dotColor: '#4CAF50' },
          }}
          theme={{
            backgroundColor: '#1e293b',
            calendarBackground: '#1e293b',
            textSectionTitleColor: '#FFFFFF',
            selectedDayBackgroundColor: '#4CAF50',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#4CAF50',
            dayTextColor: '#FFFFFF',
            textDisabledColor: '#555555',
            dotColor: '#4CAF50',
            selectedDotColor: '#FFFFFF',
            arrowColor: '#4CAF50',
            monthTextColor: '#FFFFFF',
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
        />
        <View style={styles.timeSlots}>
          {availableSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.selectedTimeSlot
              ]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[
                styles.timeSlotText,
                selectedTime === slot && styles.selectedTimeSlotText
              ]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.doctorSelection}>
          <Text style={styles.formLabel}>Choose Doctor</Text>
          <FlatList
            data={doctors}
            renderItem={renderDoctorCard}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.reasonInput}>
          <Text style={styles.formLabel}>Reason for Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reason..."
            placeholderTextColor="#CCCCCC"
            value={reason}
            onChangeText={setReason}
          />
	</View>
        <View style={styles.severitySelection}>
          <Text style={styles.formLabel}>Condition Severity</Text>
          <View style={styles.severityOptions}>
            {['Mild', 'Moderate', 'Severe'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.severityOption,
                  severity === option && styles.selectedSeverityOption
                ]}
                onPress={() => setSeverity(option)}
              >
                <Text style={[
                  styles.severityOptionText,
                  severity === option && styles.selectedSeverityOptionText
                ]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appointments}>
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
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentVisitList}
        />
      </View>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={80} style={styles.modalBlur}>
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
                    <Text style={styles.notificationText}>{item.message}</Text>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowNotifications(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={80} style={styles.modalBlur}>
            <View style={styles.successModalContent}>
              <LottieView
                source={require('../../assets/animations/success.json')}
                autoPlay
                loop={false}
                style={styles.successAnimation}
              />
              <Text style={styles.successText}>Appointment Scheduled Successfully!</Text>
              <Text style={styles.successDetails}>
                {`Doctor: ${selectedDoctor?.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`}
              </Text>
              <Text style={styles.successNote}>Waiting for approval</Text>
            </View>
          </BlurView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
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
    backgroundColor: '#FF6B6B',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 10,
  },
  todayAppointments: {
    marginTop: 20,
  },
  todayAppointmentList: {
    paddingHorizontal: 10,
  },
  todayAppointmentCard: {
    width: 150,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  todayAppointmentGradient: {
    flex: 1,
  },
  blurView: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  todayDoctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
  },
  todayDoctorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  todayAppointmentTime: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  findDoctor: {
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 10,
    marginLeft: 10,
  },
  doctorList: {
    paddingHorizontal: 10,
  },
  doctorCard: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  doctorCardImage: {
    width: '100%',
    height: 150,
  },
  doctorCardDetails: {
    padding: 10,
  },
  doctorCardName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorCardSpecialization: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  doctorCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  doctorCardRatingText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  categories: {
    marginTop: 20,
  },
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 25,
  },
  categoryName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bookAppointment: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  timeSlot: {
    width: '23%',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
  },
  timeSlotText: {
    color: '#FFFFFF',
  },
  selectedTimeSlotText: {
    fontWeight: 'bold',
  },
  doctorSelection: {
    marginTop: 20,
  },
  formLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  reasonInput: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
  },
  severitySelection: {
    marginTop: 20,
  },
  severityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedSeverityOption: {
    backgroundColor: '#4CAF50',
  },
  severityOptionText: {
    color: '#FFFFFF',
  },
  selectedSeverityOptionText: {
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointments: {
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    color: '#FFFFFF',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  appointmentList: {
    paddingHorizontal: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentDoctorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentDate: {
    color: '#CCCCCC',
    marginTop: 5,
  },
  appointmentTime: {
    color: '#CCCCCC',
  },
  appointmentStatus: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  recentVisits: {
    marginTop: 20,
  },
  recentVisitList: {
    paddingHorizontal: 10,
  },
  recentVisitCard: {
    width: 200,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  recentVisitGradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  recentVisitDoctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },
  recentVisitDoctorName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  recentVisitDate: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  recentVisitDiagnosis: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBlur: {
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
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