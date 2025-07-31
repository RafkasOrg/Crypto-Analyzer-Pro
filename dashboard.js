// dashboard.js
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadWhaleData() {
  const table = document.querySelector("#whaleTable tbody");
  table.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

  try {
    const { data, error } = await supabase
      .from('whale_alerts')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(20);

    if (error) throw error;

    if (!data || data.length === 0) {
      table.innerHTML = "<tr><td colspan='6'>No whale transactions found.</td></tr>";
      return;
    }

    table.innerHTML = "";
    data.forEach(tx => {
      const timestamp = tx.timestamp
        ? new Date(tx.timestamp).toLocaleString()
        : 'N/A';
      const txLink = tx.tx_hash?.startsWith("http")
        ? tx.tx_hash
        : `https://etherscan.io/tx/${tx.tx_hash}`;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${timestamp}</td>
        <td>${tx.token || '-'}</td>
        <td>${tx.amount?.toLocaleString() || '-'}</td>
        <td>${tx.from_address || '-'}</td>
        <td>${tx.to_address || '-'}</td>
        <td><a href="${txLink}" target="_blank">View</a></td>
      `;
      table.appendChild(row);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    table.innerHTML = "<tr><td colspan='6'>Error loading whale data.</td></tr>";
  }
}
