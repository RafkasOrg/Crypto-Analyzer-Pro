import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxxxx.supabase.co';
const supabaseKey = 'your-service-role-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
