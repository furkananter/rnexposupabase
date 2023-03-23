import { Button, Input } from '@rneui/base';
import React from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { supabase } from '../../lib/initSupabase';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.headerText}>Login</Text>
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
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          textContentType="password"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button title="Login" disabled={loading} onPress={signInWithEmail} />
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Login;
