import { View, Text, Alert } from 'react-native';
import React from 'react';
import { supabase } from '../../lib/initSupabase';
import { Button, Input } from '@rneui/base';

// const Register = ({ session }: { session: Session }) => {
const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [retypePassword, setRetypePassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View>
      <Text>ForgotPassword</Text>
    </View>
  );
};

export default ForgotPassword;
