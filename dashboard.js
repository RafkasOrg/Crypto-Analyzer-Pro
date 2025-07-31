// dashboard.js
// Tunggu DOM & Supabase SDK selesai diload
document.addEventListener("DOMContentLoaded", async () => {
  // Pastikan Supabase global tersedia
  if (typeof supabase === "undefined") {
    console.error("Supabase SDK tidak ditemukan!");
    return;
  }
// Supabase config
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = createClient(supabaseUrl, supabaseKey);

  // Fungsi untuk load alert dari tabel Supabase
  async function loadWhaleAlerts() {
    const container = document.getElementById("whale-alert-container");
    container.innerHTML = "<p>Loading alerts...</p>";

    const { data, error } = await client
      .from("whale_alerts")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(10);

    if (error) {
      container.innerHTML = `<p class="text-danger">Error loading whale alerts: ${error.message}</p>`;
      return;
    }

    container.innerHTML = "";

    data.forEach((alert) => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4 mb-4";
      card.innerHTML = `
        <div class="card p-3 shadow">
          <h5 class="card-title">${alert.crypto_symbol} - ${alert.transaction_type}</h5>
          <p class="card-text">
            <strong>Amount:</strong> ${Number(alert.amount).toLocaleString()} ${alert.crypto_symbol}<br>
            <strong>From:</strong> ${alert.from_address || 'Unknown'}<br>
            <strong>To:</strong> ${alert.to_address || 'Unknown'}<br>
            <strong>Exchange:</strong> ${alert.exchange || 'Unlabeled'}<br>
            <small class="text-secondary">${new Date(alert.timestamp).toLocaleString()}</small>
          </p>
          <span class="alert-badge">${alert.status || "Detected"}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Event listener tombol refresh
  window.loadWhaleAlerts = loadWhaleAlerts;

  // Load data awal
  loadWhaleAlerts();
});




