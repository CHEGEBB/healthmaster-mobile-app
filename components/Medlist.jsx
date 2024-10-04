import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const medicationData = [
  {
    id: 1,
    name: 'Aspirin',
    image: require('../assets/images/aspirin.jpeg'),
    dosage: '500mg',
    frequency: 'Once daily',
    time: '08:00 AM',
    description: 'Used to reduce pain, fever, or inflammation.',
  },
  {
    id: 2,
    name: 'Lisinopril',
    image: require('../assets/images/lisinopril.jpeg'),
    dosage: '10mg',
    frequency: 'Once daily',
    time: '09:00 AM',
    description: 'Used to treat high blood pressure and heart failure.',
  },
  {
    id: 3,
    name: 'Metformin',
    image: require('../assets/images/metformin.jpeg'),
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '09:00 AM, 09:00 PM',
    description: 'Used to control blood sugar levels in type 2 diabetes.',
  },
  {
    id: 4,
    name: 'Simvastatin',
    image: require('../assets/images/simvastatin.jpeg'),
    dosage: '20mg',
    frequency: 'Once daily',
    time: '08:00 PM',
    description: 'Used to lower cholesterol and triglycerides in the blood.',
  },
  {
    id: 5,
    name: 'Levothyroxine',
    image: require('../assets/images/levothyroxine.jpeg'),
    dosage: '100mcg',
    frequency: 'Once daily',
    time: '07:00 AM',
    description: 'Used to treat hypothyroidism and to prevent certain types of goiters.',
  },
];

const MedicationList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const openModal = (medication) => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedication(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Medication Plan</Text>
      {medicationData.map((medication) => (
        <TouchableOpacity 
          key={medication.id} 
          style={styles.medicationItem}
          onPress={() => openModal(medication)}
        >
          <Image source={medication.image} style={styles.medicationImage} />
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>{medication.name}</Text>
            <Text style={styles.medicationTime}>{medication.time}</Text>
          </View>
          <Ionicons name="chevron-forward-circle-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            {selectedMedication && (
              <ScrollView>
                <Image source={selectedMedication.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedMedication.name}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="ban-outline" size={24} color="#4A90E2" />
                  <Text style={styles.infoText}>Dosage: {selectedMedication.dosage}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={24} color="#4A90E2" />
                  <Text style={styles.infoText}>Time: {selectedMedication.time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="repeat-outline" size={24} color="#4A90E2" />
                  <Text style={styles.infoText}>Frequency: {selectedMedication.frequency}</Text>
                </View>
                <Text style={styles.descriptionTitle}>Description:</Text>
                <Text style={styles.descriptionText}>{selectedMedication.description}</Text>
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
    backgroundColor: '#161622',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E383F',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  medicationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  medicationTime: {
    fontSize: 14,
    color: '#BBB',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#161622',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#BBB',
    lineHeight: 24,
  },
});

export default MedicationList;