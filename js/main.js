document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Jika pengguna sudah login
        navbar.innerHTML = `
            <ul class="nav-links">
                <li><span class="welcome-user">Halo, ${loggedInUser.fullname}!</span></li>
                <li><a href="histori.html" class="nav-link">Histori</a></li>
                <li><a href="#" id="logout-btn" class="btn-nav-outline">Logout</a></li>
            </ul>
        `;

        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('loggedInUser'); // Hapus sesi
            window.location.href = 'index.html'; // Kembali ke home
        });

    } else {
        // Jika pengguna belum login
        navbar.innerHTML = `
            <ul class="nav-links">
                <li><a href="login.html" class="nav-link">Login</a></li>
                <li><a href="signup.html" class="btn-nav">Sign Up</a></li>
            </ul>
        `;
    }
});
