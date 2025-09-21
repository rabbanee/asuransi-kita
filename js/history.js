document.addEventListener('DOMContentLoaded', () => {
    // 1. Cek sesi login
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Ambil data histori dari localStorage
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    const historyListBody = document.getElementById('history-list-body');
    const noHistoryMessage = document.getElementById('no-history-message');
    const historyTable = document.querySelector('.history-table');

    // 3. Cek apakah ada data histori
    if (purchaseHistory.length > 0) {
        // Jika ada, sembunyikan pesan kosong dan tampilkan tabel
        historyTable.style.display = 'table';
        noHistoryMessage.style.display = 'none';

        // 4. Loop melalui data dan buat baris tabel untuk setiap item
        purchaseHistory.forEach(purchase => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${purchase.productName}</td>
                <td>${purchase.type}</td>
                <td>${purchase.purchaseDate}</td>
                <td>Rp ${purchase.price.toLocaleString('id-ID')}</td>
                <td><span class="status-badge status-lunas">${purchase.status}</span></td>
            `;

            historyListBody.appendChild(row);
        });

    } else {
        // Jika tidak ada histori, sembunyikan tabel dan tampilkan pesan
        historyTable.style.display = 'none';
        noHistoryMessage.style.display = 'flex';
    }
});
