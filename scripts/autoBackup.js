import fs from 'fs';
import path from 'path';
import { supabase } from './supabaseClient.js';

const today = new Date().toISOString().slice(0, 10);

const exportToCSV = async () => {
  const { data, error } = await supabase.from('sentiment_scores').select('*');
  if (error) {
    console.error('❌ Gagal fetch:', error.message);
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => `"${row[h]}"`).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const filePath = path.join('./backups', `sentiment-${today}.csv`);
  fs.writeFileSync(filePath, csv);

  console.log(`✅ Backup selesai: ${filePath}`);
};

exportToCSV();
