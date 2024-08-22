import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConsultasView } from './consultas/ConsultasView';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/pet.png')}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar"
          onPress={() => navigation.navigate('contacts')}
          color="#006400" // Cor verde escura
        />
      </View>
    </View>
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name="home" component={HomeScreen} options={homeOptions} />
        <Stack.Screen name="contacts" component={ConsultasView} options={contactsOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const homeOptions = {
  headerShown: false,
};

const contactsOptions = {
  title: 'Friends Pet',
};

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#25CCB0',
  },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0f0c0', 
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
  },
});

