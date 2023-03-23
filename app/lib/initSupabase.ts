import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants'

// const supabaseUrl = 'https://kcsrkgqlnhytvexvoxcx.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjc3JrZ3Fsbmh5dHZleHZveGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTk4NzQsImV4cCI6MTk5NDUzNTg3NH0.B8kegu9VafHfzoOLNRWfmlXIc_SglXyoE_Snu13CZJ8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
