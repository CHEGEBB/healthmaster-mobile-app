import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Animated, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const medicationReminders = [
  {
    id: 1,
    name: 'Lisinopril',
    time: '08:00 AM',
    details: 'Take with food. Avoid grapefruit.',
    image: require('../assets/images/lisinopril.jpeg'),
    completed: false,
  },
  {
    id: 2,
    name: 'Metformin',
    time: '01:00 PM',
    details: 'Take with meals to reduce stomach upset.',
    image: require('../assets/images/metformin.jpeg'),
    completed: false,
  },
  {
    id: 3,
    name: 'Atorvastatin',
    time: '08:00 PM',
    details: 'Take at bedtime. Avoid grapefruit juice.',
    image: require('../assets/images/pillss.jpeg'),
    completed: false,
  },
];

const MedicationReminders = () => {
  const [reminders, setReminders] = useState(medicationReminders);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [showAllReminders, setShowAllReminders] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const navigation = useNavigation();

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

  const openModal = (reminder) => {
    setSelectedReminder(reminder);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReminder(null);
    setConfettiVisible(false);
  };

  const markAsComplete = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: true } : reminder
    ));
    setConfettiVisible(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const renderReminderItem = (reminder) => (
    <TouchableOpacity
      key={reminder.id}
      style={[
        styles.reminderItem,
        { backgroundColor: reminder.completed ? '#4CAF5066' : '#2E383F66' }
      ]}
      onPress={() => openModal(reminder)}
    >
      <Image source={reminder.image} style={styles.reminderImage} />
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderName}>{reminder.name}</Text>
        <Text style={styles.reminderTime}>{reminder.time}</Text>
      </View>
      {reminder.completed && (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.completedIcon} />
      )}
    </TouchableOpacity>
  );

  const displayedReminders = showAllReminders ? reminders : reminders.slice(0, 2);

  return (
    <ImageBackground
      source={require('../assets/images/app.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        
        <Text style={styles.title}>Important Medications</Text>
         <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowAllReminders(!showAllReminders)}
          >
            <Ionicons 
              name={showAllReminders ? "chevron-up-circle" : "chevron-down-circle"} 
              size={32} 
              color="#4A90E2" 
            />
            <Text className="text-white" style={styles.see}>see all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('reminders')}
          >
            <Ionicons name="add-circle" size={32} color="#4A90E2" />
                        <Text className="text-white" style={styles.see}>Add</Text>

          </TouchableOpacity>
        </View>
        
        <View style={styles.reminderContainer}>
          {displayedReminders.map(renderReminderItem)}
        </View>
       
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
              {selectedReminder && (
                <ScrollView contentContainerStyle={styles.modalScroll}>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={selectedReminder.image}
                      style={styles.modalMedicationImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.modalInfoContainer}>
                    <Text style={styles.modalMedicationName}>{selectedReminder.name}</Text>
                    <View style={styles.infoRow}>
                      <Ionicons name="time" size={24} color="#4A90E2" />
                      <Text style={styles.infoText}>Time: {selectedReminder.time}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="information-circle" size={24} color="#4A90E2" />
                      <Text style={styles.infoText}>Details: {selectedReminder.details}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.takeNowButton}
                      onPress={() => markAsComplete(selectedReminder.id)}
                    >
                      <Text style={styles.takeNowButtonText}>I'll take it now</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Animated.View>
          </View>
        </Modal>

        {confettiVisible && (
          <LottieView
            source={require('../assets/animations/confetti.json')}
            autoPlay
            loop={false}
            style={styles.confetti}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(22, 22, 34, 0.8)',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  reminderContainer: {
    marginBottom: 20,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E383F66',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  reminderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 16,
    color: '#BBB',
  },
  completedIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    height: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalScroll: {
    flexGrow: 1,
  },
  modalImageContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,

  },
  modalMedicationImage: {
    width: '80%',
    height: '80%',
    borderRadius: 20,

  },
  modalInfoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalMedicationName: {
    fontSize: 28,
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
    fontSize: 18,
    color: '#FFF',
    marginLeft: 10,
    flex: 1,
  },
  takeNowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  takeNowButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },

});

export default MedicationReminders;