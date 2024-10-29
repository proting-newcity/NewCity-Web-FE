$(document).ready(function () {
  let akunData = []; // Holds all accounts data globally
  let currentPage = 1;
  const rowsPerPage = 5;

  // Load data from listAkun.json
  function loadData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "listAkun.json", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  try {
                      const data = JSON.parse(xhr.responseText);
                      akunData = data.Akun || []; // Store globally for pagination and search
                      renderTable(); // Render the table after data load
                      updatePageInfo(akunData.length); // Update page info
                  } catch (error) {
                      console.error("Error parsing JSON:", error);
                      alert("Failed to load data from listAkun.json");
                  }
              } else {
                  console.error("Request Failed:", xhr.status, xhr.statusText);
                  alert("Gagal memuat data dari listAkun.json");
              }
          }
      };

      xhr.send();
  }

  // Render table with pagination
  function renderTable(data = akunData) {
      const tableBody = $("#tableBody");
      tableBody.empty(); // Clear existing rows

      const start = (currentPage - 1) * rowsPerPage;
      const paginatedData = data.slice(start, start + rowsPerPage); // Paginate

      paginatedData.forEach(akun => {
          const row = `<tr>
              <td>${akun.username}</td>
              <td>${akun.password}</td>
              <td>${akun.role}</td>
          </tr>`;
          tableBody.append(row);
      });
  }); 

  // 3. Navigasi halaman tabel
  let currentPage = 1;
  const totalPages = 10;
  
  document.getElementById("buttonnext").addEventListener("click", function() {
    if (currentPage < totalPages) {
      currentPage++;
      updatePageNumber();
    }
  });
  
  document.getElementById("buttonprev").addEventListener("click", function() {
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
  function loadBerita() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../js/berita.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const berita = JSON.parse(xhr.responseText).berita;

            // Ambil daftar indeks yang dihapus dari localStorage
            const deletedIndexes = JSON.parse(localStorage.getItem('deletedIndexes')) || [];

            // Filter berita untuk menghapus yang ada di deletedIndexes
            const visibleBerita = berita.filter((item, index) => !deletedIndexes.includes(index));

            // Render data yang tidak dihapus ke tabel
            renderTable(visibleBerita);
        }
    };
    xhr.send();
}

function renderTable(berita) {
    let html = '';
    berita.forEach((item, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.judul}</td>
                <td>${item.kategori}</td>
                <td>${item.editor}</td>
                <td>${item.tanggal}</td>
                <td>${item.status}</td>
                <td>
                    <i class="fas fa-pen" style="cursor:pointer;"></i>
                    <i class="fas fa-trash-alt" style="cursor:pointer; margin-left: 10px;" data-index="${index}"></i>
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
        loadBerita();
    }
});

// Muat data berita ketika halaman dimuat
loadBerita();  
});

function deleteBerita(index){
  $.ajax({
    url: 'js/berita.json',
    type: 'DELETE',
    data: JSON.stringify({ index: index }), // Contoh: Menghapus elemen pada indeks ke-1
    contentType: 'application/json',
    success: function(response) {
        console.log(response.status); // Output: "Data deleted successfully"
    },
    error: function(error) {
        console.error('Error:', error);
    }
});


}