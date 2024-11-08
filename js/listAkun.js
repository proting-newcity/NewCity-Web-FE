document.addEventListener('DOMContentLoaded', function () {
  // 1. Navigasi ke halaman "Tambah Akun"
  const tambahBeritaButton = document.querySelector('.btn.btn-success.d-flex.align-items-center');
  tambahBeritaButton.addEventListener('click', function () {
    window.location.href = 'BuatAkun.html';
  });

  // 2. Fungsi pencarian di tabel
  const searchInput = document.querySelector('.form-control[type="search"]');
  searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(searchText) ? '' : 'none';
    });
  });

  // 3. Variabel navigasi halaman tabel
  let currentPage = 1;
  const itemsPerPage = 10;
  let akunData = [];

  document.getElementById("buttonnext").addEventListener("click", function () {
    if (currentPage < totalPages()) {
      currentPage++;
      renderCurrentPage();
    }
  });

  document.getElementById("buttonprev").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
    }
  });

  function totalPages() {
    return Math.ceil(akunData.length / itemsPerPage) || 1;
  }

  function updatePageNumber() {
    document.getElementById("page-number").innerText = `${currentPage} dari ${totalPages()}`;
  }

  // 4. Fungsi untuk memuat data akun
  const tableBody = document.querySelector('tbody');

  function loadAkun() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../js/akun.json", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const akun = JSON.parse(xhr.responseText).akun;

        // Ambil daftar indeks yang dihapus dari localStorage
        const deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];

        // Filter akun untuk menghapus yang ada di deletedIndexes
        akunData = akun.filter((_item, index) => !deletedIndexes.includes(index));

        renderCurrentPage();
      }
    };
    xhr.send();
  }

  function renderCurrentPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPageAkun = akunData.slice(start, end);

    renderTable(currentPageAkun);
    updatePageNumber();
  }

  function renderTable(akun) {
    tableBody.innerHTML = akun.map((item, index) => `
      <tr data-index="${index + (currentPage - 1) * itemsPerPage}">
        <td style="display: flex; align-items: center; padding-left: 20px;">
          <img src="${item.profileImage}" alt="Profile" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 10px;">
          <div>
            <div>${item.username}</div>
            <small class="text-muted">${item.nama}</small>
          </div>
        </td>
        <td>${item.nip}</td>
        <td>${item.cakupan}</td>
        <td>${item.status}</td>
        <td>
          <i class="far fa-trash-alt" style="font-size: 20px; cursor: pointer; color: #588157;" data-index="${index + (currentPage - 1) * itemsPerPage}"></i>
          <i class="fa-solid fa-pen" style="font-size: 20px; cursor: pointer; margin-left: 13px; color: #588157;"></i>
        </td>
      </tr>
    `).join('');
  }

  // Event listener untuk delete dan edit
  tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash-alt')) {
      const index = parseInt(event.target.getAttribute('data-index'), 10);

      // Ambil daftar indeks yang dihapus dari localStorage, lalu tambahkan indeks baru
      const deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];
      deletedIndexes.push(index);
      localStorage.setItem('deletedIndexes', JSON.stringify(deletedIndexes));

      // Hapus data dari akunData dan tampilkan ulang halaman
      akunData = akunData.filter((_item, i) => i !== index);
      if (currentPage > totalPages()) {
        currentPage = totalPages();
      }
      renderCurrentPage();
    } else if (event.target.classList.contains('fa-pen')) {
      window.location.href = 'editAkun.html';
    }
  });

  // Muat data akun ketika halaman dimuat
  loadAkun();
});

function deleteAkun(index) {
  $.ajax({
    url: 'js/listAkun.json',
    type: 'DELETE',
    data: JSON.stringify({ index: index }), // Contoh: Menghapus elemen pada indeks ke-1
    contentType: 'application/json',
    success: function (response) {
      console.log(response.status); // Output: "Data deleted successfully"
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
}