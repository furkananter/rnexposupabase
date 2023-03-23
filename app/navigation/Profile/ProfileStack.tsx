import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../../components/Profile/Account';
import UpdateProfile from '../../components/Profile/UpdateProfile';
import React from 'react';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Account',
        }}
        name="Account"
        component={Account}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Update Profile',
          headerShown: true,
        }}
        name="updateProfile"
        component={UpdateProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
