import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../app/screens/HomeScreen';
import ProfileScreen from '../../app/screens/ProfileScreen';
import MainTabs from './MainTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoScreen from '../screens/TodoScreen';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          options={{
            headerTitle: 'Profile',
          }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainStack;
