document.addEventListener('DOMContentLoaded', function () {
  // 1. Navigasi ke halaman "Tambah Berita"
  const tambahBeritaButton = document.querySelector('.btn.btn-success.d-flex.align-items-center');
  tambahBeritaButton.addEventListener('click', function () {
      window.location.href = 'tambah-akun.html';
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
    document.getElementById("page-number").innerText = `${currentPage} dari ${totalPages}`;
  }

  // 4. Delete and Edit actions for each account row
  const tableBody = document.querySelector('tbody');

  tableBody.addEventListener('click', function (event) {
      // Check if a delete icon was clicked
      if (event.target.classList.contains('fa-trash-alt')) {
          const row = event.target.closest('tr');
          row.remove(); // Remove the row from the DOM
          // If managing data in an array, you can remove it from the array here
      }

      // Check if an edit icon was clicked
      if (event.target.classList.contains('fa-pen')) {
          const row = event.target.closest('tr');
          // Assuming each row has an ID or unique identifier for editing
          const accountId = row.querySelector('td:nth-child(2)').textContent; // example using NIP column
          window.location.href = `edit-akun.html?id=${accountId}`; // Redirect to edit page with account ID
      }
  });
});
