import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho';

export const supabase = createClient(supabaseUrl, supabaseKey);
