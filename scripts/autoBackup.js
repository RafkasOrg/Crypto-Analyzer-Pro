import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_ROLE } from './config.js';

// Client biasa (baca & tulis user-level)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Client dengan akses admin (role)
const supabaseRoleClient = createClient(SUPABASE_URL, SUPABASE_ROLE);

// Backup dari tabel utama ke tabel backup
async function autoBackup() {
  const { data, error } = await supabase
    .from('market_data')
    .select('*');

  if (error) {
    console.error('Gagal ambil data:', error.message);
    return;
  }

  if (data.length === 0) {
    console.log('Tidak ada data untuk dibackup.');
    return;
  }

  const { error: insertError } = await supabaseRoleClient
    .from('market_data_backup')
    .insert(data);

  if (insertError) {
    console.error('Gagal backup data:', insertError.message);
  } else {
    console.log('Backup sukses! ✅');
  }
}

// Jalankan backup
autoBackup();

