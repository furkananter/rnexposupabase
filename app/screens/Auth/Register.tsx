import { View, Text, Alert } from 'react-native';
import React from 'react';
import { supabase } from '../../lib/initSupabase';
import { Button, Input } from '@rneui/base';
import { Session } from '@supabase/supabase-js';

// const Register = ({ session }: { session: Session }) => {
const Register = () => {
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
    <View
      style={{
        flex: 1,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text>Register</Text>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Hesabınız oluşturuluyor...</Text>
        </View>
      ) : (
        <>
          <Input
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
          <Input
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="none"
            textContentType="name"
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
          />
          <Input
            placeholder="Retype Password"
            onChangeText={(text) => setRetypePassword(text)}
            value={retypePassword}
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
          />
          <Text>
            {password.length && retypePassword.length > 0
              ? password === retypePassword
                ? 'Passwords match'
                : 'Passwords do not match'
              : null}
          </Text>

          {loading ? <Text>Loading...</Text> : null}
          <Button
            disabled={loading}
            onPress={signUpWithEmail}
            title="Register"
          />
        </>
      )}
    </View>
  );
};

export default Register;
