// dashboard.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// Supabase config
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = createClient(supabaseUrl, supabaseKey);

const walletInput = document.getElementById("walletInput");
const addWalletBtn = document.getElementById("addWallet");
const walletList = document.getElementById("walletList");
const walletActivity = document.getElementById("walletActivity");

async function loadWallets() {
  const { data, error } = await supabase.from("wallets").select("*");
  walletList.innerHTML = "";

  if (data && data.length) {
    for (const item of data) {
      const li = document.createElement("li");
      li.className = "list-group-item bg-dark text-white border-light";
      li.innerText = item.address;
      walletList.appendChild(li);

      // Ambil aktivitas per address
      fetchActivity(item.address);
    }
  } else {
    walletList.innerHTML = "<li class='text-muted'>Belum ada wallet favorit.</li>";
  }
}

addWalletBtn.onclick = async () => {
  const address = walletInput.value.trim();
  if (!address) return;

  const { error } = await supabase.from("wallets").insert({ address });
  if (!error) {
    walletInput.value = "";
    loadWallets();
  }
};

async function fetchActivity(address) {
  const url = `https://api.whale-alert.io/v1/transactions?api_key=YOUR_API_KEY&limit=1&address=${address}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (json.transactions && json.transactions.length) {
      const tx = json.transactions[0];
      const info = `
        <p>💸 ${tx.symbol} - ${tx.amount} ${tx.symbol} (${tx.from.owner} ➜ ${tx.to.owner})</p>
        <p>🕒 ${new Date(tx.timestamp * 1000).toLocaleString()}</p>
        <hr />
      `;
      walletActivity.innerHTML += info;
    } else {
      walletActivity.innerHTML += `<p>Tidak ditemukan transaksi untuk ${address}</p>`;
    }
  } catch (err) {
    walletActivity.innerHTML += `<p class="text-danger">Gagal mengambil data untuk ${address}</p>`;
  }
}

// Inisialisasi
loadWallets();





