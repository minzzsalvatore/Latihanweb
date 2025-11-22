// --- 1. SLIDER FUNCTIONALITY ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;

    function showSlide(index) {
        sliderItems.forEach((item, i) => {
            item.classList.remove('active');
            sliderDots[i].classList.remove('active');
        });
        if (sliderItems[index]) {
            sliderItems[index].classList.add('active');
        }
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
            showSlide(currentIndex);
        });

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Auto slide
    if (sliderItems.length > 1) {
        setInterval(() => {
            currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
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
             // Pastikan semua produk tampil sebelum menampilkan grid kategori
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
        });
    });

    // Tampilkan kategori pertama saat dimuat
    showCategory('Game Top Up');
});


// --- 4. GLOBAL SEARCH PRODUCT FUNCTIONALITY ---
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    // Jika searchInput tidak ada, hentikan fungsi
    if (!searchInput) return; 
    
    const filter = searchInput.value.toLowerCase();
    
    // Cari di *semua* produk di semua kategori grid
    const allCategoryProducts = document.querySelectorAll('.product-card-category');

    allCategoryProducts.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        
        // Atur display berdasarkan hasil filter
        if (name.includes(filter)) {
            // Tampilkan card dengan lebar default (agar berfungsi di flex/scroll)
            card.style.display = 'inline-block'; 
            card.style.width = null; 
        } else {
            card.style.display = 'none';
        }
    });

    // Saat search dilakukan, kita pastikan semua grid kategori terlihat 
    // agar pencarian mencakup semua produk, terlepas dari kategori yang aktif.
    const productGrids = document.querySelectorAll('.product-grid-category');
    productGrids.forEach(grid => {
        // Jika sedang memfilter (filter tidak kosong), pastikan semua grid terlihat
        if (filter.length > 0) {
            grid.classList.add('active');
            // Hapus class 'active' dari tombol kategori
            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            // Jika filter kosong, kembalikan ke kategori aktif default (Top Up Game)
            const defaultCategory = document.getElementById('Game Top Up');
            if (grid === defaultCategory) {
                 grid.classList.add('active');
            } else {
                 grid.classList.remove('active');
            }
            // Aktifkan kembali tombol kategori pertama
            document.querySelector('.category-btn[data-category="Game Top Up"]').classList.add('active');
        }
    });
}


// --- 5. TAMBAH TESTIMONI FUNCTIONALITY ---
function addTestimonial() {
    const product = prompt("Masukkan nama produk (misalnya: Mobile Legends Diamond, Joki Rank ML):");
    if (!product) return;

    const author = prompt("Masukkan nama Anda (misalnya: Budi S.) :").substring(0, 20); // Batasi nama 20 karakter
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

    // Tambahkan card baru ke container (di bagian atas)
    const container = document.getElementById('testimonial-container');
    if (container) {
         // Masukkan testimoni baru sebelum yang lama
        container.insertAdjacentHTML('afterbegin', newCardHtml); 
    }
}
