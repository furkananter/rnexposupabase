import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Account from '../components/Profile/Account';
import ProfileStack from '../navigation/Profile/ProfileStack';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
});

export default ProfileScreen;
