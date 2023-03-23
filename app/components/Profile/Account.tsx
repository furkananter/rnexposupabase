import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/initSupabase';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { Button } from '@rneui/base';
import { AppContext } from '../../context/AppContext';
import { Link } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';

const Account = () => {
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {

        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);

      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar userId={session?.user.id} />
      </View>
      <View>
        <Link to="/updateProfile">
          <Ionicons name="settings" size={24} color="black" />
        </Link>
      </View>

      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          Profile
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={styles.text}>Name: </Text>
          <Text style={styles.text}>{fullName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        ></View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={styles.text}>Username: </Text>
          <Text style={styles.text}>{username}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <Text style={styles.text}>Website: </Text>
          <Text style={styles.text}>{website}</Text>
        </View>
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Account;
