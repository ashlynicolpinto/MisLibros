import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://ccacrntppglychptygrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYWNybnRwcGdseWNocHR5Z3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MTI0NTgsImV4cCI6MjEwNjk4ODQ1OH0._NpUTkQSs9Lk602h5jEzodnvFRiqpz4iDcRbCX0EcZs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});