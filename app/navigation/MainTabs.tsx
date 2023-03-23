import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Account from '../components/Profile/Account';
import TabBarIcon from '../components/ui/TabBarIcon';
import ProfileStack from './Profile/ProfileStack';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return <TabBarIcon {...props} name="home" size={30} />;
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return <TabBarIcon {...props} name="add" size={30} />;
          },
        }}
        name="Todo"
        component={TodoScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return <TabBarIcon {...props} name="person" size={30} />;
          },
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
