document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SLIDER FUNCTIONALITY ---
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;

    function showSlide(index) {
        if (sliderItems.length === 0) return;
        
        // Normalisasi index
        if (index >= sliderItems.length) index = 0;
        if (index < 0) index = sliderItems.length - 1;
        currentIndex = index;

        // Sembunyikan semua item dan non-aktifkan dot
        sliderItems.forEach((item, i) => {
            item.classList.remove('active');
            sliderDots[i].classList.remove('active');
        });

        // Tampilkan item yang aktif dan aktifkan dot
        if (sliderItems[currentIndex]) {
            sliderItems[currentIndex].classList.add('active');
        }
        if (sliderDots[currentIndex]) {
            sliderDots[currentIndex].classList.add('active');
        }
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        nextArrow.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide
    if (sliderItems.length > 1) {
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Ganti setiap 5 detik
    }

    if (sliderItems.length > 0) {
        showSlide(currentIndex); // Tampilkan slide pertama saat dimuat
    }

    // --- 2. MENU HAMBURGER & SIDEBAR FUNCTIONALITY ---
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-toggle-btn');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            // Mengganti ikon antara garis 3 (fa-bars) dan X (fa-times)
            if (sidebar.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        
        // Menutup sidebar ketika link di-klik
        const sidebarLinks = document.querySelectorAll('#sidebar a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                 sidebar.classList.remove('active');
                 menuIcon.classList.remove('fa-times');
                 menuIcon.classList.add('fa-bars');
            });
        });
    }

    // --- 3. FILTER PRODUK BERDASARKAN KATEGORI (DARI SIDEBAR) ---
    const sidebarCategoryLinks = document.querySelectorAll('.category-link');
    sidebarCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            filterProductsByCategory(category);
             // Tutup sidebar setelah memilih kategori
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
            // Kosongkan input pencarian saat kategori diubah
            document.getElementById('search-input').value = ''; 
        });
    });
    
    function filterProductsByCategory(category) {
        const productCards = document.querySelectorAll('.product-grid .product-card');
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'Semua' || cardCategory === category) {
                 // Tampilkan semua jika kategori yang dipilih adalah 'Semua' 
                 // (meski menu 'Semua' tidak ada, ini antisipasi)
                 // atau kategori cocok
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        // Scroll ke bagian produk
        document.querySelector('.product-grid-section').scrollIntoView({ behavior: 'smooth' });
    }
});


// --- 4. GLOBAL SEARCH PRODUCT FUNCTIONALITY (Dipanggil oleh onkeyup di HTML) ---
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return; 
    
    const filter = searchInput.value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-grid .product-card');

    productCards.forEach(card => {
        // Ambil data nama, kategori, dan region
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        const region = card.getAttribute('data-region').toLowerCase();

        // Cari berdasarkan nama produk, kategori, atau region
        if (name.includes(filter) || category.includes(filter) || region.includes(filter)) {
            card.style.display = 'flex'; // Tampilkan
        } else {
            card.style.display = 'none'; // Sembunyikan
        }
    });
}


// --- 5. TAMBAH TESTIMONI FUNCTIONALITY (Dipanggil oleh onclick di HTML) ---
function addTestimonial() {
    // 1. Input Produk
    const product = prompt("Masukkan nama produk (misalnya: MLBB Diamond, Joki Rank ML):");
    if (!product || product.trim() === "") return;

    // 2. Input Nama
    const author = prompt("Masukkan nama Anda:").substring(0, 20); 
    if (!author || author.trim() === "") return;

    // 3. Input Rating
    const rating = prompt("Beri nilai (1-5):");
    let numRating = parseInt(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        alert("Peringatan: Rating harus berupa angka antara 1 sampai 5. Testimoni dibatalkan.");
        return;
    }

    // 4. Input Teks Testimoni
    const text = prompt("Masukkan teks testimoni Anda (maks 100 karakter):").substring(0, 100);
    if (!text || text.trim() === "") return;
    
    // Buat HTML untuk bintang rating
    let ratingHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < numRating) {
            ratingHtml += '<i class="fas fa-star"></i>'; // Bintang penuh
        } else {
            ratingHtml += '<i class="far fa-star"></i>'; // Bintang kosong
        }
    }

    // Generate tanggal: 23 Nov 25
    const now = new Date();
    const dateStr = now.getDate().toString().padStart(2, '0') + ' ' + 
                    now.toLocaleString('id', { month: 'short' }) + ' ' + 
                    (now.getFullYear() % 100).toString().padStart(2, '0');

    // Buat elemen card baru
    const newCardHtml = `
        <div class="testimonial-card" data-rating="${numRating}">
            <div class="rating">
                ${ratingHtml}
            </div>
            <p class="testimonial-product">${product}</p>
            <p class="testimonial-text">"${text}"</p>
            <div class="testimonial-meta">
                <span class="author">${author}</span>
                <span class="date">${dateStr}</span>
            </div>
        </div>
    `;

    // Tambahkan card baru ke container (di posisi paling atas/afterbegin)
    const container = document.getElementById('testimonial-container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', newCardHtml); 
        alert("Terima kasih! Testimoni Anda berhasil ditambahkan.");
    }
}
