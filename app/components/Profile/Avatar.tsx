import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/initSupabase';

interface Props {
  userId: string | undefined;
}

const Avatar = ({ userId }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getAvatarUrl() {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(`${userId}.png`);
        if (error) {
          throw error;
        }

        setAvatarUrl(URL.createObjectURL(data));
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error downloading avatar: ', error.message);
        }
      }
    }

    getAvatarUrl();
  }, [userId]);

  async function pickAndUpdateImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access media library is required!');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });

      if (!result.canceled) {
        const file = {
          uri: result.assets[0].uri,
          name: `${userId}.png`,
          type: 'image/png',
        };

        const formData = new FormData();
        formData.append('file', file);
        console.log('formdata,', formData);

        const { error } = await supabase.storage
          .from('avatars')
          .upload(`${userId}.png`, formData);

        if (error) {
          throw error;
        }

        setAvatarUrl(result.assets[0].uri);

        const { error: userError } = await supabase
          .from('users')
          .update({ avatar_url: `avatars/${userId}.png` })
          .match({ id: userId });

        if (userError) {
          throw userError;
        }

        console.log('Avatar uploaded successfully!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error picking and updating image: ', error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      {avatarUrl ? (
        <TouchableOpacity onPress={pickAndUpdateImage}>
          <Image source={{ uri: avatarUrl }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickAndUpdateImage}>
          <View style={styles.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#999',
  },
});

export default Avatar;
