import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const appointmentData = [
  {
    id: 1,
    doctorName: 'Dr. Emily Wong',
    specialty: 'Cardiologist',
    time: '09:30 AM',
    duration: '45 min',
    location: 'Heart Care Center',
    image: require('../assets/images/2.png'),
    color: '#1f2937',
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    time: '11:15 AM',
    duration: '30 min',
    location: 'Skin Health Clinic',
    image: require('../assets/images/6.png'),
    color: '#042f2e',
  },
  {
    id: 3,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Physiotherapist',
    time: '02:00 PM',
    duration: '60 min',
    location: 'Movement Rehabilitation Center',
    image: require('../assets/images/7.png'),
    color: '#0d9488',
  },
  {
    id: 4,
    doctorName: 'Dr. Philip Johnson',
    specialty: 'Dermatologist',
    time: '05:00 PM',
    duration: '120 min',
    location: 'Dermaltology center',
    image: require('../assets/images/6.png'),
    color: '#075985',
  },

];

const TodaysAppointments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Appointments</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {appointmentData.map((appointment, index) => (
          <TouchableOpacity
            key={appointment.id}
            style={[
              styles.appointmentCard,
              { backgroundColor: appointment.color },
              index === 0 ? { marginLeft: 20 } : null,
            ]}
            onPress={() => openModal(appointment)}
          >
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={24} color="#FFF" />
              <Text style={styles.timeText}>{appointment.time}</Text>
            </View>
            <Image source={appointment.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.specialty}</Text>
            <View style={styles.durationContainer}>
              <Ionicons name="hourglass-outline" size={16} color="#FFF" />
              <Text style={styles.durationText}>{appointment.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, selectedAppointment && { backgroundColor: selectedAppointment.color }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            {selectedAppointment && (
              <ScrollView>
                <Image source={selectedAppointment.image} style={styles.modalImage} />
                <Text style={styles.modalDoctorName}>{selectedAppointment.doctorName}</Text>
                <Text style={styles.modalSpecialty}>{selectedAppointment.specialty}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={24} color="#fff" />
                  <Text style={styles.infoText}>{selectedAppointment.time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="hourglass-outline" size={24} color="#FFF" />
                  <Text style={styles.infoText}>{selectedAppointment.duration}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={24} color="#FFF" />
                  <Text style={styles.infoText}>{selectedAppointment.location}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="videocam-outline" size={24} color="#FFF" />
                  <Text style={styles.actionButtonText}>Start Video Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="calendar-outline" size={24} color="#FFF" />
                  <Text style={styles.actionButtonText}>Reschedule</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    height: 265,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 20,
  },
  appointmentCard: {
    width: 180,
    height: 220,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth : 1,
    borderColor: '#334155',
    
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#4BE3AC',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    marginVertical: 10,
  },
  doctorName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialty: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  durationText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalDoctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSpecialty: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TodaysAppointments;