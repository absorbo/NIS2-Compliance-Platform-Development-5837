import { createClient } from '@supabase/supabase-js'

// Initialize with empty credentials that will be updated later
let supabaseClient = null;

// Create Supabase client initialization function
export const initSupabase = async () => {
  try {
    // Get Supabase credentials from tool
    const { data: credentials } = await getSupabaseCredentials({ input: 'get_credentials' });
    
    if (!credentials?.projectId || !credentials?.anonKey) {
      throw new Error('Missing Supabase credentials');
    }

    const SUPABASE_URL = `https://${credentials.projectId}.supabase.co`;
    const SUPABASE_ANON_KEY = credentials.anonKey;

    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });

    return supabaseClient;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
};

// Export a function to get the Supabase client
export const getSupabase = () => {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabaseClient;
};

export default getSupabase;