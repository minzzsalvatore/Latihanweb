document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SLIDER FUNCTIONALITY ---
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;

    function showSlide(index) {
        // Normalisasi index
        if (index >= sliderItems.length) index = 0;
        if (index < 0) index = sliderItems.length - 1;
        currentIndex = index;

        sliderItems.forEach((item, i) => {
            item.classList.remove('active');
            sliderDots[i].classList.remove('active');
        });
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
            // Mengganti ikon
            if (sidebar.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // --- 3. FILTER KATEGORI FUNCTIONALITY ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productGrids = document.querySelectorAll('.product-grid-category');

    function showCategory(categoryName) {
        // Hapus active dari semua tombol dan grid
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        productGrids.forEach(grid => {
             // Pastikan semua produk tampil sebelum menyembunyikan/menampilkan grid
             grid.querySelectorAll('.product-card-category').forEach(card => card.style.display = 'inline-block');
             grid.classList.remove('active');
        });

        // Tambahkan active ke tombol dan grid yang sesuai
        const activeBtn = document.querySelector(`.category-btn[data-category="${categoryName}"]`);
        const activeGrid = document.getElementById(categoryName);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeGrid) activeGrid.classList.add('active');
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            showCategory(category);
            // Kosongkan input pencarian saat kategori diubah
            document.getElementById('search-input').value = ''; 
            // Pastikan semua produk di kategori ini terlihat jika sebelumnya disembunyikan oleh filter
            document.querySelectorAll('.product-card-category').forEach(card => card.style.display = 'inline-block');
        });
    });

    // Sidebar Category Links (juga memfilter kategori)
    const sidebarCategoryLinks = document.querySelectorAll('.category-link');
    sidebarCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            showCategory(category);
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

    // Tampilkan kategori pertama saat dimuat
    showCategory('Game Top Up');
});


// --- 4. GLOBAL SEARCH PRODUCT FUNCTIONALITY ---
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return; 
    
    const filter = searchInput.value.toLowerCase().trim();
    
    // Cari di *semua* produk (di semua kategori)
    const allCategoryProducts = document.querySelectorAll('.product-card-category');
    const productGrids = document.querySelectorAll('.product-grid-category');

    if (filter.length > 0) {
        // 1. Tampilkan semua grid kategori 
        productGrids.forEach(grid => grid.classList.add('active'));
        
        // 2. Nonaktifkan semua tombol kategori
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

        // 3. Filter produk
        allCategoryProducts.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            if (name.includes(filter)) {
                card.style.display = 'inline-block'; 
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        // Jika filter kosong, kembalikan ke tampilan default: Game Top Up
        
        // 1. Reset tombol kategori
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('.category-btn[data-category="Game Top Up"]');
        if (defaultBtn) defaultBtn.classList.add('active');
        
        // 2. Reset grid produk
        productGrids.forEach(grid => {
            // Tampilkan kembali semua produk di grid
            grid.querySelectorAll('.product-card-category').forEach(card => card.style.display = 'inline-block');
            
            // Atur kembali grid yang aktif
            if (grid.id === 'Game Top Up') {
                 grid.classList.add('active');
            } else {
                 grid.classList.remove('active');
            }
        });
    }
}


// --- 5. TAMBAH TESTIMONI FUNCTIONALITY ---
function addTestimonial() {
    // Menggunakan window.prompt untuk input cepat
    const product = prompt("Masukkan nama produk (misalnya: Mobile Legends Diamond, Joki Rank ML):");
    if (!product) return;

    const author = prompt("Masukkan nama Anda (maks 20 karakter):").substring(0, 20); 
    if (!author) return;

    const rating = prompt("Beri nilai (1-5):");
    let numRating = parseInt(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        alert("Peringatan: Rating harus berupa angka antara 1 sampai 5. Testimoni dibatalkan.");
        return;
    }

    const text = prompt("Masukkan teks testimoni Anda (maks 100 karakter):").substring(0, 100);
    if (!text) return;
    
    // Buat HTML untuk bintang rating
    let ratingHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < numRating) {
            ratingHtml += '<i class="fas fa-star"></i>'; // Bintang penuh
        } else {
            ratingHtml += '<i class="far fa-star"></i>'; // Bintang kosong
        }
    }

    // Generate ID & Date
    const randomId = 'TRX' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = new Date();
    // Format tanggal: 22 Nov 25
    const dateStr = now.getDate().toString().padStart(2, '0') + ' ' + 
                    now.toLocaleString('id', { month: 'short' }) + ' ' + 
                    (now.getFullYear() % 100).toString().padStart(2, '0');

    // Buat elemen card baru
    const newCardHtml = `
        <div class="testimonial-card">
            <div class="rating">
                ${ratingHtml}
            </div>
            <p class="testimonial-product">${product}</p>
            <p class="testimonial-text">"${text}"</p>
            <div class="testimonial-meta">
                <span class="author">${author}</span>
                <span class="id">ID: ${randomId}</span>
                <span class="date">Date: ${dateStr}</span>
            </div>
        </div>
    `;

    // Tambahkan card baru ke container (di posisi paling atas)
    const container = document.getElementById('testimonial-container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', newCardHtml); 
        alert("Terima kasih! Testimoni Anda berhasil ditambahkan.");
    }
}
