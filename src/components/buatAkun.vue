<template>
    <div>
      <!-- NAV BAR -->
      <nav class="navbar navbar-expand-lg" style="background: #ecebe6">
        <div class="container-fluid">
          <img
            src="../images/logo-NewCity.png"
            alt="logo-NewCity"
            style="width: 10%"
            class="my-3 ms-3"
          />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
            <form class="d-flex">
              <a
                href="#"
                class="container-fluid mx-auto border border-success"
                style="border-radius: 50%; padding: 0"
              >
                <img
                  class="rounded-circle img-fluid"
                  src="images/img-profile.png"
                  style="height: 40px"
                />
              </a>
            </form>
          </div>
        </div>
      </nav>
      <!-- NAV BAR -->
  
      <!-- SIDE BAR -->
      <div class="sidebar d-flex align-items-center flex-column" style="background: #ecebe6">
        <div class="mt-4"></div>
        <a href="listBerita.html">
          <div class="flex-column d-flex align-items-center icon-berita">
            <img src="../images/logo-berita.png" alt="icon-berita" style="width: 30%" />
            <p style="font-size: 13px; color: #3a5a40; font-weight: 600">Berita</p>
          </div>
        </a>
        <a href="Report.html">
          <div class="flex-column d-flex align-items-center icon-berita">
            <img src="../images/logo-laporan.png" alt="icon-laporan" style="width: 30%" />
            <p style="font-size: 13px; font-weight: 600; color: #3a5a40">Laporan</p>
          </div>
        </a>
        <a href="listAkun.html">
          <div class="flex-column d-flex align-items-center icon-berita">
            <img src="../images/logo-pemerintah.png" alt="icon-laporan" style="width: 30%" />
            <p style="font-size: 13px; font-weight: 600; color: #3a5a40">Pemerintah</p>
          </div>
        </a>
      </div>
      <!-- SIDE BAR -->
  
      <!-- CONTENT -->
      <div class="form-container-wrapper">
        <div class="form-container">
          <div class="form-left">
            <div class="form-input-group">
              <label for="nama">Nama</label>
              <input v-model="formData.nama" type="text" id="nama" class="form-control" placeholder="Masukkan Nama" />
              <div v-if="errors.nama" class="alert alert-danger">{{ errors.nama }}</div>
            </div>
            <div class="form-input-group">
              <label for="nip">NIP</label>
              <input v-model="formData.nip" type="text" id="nip" class="form-control" placeholder="Masukkan NIP" />
              <div v-if="errors.nip" class="alert alert-danger">{{ errors.nip }}</div>
            </div>
            <div class="form-input-group">
              <label for="cakupan">Cakupan</label>
              <input v-model="formData.cakupan" type="text" id="cakupan" class="form-control" placeholder="Masukkan Cakupan Wilayah" />
              <div v-if="errors.cakupan" class="alert alert-danger">{{ errors.cakupan }}</div>
            </div>
            <div class="form-input-group">
              <label for="status">Status</label>
              <select v-model="formData.status" id="status" class="form-select">
                <option value="">Masukkan Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Non-aktif">Non-aktif</option>
              </select>
            </div>
            <div class="form-input-group">
              <label for="username">Username</label>
              <input v-model="formData.username" type="text" id="username" class="form-control" placeholder="Masukkan Username" />
            </div>
            <div class="form-input-group">
              <label for="password">Password</label>
              <input v-model="formData.password" type="password" id="password" class="form-control" placeholder="Masukkan Password" />
              <div v-if="errors.password" class="alert alert-danger">{{ errors.password }}</div>
            </div>
            <div class="form-input-group">
              <label for="confirmpassword">Confirm Password</label>
              <input v-model="formData.confirmpassword" type="password" id="confirmpassword" class="form-control" placeholder="Masukkan Konfirmasi Password" />
              <div v-if="errors.confirmpassword" class="alert alert-danger">{{ errors.confirmpassword }}</div>
            </div>
          </div>
          <div class="form-right">
            <div class="upload-photo" @click="showModal = true">
              <i v-if="!uploadedPhoto" class="bi bi-camera" style="font-size: 4em"></i>
              <span v-if="!uploadedPhoto">Unggah Foto</span>
              <img v-if="uploadedPhoto" :src="uploadedPhoto" class="rounded-circle" alt="Uploaded Photo" style="width: 250px; height: 250px;" />
            </div>
          </div>
        </div>
        <div class="form-buttons">
          <button @click="clearForm" type="button" class="btn btn-cancel me-2">Batal</button>
          <button @click="submitForm" type="submit" class="btn btn-save">Simpan</button>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show" id="uploadPhotoModal" tabindex="-1" aria-labelledby="uploadPhotoModalLabel" style="display: block;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadPhotoModalLabel">Upload Foto</h5>
              <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="file" id="fileInput" accept="image/*" @change="handlePhotoUpload" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" @click="savePhoto">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
        uploadedPhoto: null,
        formData: {
          username: '',
          password: '',
          confirmpassword: '',
          nama: '',
          nip: '',
          cakupan: '',
          status: '',
        },
        errors: {
          nama: '',
          nip: '',
          cakupan: '',
          password: '',
          confirmpassword: '',
        },
      };
    },
    methods: {
      handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.uploadedPhoto = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      validateForm() {
        this.errors = {
          nama: '',
          nip: '',
          cakupan: '',
          password: '',
          confirmpassword: '',
        };
        let isValid = true;
  
        if (this.formData.nama.trim() === '') {
          this.errors.nama = 'Nama harus terisi';
          isValid = false;
        }
        if (this.formData.nip.trim() === '') {
          this.errors.nip = 'NIP harus terisi';
          isValid = false;
        }
        if (this.formData.cakupan.trim() === '') {
          this.errors.cakupan = 'Cakupan harus terisi';
          isValid = false;
        }
        if (this.formData.password !== this.formData.confirmpassword) {
          this.errors.confirmpassword = 'Konfirmasi password tidak sesuai';
          isValid = false;
        }
        if (!this.validatePassword(this.formData.password)) {
          this.errors.password = 'Password must be 8-20 characters, have at least one capital letter, and no spaces or symbols.';
          isValid = false;
      }
      return isValid;
    },
    validatePassword(password) {
      const regex = /^(?=.*[A-Z])[A-Za-z]{8,20}$/;
      return regex.test(password) && !password.includes(' ');
    },
    displayErrorMessage(inputId, message) {
      this.errors[inputId] = message;
    },
    clearForm() {
      this.formData = {
        username: '',
        password: '',
        confirmpassword: '',
        nama: '',
        nip: '',
        cakupan: '',
        status: '',
      };
      this.uploadedPhoto = null;
      this.errors = {
        nama: '',
        nip: '',
        cakupan: '',
        password: '',
        confirmpassword: '',
      };
    },
    submitForm(event) {
      event.preventDefault();
      if (this.validateForm()) {
        console.log('Form Data:', this.formData);
        // Redirect to listAkun.html upon successful validation
        window.location.href = 'listAkun.html';
      } else {
        console.log('Form validation failed');
      }
    },
    savePhoto() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 7%;
  padding-top: 60px;
  z-index: 1;
}

.sidebar a {
  margin-top: 20px;
  font-size: 16px;
}

.form-container-wrapper {
  position: fixed;
  top: 70px;
  left: 7%;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: #f8f9fa;
}

.form-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.form-left {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
}

.form-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.upload-photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #3A5A40;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  color: #3A5A40;
  font-weight: bold;
  cursor: pointer;
}

.form-input-group label {
  font-weight: 600;
  font-size: 14px;
}

.form-input-group select.form-select {
  height: 50px;
  width: 530px;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 300px;
  z-index: 4; /* Ensure the dropdown is above other elements */
  position: relative; /* Make sure the z-index takes effect */
}

.form-input-group input.form-control, .form-input-group select.form-select {
  height: 50px;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-bottom: 200px;
  gap: 10px;
  margin-top: 20px;
}

.btn-cancel {
  background-color: #ECEBE6;
  color: #3a5a40;
  border: none;
  width: 100px;
  height: 40px;
  font-weight: 600;
  border-radius: 8px;
  padding-right: 10px;
  margin: -20px;
}

.btn-save {
  background-color: #3a5a40;
  color: white;
  border: none;
  width: 100px;
  height: 40px;
  font-weight: 600;
  border-radius: 8px;
  padding-bottom: 10px;
  margin: -20px;
}
</style>
