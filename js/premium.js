document.addEventListener('DOMContentLoaded', () => {
    // Fungsi pengecekan login (berlaku untuk semua halaman pembelian)
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        window.location.href = 'login.html';
        return;
    }

    // =================================================================
    // HELPER FUNCTIONS (Fungsi Bantuan)
    // =================================================================

    function displayError(form, message) {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.innerHTML = `<div class="message error">${message}</div>`;
        }
        if (form && typeof form.reportValidity === 'function') {
            form.reportValidity();
        }
    }

    function setCheckoutData(productName, premium) {
        const checkoutData = { productName, premium };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    }

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // =================================================================
    // LOGIKA PERHITUNGAN PREMI
    // =================================================================

    // --- LOGIKA UNTUK ASURANSI MOBIL ---
    const carPurchaseForm = document.getElementById('car-purchase-form');
    if (carPurchaseForm) {
        document.getElementById('calculate-btn').addEventListener('click', () => {
            const premiumResultContainer = document.getElementById('premium-result');
            const messageContainer = document.getElementById('message-container');

            if (!carPurchaseForm.checkValidity()) {
                displayError(carPurchaseForm, 'Harap isi semua kolom yang wajib diisi.');
                return;
            }
            // FIX: Hapus pesan error jika form sudah valid
            if(messageContainer) messageContainer.innerHTML = '';

            const carPrice = parseFloat(document.getElementById('car-price').value);
            const carYear = parseInt(document.getElementById('car-year').value);
            const carAge = new Date().getFullYear() - carYear;
            let premium = 0;

            if (carAge >= 0 && carAge <= 3) premium = 0.025 * carPrice;
            else if (carAge > 3 && carAge <= 5) premium = (carPrice < 200000000) ? 0.04 * carPrice : 0.03 * carPrice;
            else if (carAge > 5) premium = 0.05 * carPrice;

            if (premium > 0) {
                premiumResultContainer.innerHTML = `
                    <h3>Premi Tahunan Anda</h3>
                    <p class="premium-price">Rp ${premium.toLocaleString('id-ID')}</p>
                    <a href="checkout.html" class="btn btn-checkout">Lanjutkan ke Checkout</a>`;
                setCheckoutData('Asuransi Mobil', premium);
            } else {
                premiumResultContainer.innerHTML = `<p class="message error">Gagal menghitung premi. Periksa tahun pembuatan mobil.</p>`;
            }
        });
    }

    // --- LOGIKA UNTUK ASURANSI KESEHATAN ---
    const healthPurchaseForm = document.getElementById('health-purchase-form');
    if (healthPurchaseForm) {
        document.getElementById('calculate-health-btn').addEventListener('click', () => {
            const premiumResultContainer = document.getElementById('premium-result');
            const messageContainer = document.getElementById('message-container');

            if (!healthPurchaseForm.checkValidity()) {
                displayError(healthPurchaseForm, 'Harap isi semua kolom yang wajib diisi.');
                return;
            }
            // FIX: Hapus pesan error jika form sudah valid
            if(messageContainer) messageContainer.innerHTML = '';

            const dob = new Date(document.getElementById('dob').value);
            const age = calculateAge(dob);

            const k1 = parseInt(document.getElementById('smoker').value);
            const k2 = parseInt(document.getElementById('hypertension').value);
            const k3 = parseInt(document.getElementById('diabetes').value);

            let m = 0;
            if (age <= 20) m = 0.1;
            else if (age > 20 && age <= 35) m = 0.2;
            else if (age > 35 && age <= 50) m = 0.25;
            else if (age > 50) m = 0.4;

            const P = 2000000;
            const premium = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);

            premiumResultContainer.innerHTML = `
                <h3>Premi Tahunan Anda</h3>
                <p class="premium-price">Rp ${premium.toLocaleString('id-ID')}</p>
                <a href="checkout.html" class="btn btn-checkout">Lanjutkan ke Checkout</a>`;
            setCheckoutData('Asuransi Kesehatan', premium);
        });
    }

    // --- LOGIKA UNTUK ASURANSI JIWA ---
    const lifePurchaseForm = document.getElementById('life-purchase-form');
    if (lifePurchaseForm) {
        document.getElementById('calculate-life-btn').addEventListener('click', () => {
            const premiumResultContainer = document.getElementById('premium-result');
            const messageContainer = document.getElementById('message-container');

            if (!lifePurchaseForm.checkValidity()) {
                displayError(lifePurchaseForm, 'Harap isi semua kolom yang wajib diisi.');
                return;
            }
            // FIX: Hapus pesan error jika form sudah valid
            if(messageContainer) messageContainer.innerHTML = '';

            const dob = new Date(document.getElementById('dob').value);
            const age = calculateAge(dob);
            const t = parseFloat(document.getElementById('coverage-amount').value);

            let m = 0;
            if (age <= 30) m = 0.002;
            else if (age > 30 && age <= 50) m = 0.004;
            else if (age > 50) m = 0.01;

            const premium = m * t;

            premiumResultContainer.innerHTML = `
                <h3>Premi Bulanan Anda</h3>
                <p class="premium-price">Rp ${premium.toLocaleString('id-ID')}</p>
                <a href="checkout.html" class="btn btn-checkout">Lanjutkan ke Checkout</a>`;
            setCheckoutData('Asuransi Jiwa', premium);
        });
    }
});
