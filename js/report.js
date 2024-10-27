// Fungsi untuk memuat data dari JSON
async function loadData() {
    try {
        index = 0;
        const response = await fetch('js/report.json'); // Path ke file JSON
        const data = await response.json();

        // Ambil template card dari HTML
        const cardTemplate = document.querySelector('.card-template');
        const cardContainer = document.getElementById('card-container');

        // Iterasi setiap objek dalam array laporan
        data.report.forEach(item => {
            // Clone template card
            const cardClone = cardTemplate.cloneNode(true);
            cardClone.style.display = "block"; // Tampilkan card
            cardClone.classList.remove('card-template'); // Hapus class template
            // Masukkan data JSON ke dalam elemen card
            cardClone.querySelector('.card-title').textContent = item.title;
            cardClone.querySelector('.card-description').textContent = item.description;
            cardClone.querySelector('.card-date').textContent = item.date;
            // Set data-index attribute to access in loadColumn2Manually
            cardClone.setAttribute('data-index', index);
            index++;

            // Add click event to load specific data into column-2
            cardClone.addEventListener('click', (event) => {
                const index = event.currentTarget.getAttribute('data-index');
                loadColumn2Manually(index);
            });//YEAH 2 JAM CUMAN BUAT EVENT LISTENER INI DOANG PLS GOKIL YEAH
            // Tambahkan card yang telah diisi ke container
            cardContainer.appendChild(cardClone);
        });
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

// Panggil fungsi loadData ketika halaman selesai dimuat
window.onload = loadData;

async function loadColumn2Manually(index) {
    try {
        const response = await fetch('js/report.json');
        const data = await response.json();
        const item = data.report[index];
        // Update column-2 content
        document.getElementById('col2-title').textContent = item.title;
        document.getElementById('col2-description').textContent = item.description;
        document.getElementById('col2-category').textContent = item.category;
        document.getElementById('col2-location').textContent = item.location;
        document.getElementById('col2-date').textContent = item.date;
        document.getElementById('col2-img').src = item.image;
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}