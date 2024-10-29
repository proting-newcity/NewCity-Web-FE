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

      updatePageInfo(data.length); // Update page info after rendering
  }

  // Update page information
  function updatePageInfo(totalData) {
      const totalPages = Math.ceil(totalData / rowsPerPage);
      $("#page-number").text(`${currentPage} dari ${totalPages}`);
  }

  // Change page
  function changePage(direction) {
      const totalPages = Math.ceil(akunData.length / rowsPerPage);
      if (direction === "next" && currentPage < totalPages) {
          currentPage++;
      } else if (direction === "prev" && currentPage > 1) {
          currentPage--;
      }
      renderTable();
  }

  // Search function
  $("#searchInput").on("keyup", function () {
      const searchTerm = $(this).val().toLowerCase();
      const filteredData = akunData.filter(item =>
          item.username.toLowerCase().includes(searchTerm) ||
          item.password.toLowerCase().includes(searchTerm) ||
          item.role.toLowerCase().includes(searchTerm)
      );
      currentPage = 1; // Reset to first page
      renderTable(filteredData);
  });

  // Page navigation buttons
  $("#buttonnext").on("click", function () {
      changePage("next");
  });
  $("#buttonprev").on("click", function () {
      changePage("prev");
  });

  // Load data on page ready
  loadData();
});
