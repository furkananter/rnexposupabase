import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './app/lib/initSupabase';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './app/navigation/AuthStack';
import { AppContext } from './app/context/AppContext';
import MainStack from './app/navigation/MainStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

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

  const Auth = () => (session && session.user ? <MainStack /> : <AuthStack />);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ session, loading }}>
        <NavigationContainer>
          <SafeAreaProvider style={{ flex: 1 }}>
            <Auth />
          </SafeAreaProvider>
        </NavigationContainer>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
