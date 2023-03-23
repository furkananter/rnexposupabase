import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: string | undefined;
  size: number | undefined;
  color: string | undefined;
};

const TabBarIcon = ({ name, size, color }: Props) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default TabBarIcon;
