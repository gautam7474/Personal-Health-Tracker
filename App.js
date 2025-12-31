import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import ActivityLogScreen from './screens/ActivityLogScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard', headerLeft: null }} 
        />

        <Stack.Screen 
          name="LogActivity" 
          component={ActivityLogScreen} 
          options={{ title: 'Log Activity' }}
        />

        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: '7-Day History' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}