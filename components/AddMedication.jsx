import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Camera } from 'expo-camera';
import LottieView from 'lottie-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AddMedication = ({ navigation }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [medicineImage, setMedicineImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const medicationStyles = [
    { icon: 'pill', label: 'Capsule' },
    { icon: 'needle', label: 'Injection' },
    { icon: 'tablet', label: 'Solid' },
    { icon: 'cup-water', label: 'Liquid' },
    { icon: 'inhaler', label: 'Inhaler' },
  ];

  const timeSlots = [
    { id: 1, time: '08:00 AM' },
    { id: 2, time: '12:00 PM' },
    { id: 3, time: '04:00 PM' },
    { id: 4, time: '08:00 PM' },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleAddMedication = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowDetailsModal(true);
    }, 5000);
  };

  const takePicture = async () => {
    if (hasPermission) {
      const photo = await this.camera.takePictureAsync();
      setMedicineImage(photo.uri);
      setShowCamera(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/register.png')}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Medication</Text>
      </ImageBackground>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication Name</Text>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons name="medicine" size={24} color="#6B7280" />
            <TextInput
              style={styles.textInput}
              placeholder="Enter medication name"
              placeholderTextColor="#9CA3AF"
              value={medicationName}
              onChangeText={setMedicationName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication Dosage</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>1</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={3}
              step={1}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#1F2937"
              thumbTintColor="#3B82F6"
              value={dosage}
              onValueChange={setDosage}
            />
            <Text style={styles.sliderLabel}>3</Text>
          </View>
          <Text style={styles.dosageText}>{`${dosage} time${dosage > 1 ? 's' : ''} per day`}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication Duration</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <MaterialCommunityIcons name="calendar" size={24} color="#6B7280" />
              <Text style={styles.dateText}>
                {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <MaterialCommunityIcons name="calendar" size={24} color="#6B7280" />
              <Text style={styles.dateText}>
                {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Time</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedTime === slot.id && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(slot.id)}
              >
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={24} 
                  color={selectedTime === slot.id ? '#FFFFFF' : '#6B7280'} 
                />
                <Text style={[
                  styles.timeText,
                  selectedTime === slot.id && styles.selectedTimeText,
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Medication Style</Text>
          <View style={styles.styleContainer}>
            {medicationStyles.map((style, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.styleButton,
                  selectedStyle === index && styles.selectedStyleButton,
                ]}
                onPress={() => setSelectedStyle(index)}
              >
                <MaterialCommunityIcons 
                  name={style.icon} 
                  size={30} 
                  color={selectedStyle === index ? '#FFFFFF' : '#6B7280'} 
                />
                <Text style={[
                  styles.styleText,
                  selectedStyle === index && styles.selectedStyleText,
                ]}>
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={() => setShowCamera(true)}
        >
          <MaterialCommunityIcons name="camera" size={24} color="#FFFFFF" />
          <Text style={styles.cameraButtonText}>Take Photo of Medicine</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddMedication}
        >
          <Text style={styles.addButtonText}>Add Medication</Text>
          <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <Modal visible={showCamera} animationType="slide">
        <Camera
          ref={ref => { this.camera = ref }}
          style={styles.camera}
        >
          <View style={styles.cameraButtons}>
            <TouchableOpacity 
              style={styles.cameraCancelButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cameraCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cameraCaptureButton}
              onPress={takePicture}
            >
              <MaterialCommunityIcons name="camera" size={36} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.successModal}>
          <LottieView
            source={require('../assets/animations/success.json')}
            autoPlay
            loop={false}
            style={styles.successAnimation}
          />
        </View>
      </Modal>

      <Modal visible={showDetailsModal} animationType="slide">
        <View style={styles.detailsModal}>
          <Text style={styles.detailsTitle}>Medication Details</Text>
          <View style={styles.detailsContent}>
            <DetailItem label="Name" value={medicationName} />
            <DetailItem label="Dosage" value={`${dosage} time(s) per day`} />
            <DetailItem label="Duration" value={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`} />
            <DetailItem label="Time" value={timeSlots.find(slot => slot.id === selectedTime)?.time || 'Not set'} />
            <DetailItem label="Style" value={medicationStyles[selectedStyle].label} />
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowDetailsModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    height: 300,
    justifyContent: 'flex-end',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dosageText: {
    color: '#3B82F6',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    width: '48%',
  },
  dateText: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#3B82F6',
  },
  timeText: {
    color: '#6B7280',
    marginTop: 5,
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  styleButton: {
    width: '30%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedStyleButton: {
    backgroundColor: '#3B82F6',
  },
  styleText: {
    color: '#6B7280',
    marginTop: 5,
  },
  selectedStyleText: {
    color: '#FFFFFF',
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
  },
addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3B82F6',
      borderRadius: 12,
      padding: 15,
      marginBottom: 30,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
    camera: {
      flex: 1,
    },
    cameraButtons: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    cameraCaptureButton: {
      alignSelf: 'center',
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#3B82F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraCancelButton: {
      alignSelf: 'center',
      padding: 15,
    },
    cameraCancelText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    successModal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successAnimation: {
      width: 200,
      height: 200,
    },
    detailsModal: {
      flex: 1,
      backgroundColor: '#111827',
      padding: 20,
    },
    detailsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 20,
      textAlign: 'center',
    },
    detailsContent: {
      flex: 1,
    },
    detailItem: {
      flexDirection: 'row',
      marginBottom: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#1F2937',
    },
    detailLabel: {
      flex: 1,
      fontSize: 16,
      color: '#6B7280',
    },
    detailValue: {
      flex: 2,
      fontSize: 16,
      color: '#FFFFFF',
    },
    closeButton: {
      backgroundColor: '#3B82F6',
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default AddMedication;