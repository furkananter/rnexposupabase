import { View, Text, Alert } from 'react-native';
import { Button, Input } from '@rneui/base';
import { supabase } from '../../lib/initSupabase';
import { AppContext } from '../../context/AppContext';
import { useGetProfile } from '../../hooks/useGetProfile';
import React, { useContext, useState, useEffect } from 'react';

const UpdateProfile = () => {
  const { session } = useContext(AppContext);
  const { user } = useGetProfile();
  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFullName(user.full_name);
      setWebsite(user.website);
      // setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    full_name: string;
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',

        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Update Profile
      </Text>
      {loading ? (
        <View>
          <Text>Profile is updating...</Text>
        </View>
      ) : (
        <>
          <View>
            <Text>Username</Text>
            <Input
              placeholder="Username"
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>
          <View>
            <Text>Full Name</Text>

            <Input
              placeholder="Name"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              autoCapitalize="none"
              textContentType="name"
            />
          </View>
          <View>
            <Text>Website</Text>
            <Input
              placeholder="Website"
              onChangeText={(text) => setWebsite(text)}
              value={website}
              autoCapitalize="none"
              textContentType="URL"
            />
          </View>
          <Button
            onPress={() => {
              updateProfile({
                username,
                full_name: fullName,
                website,
                // avatar_url: avatarUrl,
              });
            }}
          >
            Update Profile
          </Button>
        </>
      )}
    </View>
  );
};

export default UpdateProfile;
