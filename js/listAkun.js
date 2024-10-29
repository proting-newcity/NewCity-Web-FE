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
      if (rowText.includes(searchText)) {
        row.style.display = ''; // tampilkan baris
      } else {
        row.style.display = 'none'; // sembunyikan baris
      }
    });
  });

  // 3. Navigasi halaman tabel
  let currentPage = 1;
  const totalPages = 10;

  document.getElementById("buttonnext").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      updatePageNumber();
    }
  });

  document.getElementById("buttonprev").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePageNumber();
    }
  });

  function updatePageNumber() {
    document.getElementById("page-number").innerText = '${currentPage} dari ${totalPages}';
  }

  // 4. Delete and Edit actions for each account row
  const tableBody = document.querySelector('tbody');
  function loadAkun() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../js/listAkun.json", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const akun = JSON.parse(xhr.responseText).akun;

        // Ambil daftar indeks yang dihapus dari localStorage
        const deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];

        // Filter akun untuk menghapus yang ada di deletedIndexes
        const visibleAkun = akun.filter((item, index) => !deletedIndexes.includes(index));

        // Render data yang tidak dihapus ke tabel
        renderTable(visibleAkun);
      }
    };
    xhr.send();
  }

  function renderTable(akun) {
    let html = '';
    akun.forEach((item, index) => {
      html += `
            <tr>
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
                    <i class="far fa-trash-alt" style="font-size: 20px; cursor: pointer; color: #588157;" data-index="${index}"></i>
                    <i class="fa-solid fa-pen" style="font-size: 20px; cursor: pointer; margin-left: 13px; color: #588157;"></i>
                </td>
            </tr>`;
    });
    tableBody.innerHTML = html;
  }

  tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash-alt')) {
      const index = parseInt(event.target.getAttribute('data-index'), 10);

      // Ambil daftar indeks yang dihapus dari localStorage, lalu tambahkan indeks baru
      const deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];
      deletedIndexes.push(index);
      localStorage.setItem('deletedIndexes', JSON.stringify(deletedIndexes));

      // Muat ulang data untuk memperbarui tampilan
      loadAkun();
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