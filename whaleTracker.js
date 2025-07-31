// whaleTracker.js
const WHALE_API = 'https://api.whale-alert.io/v1/transactions';
const API_KEY = 'YOUR_API_KEY'; // Ganti dengan API key asli

export async function fetchWhaleData() {
  const now = Math.floor(Date.now() / 1000); // Waktu saat ini (UNIX timestamp)
  const url = `${WHALE_API}?api_key=${API_KEY}&min_value=1000000&start=${now - 3600}`; // 1 jam terakhir

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderWhaleTable(data.transactions);
    renderFlowChart(data.transactions);
  } catch (e) {
    console.error('Whale API error:', e);
    document.getElementById('whale-table').innerHTML = `<p style="color:red">Gagal memuat data Whale Alert</p>`;
  }
}

function renderWhaleTable(transactions) {
  const container = document.getElementById('whale-table');
  if (!transactions || transactions.length === 0) {
    container.innerHTML = `<p>Tidak ada transaksi whale dalam 1 jam terakhir.</p>`;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr><th>Tx</th><th>Asset</th><th>From</th><th>To</th><th>Amount</th><th>Time</th></tr>
      </thead>
      <tbody>
        ${transactions.map(tx => `
          <tr>
            <td><a href="${tx.transaction_link}" target="_blank">🔗</a></td>
            <td>${tx.symbol}</td>
            <td>${tx.from.owner_type}</td>
            <td>${tx.to.owner_type}</td>
            <td>$${tx.amount_usd.toLocaleString()}</td>
            <td>${new Date(tx.timestamp * 1000).toLocaleTimeString()}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  `;
}

function renderFlowChart(transactions) {
  const exchangeIn = transactions.filter(tx => tx.to.owner_type === 'exchange').length;
  const exchangeOut = transactions.filter(tx => tx.from.owner_type === 'exchange').length;

  const ctx = document.getElementById('exchangeFlowChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Inflow to Exchange', 'Outflow from Exchange'],
      datasets: [{
        label: 'Jumlah Transaksi Whale',
        data: [exchangeIn, exchangeOut],
        backgroundColor: ['green', 'red']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
