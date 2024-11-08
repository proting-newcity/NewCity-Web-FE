document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const accountIndex = parseInt(queryParams.get('index'), 10);
  
    // Load data dari akun.json berdasarkan index yang di klik
    function loadAkunData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "../js/akun.json", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const akun = JSON.parse(xhr.responseText).akun;
  
          // Cek apakah index valid
          if (accountIndex >= 0 && accountIndex < akun.length) {
            const dataAkun = akun[accountIndex];
            document.getElementById('username').value = dataAkun.username;
            document.getElementById('password').value = dataAkun.password;
            document.getElementById('name').value = dataAkun.nama;
            document.getElementById('nip').value = dataAkun.nip;
            document.getElementById('region').value = dataAkun.cakupan;
            document.getElementById('status').value = dataAkun.status;
  
            // Tambahkan foto profil jika tersedia
            const photoUpload = document.querySelector('.photo-upload');
            if (dataAkun.profileImage) {
              const img = document.createElement('img');
              img.src = dataAkun.profileImage;
              img.alt = 'Profile Image';
              img.classList.add('rounded-circle');
              img.style.width = '100px';
              img.style.height = '100px';
              img.style.objectFit = 'cover';
              photoUpload.innerHTML = '';
              photoUpload.appendChild(img);
            }
          } else {
            console.error('Invalid account index.');
          }
        }
      };
      xhr.send();
    }
  
    // Fungsi untuk menampilkan pop-up setelah berhasil menyimpan
    function showSuccessPopup() {
      const popup = document.createElement('div');
      popup.classList.add('alert', 'alert-success', 'fixed-top', 'text-center');
      popup.textContent = 'Edit akun berhasil!';
      document.body.appendChild(popup);
      setTimeout(() => {
        popup.remove();
        window.location.href = 'listAkun.html';
      }, 2000);
    }
  
    // Event untuk tombol "Simpan"
    const saveButton = document.querySelector('.btn-success');
    saveButton.addEventListener('click', function (event) {
      event.preventDefault();  // Mencegah form dari submit default
      showSuccessPopup();
    });
  
    // Event untuk tombol "Batal"
    const cancelButton = document.querySelector('.btn-outline-secondary');
    cancelButton.addEventListener('click', function () {
      window.location.href = 'listAkun.html';
    });
  
    // Event untuk "Unggah Foto"
    const photoUpload = document.querySelector('.photo-upload');
    photoUpload.addEventListener('click', function () {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);
  
      fileInput.click();
  
      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Profile Image';
            img.classList.add('rounded-circle');
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            photoUpload.innerHTML = '';
            photoUpload.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
        document.body.removeChild(fileInput);
      });
    });
  
    // Panggil fungsi untuk load data akun saat halaman dimuat
    loadAkunData();
  });
  