// dashboard.js
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Fungsi load data Whale Alert
async function loadWhaleData() {
  const table = document.querySelector("#whaleTable tbody");
  table.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

  const { data, error } = await supabase
    .from('whale_alerts')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching data:", error.message);
    table.innerHTML = "<tr><td colspan='6'>Error loading data.</td></tr>";
    return;
  }

  if (data.length === 0) {
    table.innerHTML = "<tr><td colspan='6'>No whale transactions found.</td></tr>";
    return;
  }

  // Tampilkan hasil
  table.innerHTML = "";
  data.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(tx.timestamp).toLocaleString()}</td>
      <td>${tx.token}</td>
      <td>${tx.amount}</td>
      <td>${tx.from_address}</td>
      <td>${tx.to_address}</td>
      <td><a href="${tx.tx_hash}" target="_blank">View</a></td>
    `;
    table.appendChild(row);
  });
}
