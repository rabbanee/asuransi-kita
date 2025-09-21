document.addEventListener('DOMContentLoaded', () => {
    // 1. Cek sesi login
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Ambil data dari sessionStorage
    const checkoutDataString = sessionStorage.getItem('checkoutData');
    if (!checkoutDataString) {
        alert('Tidak ada data pembelian. Anda akan diarahkan ke halaman utama.');
        window.location.href = 'index.html';
        return;
    }

    const checkoutData = JSON.parse(checkoutDataString);

    // 3. Tampilkan data di halaman
    const productNameEl = document.getElementById('product-name');
    const premiumAmountEl = document.getElementById('premium-amount');

    productNameEl.textContent = checkoutData.productName;
    premiumAmountEl.textContent = `Rp ${checkoutData.premium.toLocaleString('id-ID')}`;

    // 4. Logika Tombol Bayar
    const payBtn = document.getElementById('pay-btn');
    payBtn.addEventListener('click', () => {
        alert('Pembayaran berhasil! Terima kasih telah membeli produk kami.');

        const newPurchase = {
            productName: checkoutData.productName,
            type: checkoutData.productName,
            purchaseDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            price: checkoutData.premium,
            status: 'Lunas'
        };

        const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        purchaseHistory.push(newPurchase);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        sessionStorage.removeItem('checkoutData');
        window.location.href = 'histori.html';
    });
});
