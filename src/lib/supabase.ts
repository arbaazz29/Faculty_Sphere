import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://blojhlmzvvwocrxhuhuy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsb2pobG16dnZ3b2NyeGh1aHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Njg3NDIsImV4cCI6MjA1NDI0NDc0Mn0.4SjaSJWOZ2TRlzNQyOO3ue1nmrfZMDuhxEohxayxSpo';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);