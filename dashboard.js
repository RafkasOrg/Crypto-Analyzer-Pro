// dashboard.js

import { supabase } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const user = await getCurrentUser();

  if (!user) {
    alert('Silakan login terlebih dahulu.');
    window.location.href = '/login.html';
    return;
  }

  loadWalletActivity(user.id);
});

async function getCurrentUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Gagal mendapatkan user:', error.message);
    return null;
  }

  return user;
}

async function loadWalletActivity(userId) {
  const { data, error } = await supabase
    .from('wallet_activity')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Gagal mengambil data wallet:', error.message);
    return;
  }

  const tableBody = document.getElementById('wallet-activity-body');
  tableBody.innerHTML = '';

  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.wallet_address}</td>
      <td>${row.activity_type}</td>
      <td>${row.amount}</td>
      <td>${new Date(row.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(tr);
  });
}
