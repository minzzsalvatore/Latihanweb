document.addEventListener('DOMContentLoaded', () => {
    // ====================================
    // 1. Sidebar Toggle & Login Status
    // ====================================
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuIcon = document.getElementById('menu-icon');
    const authLink = document.getElementById('auth-link');
    const loggedInMenu = document.getElementById('logged-in-menu');

    // Cek status login (simulasi)
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let userName = localStorage.getItem('userName') || 'User Minzz';

    function updateLoginStatus() {
        if (isLoggedIn) {
            authLink.style.display = 'none';
            loggedInMenu.style.display = 'block';
            // Ubah ikon menu menjadi silang saat sidebar aktif
            menuToggleBtn.onclick = () => {
                sidebar.classList.toggle('active');
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            };
        } else {
            authLink.style.display = 'flex';
            loggedInMenu.style.display = 'none';
            // Tetapkan fungsi agar membuka modal jika belum login
            authLink.onclick = () => toggleLoginModal(true);
            menuToggleBtn.onclick = () => {
                sidebar.classList.toggle('active');
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            };
        }
        
        // Tutup sidebar jika status diubah
        sidebar.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }

    updateLoginStatus();

    // Fungsi Logout
    window.logout = function() {
        isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        alert('Anda telah Logout.');
        updateLoginStatus();
    }


    // ====================================
    // 2. Login/Register Modal
    // ====================================
    const loginModal = document.getElementById('login-modal');
    const modalTitle = document.getElementById('modal-title');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    window.toggleLoginModal = function(show) {
        loginModal.style.display = show ? 'block' : 'none';
    }

    window.switchModal = function(mode) {
        if (mode === 'register') {
            modalTitle.textContent = 'Daftar Akun Baru';
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        } else {
            modalTitle.textContent = 'Login ke Akun Anda';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    }

    // Simulasi proses Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputUsername = document.getElementById('login-username').value;
        // Simulasi berhasil login
        isLoggedIn = true;
        userName = inputUsername.split('@')[0] || 'User Minzz';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', userName);
        
        toggleLoginModal(false);
        updateLoginStatus();
        alert(`Selamat datang, ${userName}! Login Berhasil.`);
    });

    // Simulasi proses Register
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulasi berhasil daftar, lalu otomatis login
        const regName = document.getElementById('reg-name').value;
        isLoggedIn = true;
        userName = regName.split(' ')[0] || 'User Baru';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', userName);
        
        toggleLoginModal(false);
        updateLoginStatus();
        alert(`Akun berhasil dibuat. Selamat datang, ${userName}!`);
    });

    // ====================================
    // 3. Slider Fungsionalitas
    // ====================================
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;

    function updateSlider() {
        const itemWidth = sliderItems[0].clientWidth;
        sliderWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            sliderItems[index].classList.toggle('active', index === currentIndex);
        });
    }

    // Pastikan slider responsif saat window resize
    window.addEventListener('resize', updateSlider);

    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
        updateSlider();
    });

    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    updateSlider(); // Initial call

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000); 

    // ====================================
    // 4. Testimonial Form & Rating
    // ====================================
    const testimonialModal = document.getElementById('testimonial-modal');
    const testimonialForm = document.getElementById('new-testimonial-form');
    const testiNameInput = document.getElementById('testi-name');
    const testimonialContainer = document.getElementById('testimonial-container');
    const starInputs = document.querySelectorAll('.testi-star');
    const ratingInputHidden = document.getElementById('testi-rating');

    window.openTestimonialForm = function() {
        if (!isLoggedIn) {
            alert('Anda harus Login terlebih dahulu untuk menambahkan testimoni.');
            toggleLoginModal(true);
            return;
        }
        testiNameInput.value = userName;
        testimonialModal.style.display = 'block';
    }

    window.closeTestimonialForm = function() {
        testimonialModal.style.display = 'none';
        testimonialForm.reset();
    }

    // Fungsionalitas Rating Bintang
    starInputs.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInputHidden.value = value;
            starInputs.forEach((s, i) => {
                s.classList.toggle('active', i < value);
                s.querySelector('i').className = (i < value) ? 'fas fa-star' : 'far fa-star';
            });
        });
    });

    // Simulasi Submit Testimonial
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newTestimonial = document.createElement('div');
        newTestimonial.classList.add('testimonial-card');
        
        const rating = parseInt(ratingInputHidden.value);
        const starsHtml = Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star" style="color: ${i < rating ? '#ffcc00' : '#ccc'}"></i>`
        ).join('');

        const currentDate = new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: '2-digit'});

        newTestimonial.innerHTML = `
            <div class="rating">${starsHtml}</div>
            <p class="testimonial-product">${document.getElementById('testi-product').value}</p>
            <p class="testimonial-text">"${document.getElementById('testi-review').value}"</p>
            <div class="testimonial-meta">
                <span class="author">${testiNameInput.value}</span>
                <span class="date">${currentDate}</span>
            </div>
        `;
        
        // Tambahkan di awal container
        testimonialContainer.prepend(newTestimonial);
        closeTestimonialForm();
        alert('Testimoni berhasil ditambahkan! Terima kasih.');
    });

    // ====================================
    // 5. Fungsi Pencarian (Filter) Produk
    // ====================================
    window.filterProducts = function() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const altText = card.querySelector('img').alt.toLowerCase();
            if (altText.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
