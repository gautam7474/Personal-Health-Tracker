import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Tracker</Text>
      <Text style={styles.subtitle}>Track Water, Sleep & Steps easily!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('Dashboard')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f8ff' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#2c3e50', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#7f8c8d', 
    marginBottom: 50 
  },
  button: { 
    backgroundColor: '#3498db', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    elevation: 5 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});