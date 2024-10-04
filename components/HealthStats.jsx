import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const organData = [
  {
    id: 1,
    name: 'Heart',
    image: require('../assets/images/heart2.png'),
    health: 92,
    doctor: 'Dr. Emily Cardio',
    lastCheckup: '2023-09-15',
    details: 'Normal heart rhythm, slight elevation in cholesterol levels.',
    chartData: [85, 88, 90, 92, 92],
  },
  {
    id: 2,
    name: 'Liver',
    image: require('../assets/images/liver.png'),
    health: 88,
    doctor: 'Dr. Michael Hepato',
    lastCheckup: '2023-10-02',
    details: 'Slight fatty liver detected. Recommended lifestyle changes.',
    chartData: [80, 82, 85, 87, 88],
  },
  {
    id: 3,
    name: 'Lungs',
    image: require('../assets/images/lungs.png'),
    health: 95,
    doctor: 'Dr. Sarah Pulmo',
    lastCheckup: '2023-11-20',
    details: 'Excellent lung capacity. No signs of respiratory issues.',
    chartData: [90, 92, 93, 94, 95],
  },
  {
    id: 4,
    name: 'Kidneys',
    image: require('../assets/images/kidney.png'),
    health: 90,
    doctor: 'Dr. Alex Nephro',
    lastCheckup: '2023-12-05',
    details: 'Good kidney function. Slight elevation in creatinine levels.',
    chartData: [86, 87, 89, 90, 90],
  },
];

const medicationAdherence = {
  overall: 85,
  medications: [
    { name: 'Lisinopril', adherence: 95 },
    { name: 'Metformin', adherence: 88 },
    { name: 'Atorvastatin', adherence: 92 },
    { name: 'Levothyroxine', adherence: 78 },
  ],
};

const HealthStats = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      animation.setValue(0);
    }
  }, [modalVisible]);

  const openModal = (organ) => {
    setSelectedOrgan(organ);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrgan(null);
  };

  const renderOrganItem = (organ) => (
    <TouchableOpacity
      key={organ.id}
      style={styles.organItem}
      onPress={() => openModal(organ)}
    >
      <Image source={organ.image} style={styles.organImage} />
      <Text style={styles.organName}>{organ.name}</Text>
      <Text style={styles.organHealth}>{organ.health}%</Text>
    </TouchableOpacity>
  );

  const renderMedicationAdherence = () => (
    <View style={styles.medicationAdherenceContainer}>
      <Text style={styles.sectionTitle}>Medication Adherence</Text>
      <View style={styles.overallAdherenceContainer}>
        <Text style={styles.overallAdherenceText}>Overall Adherence</Text>
        <Text style={styles.overallAdherencePercentage}>{medicationAdherence.overall}%</Text>
      </View>
      {medicationAdherence.medications.map((med, index) => (
        <View key={index} style={styles.medicationItem}>
          <Text style={styles.medicationName}>{med.name}</Text>
          <View style={styles.adherenceBarContainer}>
            <View style={[styles.adherenceBar, { width: `${med.adherence}%` }]} />
          </View>
          <Text style={styles.adherencePercentage}>{med.adherence}%</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Stats</Text>
      <View style={styles.organContainer}>
        {organData.map(renderOrganItem)}
      </View>
      {renderMedicationAdherence()}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: animation,
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            {selectedOrgan && (
              <ScrollView>
                <Animated.Image
                  source={selectedOrgan.image}
                  style={[
                    styles.modalOrganImage,
                    {
                      transform: [
                        {
                          scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Text style={styles.modalOrganName}>{selectedOrgan.name}</Text>
                <Animated.View
                  style={[
                    styles.healthPercentageContainer,
                    {
                      opacity: animation,
                    },
                  ]}
                >
                  <Text style={styles.healthPercentageText}>Health</Text>
                  <Text style={styles.healthPercentage}>{selectedOrgan.health}%</Text>
                </Animated.View>
                <View style={styles.infoRow}>
                  <Ionicons name="medical" size={24} color="#4A90E2" />
                  <Text style={styles.infoText}>Doctor: {selectedOrgan.doctor}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar" size={24} color="#4A90E2" />
                  <Text style={styles.infoText}>Last Checkup: {selectedOrgan.lastCheckup}</Text>
                </View>
                <Text style={styles.detailsTitle}>Details:</Text>
                <Text style={styles.detailsText}>{selectedOrgan.details}</Text>
                <Text style={styles.chartTitle}>Health Trend</Text>
                <LineChart
                  data={{
                    labels: ['', '', '', '', ''],
                    datasets: [{ data: selectedOrgan.chartData }],
                  }}
                  width={300}
                  height={200}
                  chartConfig={{
                    backgroundColor: '#1E2923',
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  bezier
                  style={styles.chart}
                />
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  organContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  organItem: {
    width: '48%',
    backgroundColor: '#2E383F',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  organImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  organName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  organHealth: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  medicationAdherenceContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  overallAdherenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  overallAdherenceText: {
    fontSize: 18,
    color: '#FFF',
  },
  overallAdherencePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicationName: {
    flex: 2,
    fontSize: 16,
    color: '#FFF',
  },
  adherenceBarContainer: {
    flex: 3,
    height: 10,
    backgroundColor: '#2E383F',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  adherenceBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  adherencePercentage: {
    flex: 1,
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'right',
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
  modalOrganImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalOrganName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  healthPercentageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  healthPercentageText: {
    fontSize: 18,
    color: '#FFF',
    marginRight: 10,
  },
  healthPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#BBB',
    lineHeight: 24,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HealthStats;