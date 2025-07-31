// dashboard.js
<!-- Whale Tracker Section -->
<section id="whale-tracker" class="p-6 bg-gray-900 text-white rounded-lg shadow-xl my-6">
  <h2 class="text-2xl font-bold mb-4">🐋 Whale Alert Tracker (Live)</h2>
  <div id="whale-alert-container" class="space-y-4">
    <p class="text-sm text-gray-400">Menampilkan transaksi whale dari blockchain secara real-time menggunakan data dari <a href="https://docs.whale-alert.io/" target="_blank" class="underline text-blue-400">Whale Alert API</a>.</p>
    <div id="whale-alerts" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
  </div>
</section>

<!-- Tambahkan ini di akhir body sebelum </body> -->
<script>
// Supabase config
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu

async function fetchWhaleAlerts() {
  try {
    const res = await fetch(whaleApiUrl);
    const data = await res.json();
    const container = document.getElementById("whale-alerts");
    container.innerHTML = "";

    data.transactions.forEach(tx => {
      const html = `
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <p><strong>🪙 Coin:</strong> ${tx.symbol.toUpperCase()}</p>
          <p><strong>💰 Jumlah:</strong> ${Number(tx.amount).toLocaleString()} ${tx.symbol.toUpperCase()}</p>
          <p><strong>💸 Nilai (USD):</strong> $${Number(tx.amount_usd).toLocaleString()}</p>
          <p><strong>🔄 Dari:</strong> ${tx.from.owner_type} (${tx.from.address})</p>
          <p><strong>➡️ Ke:</strong> ${tx.to.owner_type} (${tx.to.address})</p>
          <p><strong>⏱️ Waktu:</strong> ${new Date(tx.timestamp * 1000).toLocaleString()}</p>
        </div>
      `;
      container.innerHTML += html;
    });
  } catch (err) {
    console.error("Gagal mengambil data Whale Alert:", err);
    document.getElementById("whale-alerts").innerHTML = "<p class='text-red-500'>Gagal memuat data. Coba lagi nanti.</p>";
  }
}

// Panggil saat halaman dibuka dan auto refresh setiap 3 menit
fetchWhaleAlerts();
setInterval(fetchWhaleAlerts, 180000);
</script>



