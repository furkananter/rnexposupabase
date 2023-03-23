import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/initSupabase';
import { Session } from '@supabase/supabase-js';
import { ContextType, ProfileUpdateInfo, Props } from '../screens/types/type';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';

export const AppContext = createContext<ContextType>({
  session: null,
  loading: false,
});

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
