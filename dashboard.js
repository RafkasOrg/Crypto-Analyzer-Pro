// dashboard.js

// Supabase config
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch data dari tabel wallet_activity
async function loadWalletActivity() {
  const { data, error } = await supabase
    .from('wallet_activity')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Gagal ambil data:', error);
    document.getElementById('wallet-activity').innerHTML = '<p>Gagal ambil data 😥</p>';
    return;
  }

  // Render tabel
  let html = `
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Aktivitas</th>
          <th>Waktu</th>
          <th>USD</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach((item) => {
    html += `
      <tr>
        <td>${item.wallet_address}</td>
        <td>${item.activity_type}</td>
        <td>${new Date(item.timestamp).toLocaleString()}</td>
        <td>$${item.value_usd.toLocaleString()}</td>
      </tr>
    `;
  });

  html += '</tbody></table>';
  document.getElementById('wallet-activity').innerHTML = html;
}

// Panggil saat halaman ready
document.addEventListener('DOMContentLoaded', loadWalletActivity);



