document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form submit default

            // Ambil semua nilai dari form
            const fullname = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const messageContainer = document.getElementById('message-container');

            // Hapus pesan sebelumnya
            messageContainer.innerHTML = '';

            // --- Validasi Input ---
            if (!fullname || !phone || !email || !password || !confirmPassword) {
                displayMessage('Semua kolom harus diisi.', 'error');
                return;
            }
            if (!/^[a-zA-Z\s]{3,32}$/.test(fullname)) {
                displayMessage('Nama lengkap hanya boleh berisi huruf (3-32 karakter).', 'error');
                return;
            }
            if (!/^08[0-9]{8,14}$/.test(phone)) {
                 displayMessage('Format nomor handphone salah (contoh: 081234567890).', 'error');
                 return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                displayMessage('Format email tidak valid.', 'error');
                return;
            }
            if (password.length < 8) {
                displayMessage('Kata sandi minimal 8 karakter.', 'error');
                return;
            }
            if (password !== confirmPassword) {
                displayMessage('Kata sandi dan konfirmasi tidak sesuai.', 'error');
                return;
            }

            // --- Simulasi Penyimpanan Data ---
            // Cek apakah email sudah terdaftar
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                displayMessage('Email sudah terdaftar.', 'error');
                return;
            }

            // Simpan pengguna baru
            const newUser = { fullname, phone, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            displayMessage('Sign up berhasil! Anda akan diarahkan ke halaman login.', 'success');

            // Arahkan ke halaman login setelah 2 detik
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // Fungsi untuk menampilkan pesan
    function displayMessage(message, type) {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
    }


    // Tambahkan kode untuk Login
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const messageContainer = document.getElementById('message-container');

            messageContainer.innerHTML = '';

            if (!email || !password) {
                displayMessage('Email dan kata sandi harus diisi.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Simpan status login di session storage
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                displayMessage('Login berhasil! Mengarahkan ke halaman utama...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                displayMessage('Email atau kata sandi salah.', 'error');
            }
        });
    }

});
