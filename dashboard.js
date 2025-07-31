// dashboard.js

// Supabase config
const supabaseUrl = 'https://pppcusoyjkvlsfdurgpv.supabase.co'; // Ganti sesuai proyek kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcGN1c295amt2bHNmZHVyZ3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk3NDAsImV4cCI6MjA2OTU1NTc0MH0.PJOY8puQcps88f0e9ZyS2-ol1Zmm6y7p8zKJSgsQcho'; // Ganti sesuai key kamu
const supabase = createClient(supabaseUrl, supabaseKey);

// Ambil referensi elemen DOM
const walletForm = document.getElementById("wallet-form");
const walletInput = document.getElementById("wallet-address");
const walletList = document.getElementById("wallet-list");
const walletActivity = document.getElementById("wallet-activity");

// Event tambah wallet
walletForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const address = walletInput.value.trim();

  if (!address) return;

  // Simpan ke Supabase
  const { error } = await supabase.from("wallets").insert({ address });
  if (error) {
    Swal.fire("Gagal", "Gagal menyimpan wallet!", "error");
    return;
  }

  Swal.fire("Berhasil", "Wallet ditambahkan", "success");
  walletInput.value = "";
  loadWallets();
});

// Muat wallet dari Supabase
async function loadWallets() {
  const { data, error } = await supabase.from("wallets").select("*").order("id", { ascending: false });

  walletList.innerHTML = "";

  if (error) {
    walletList.innerHTML = "<li class='list-group-item text-danger'>Gagal memuat wallet</li>";
    return;
  }

  data.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.address}
      <button class="btn btn-sm btn-outline-danger" onclick="deleteWallet(${item.id})">Hapus</button>
    `;
    walletList.appendChild(li);
  });
}

// Hapus wallet
async function deleteWallet(id) {
  const { error } = await supabase.from("wallets").delete().eq("id", id);
  if (!error) {
    Swal.fire("Dihapus", "Wallet berhasil dihapus", "info");
    loadWallets();
  }
}

// Muat dummy aktivitas wallet
async function loadWalletActivity() {
  const { data, error } = await supabase.from("wallets").select("*").order("id", { ascending: false });

  walletActivity.innerHTML = "";

  if (error || !data.length) {
    walletActivity.innerHTML = "<p>Tidak ada aktivitas.</p>";
    return;
  }

  data.slice(0, 5).forEach((item) => {
    const div = document.createElement("div");
    div.className = "mb-2 border-bottom pb-2";
    div.innerHTML = `
      <strong>${item.address}</strong><br />
      Terakhir aktif: ${new Date().toLocaleString()}<br />
      Transaksi terakhir: Simulasi transfer token
    `;
    walletActivity.appendChild(div);
  });
}

// Inisialisasi awal
loadWallets();
loadWalletActivity();
setInterval(loadWalletActivity, 60000); // auto-refresh tiap 1 menit




