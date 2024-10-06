import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddMedication from '../../components/AddMedication'; 
import SeeMedication from '../../components/SeeMedication'; 
import MedicationOverview from '../../components/MedicationOverview'; 

const Stack = createStackNavigator();

const MyMeds = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator 
        initialRouteName="MedicationOverview"
        screenOptions={{
          headerShown: false  // This will hide the header for all screens
        }}
      >
        <Stack.Screen name="MedicationOverview" component={MedicationOverview} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="SeeMedication" component={SeeMedication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyMeds;