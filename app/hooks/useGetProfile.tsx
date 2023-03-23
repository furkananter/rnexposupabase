import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/initSupabase';
import { AppContext } from '../context/AppContext';

export const useGetProfile = () => {
  const { session } = useContext(AppContext);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
      .single();

    if (error) {
      console.log('Error fetching user:', error.message);
    } else {
      return data;
    }
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(),

    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { user, isLoading, error };
};
