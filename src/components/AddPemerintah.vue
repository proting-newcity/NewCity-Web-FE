<script setup>
import { ref, onMounted } from 'vue';
import { usePemerintahStore } from '@/stores/pemerintah';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const dataStore = usePemerintahStore();
const name = ref('');
const username = ref('');
const password = ref('');
const phone = ref('');
const institusi_id = ref(null);
const institusiList = ref([]);
const status = ref(null);
const foto = ref(null);
const currentFoto = ref('');

// Fetch institusi
const fetchInstitusi = async () => {
  try {
    const response = await dataStore.getInstitusi(id);
    institusiList.value = response;
  } catch (error) {
    console.error("Error mengambil institusi:", error);
  }
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    foto.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentFoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Navigate away
const navigateToTablePemerintah = () => {
  router.replace({ name: "pemerintah.table" }).catch(err => console.error(err));
};

// Post pemerintah with validation
const postPemerintah = async () => {
  if (!name.value.trim())
    return Swal.fire({ icon: 'warning', title: 'Nama kosong', text: 'Silakan masukkan nama.', confirmButtonColor: '#588157' });
  if (!username.value.trim())
    return Swal.fire({ icon: 'warning', title: 'Username kosong', text: 'Silakan masukkan username.', confirmButtonColor: '#588157' });
  if (!password.value.trim())
    return Swal.fire({ icon: 'warning', title: 'Password kosong', text: 'Silakan masukkan password.', confirmButtonColor: '#588157' });
  if (!phone.value.trim())
    return Swal.fire({ icon: 'warning', title: 'Telepon kosong', text: 'Silakan masukkan nomor telepon.', confirmButtonColor: '#588157' });
  if (!institusi_id.value)
    return Swal.fire({ icon: 'warning', title: 'Institusi belum dipilih', text: 'Silakan pilih institusi.', confirmButtonColor: '#588157' });
  if (status.value === null)
    return Swal.fire({ icon: 'warning', title: 'Status belum dipilih', text: 'Silakan pilih status.', confirmButtonColor: '#588157' });

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('phone', phone.value);
  formData.append('institusi_id', institusi_id.value);
  formData.append('status', status.value);
  if (foto.value) formData.append('foto', foto.value);

  try {
    await dataStore.postPemerintah(formData);
    await Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data berhasil disimpan.', confirmButtonColor: '#588157' });
    navigateToTablePemerintah();
  } catch (error) {
    console.error('Error posting pemerintah:', error);
    Swal.fire({ icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan saat menyimpan.', confirmButtonColor: '#588157' });
  }
};

onMounted(() => {
  fetchInstitusi();
});
</script>

<template>
  <div class="col md-12 bg-white">
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-white">
          <div class="row justify-content-md-center">
            <div
              class="photo-upload border border-success rounded-circle d-flex flex-column justify-content-center align-items-center"
              @click="$refs.fileInput.click()"
              style="height: 400px; width: 400px;"
            >
              <input
                type="file"
                accept="image/*"
                ref="fileInput"
                class="d-none"
                @change="handleImageUpload"
              />
              <img v-if="currentFoto" :src="currentFoto" alt="Profile" class="photo-image" />
              <span v-else>Unggah Foto</span>
            </div>
          </div>
          <div class="row mt-4">
            <div>
              <label for="username" class="form-label">Username</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Masukkan Username"
              />
            </div>
            <div class="mt-3">
              <label for="password" class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Masukkan Password"
              />
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <div class="col bg-white">
          <form @submit.prevent="postPemerintah">
            <div class="mb-3">
              <label for="name" class="form-label">Nama</label>
              <input
                v-model="name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Masukkan Nama"
              />
            </div>
            <div class="mb-3">
              <label for="telp" class="form-label">No Telepon</label>
              <input
                v-model="phone"
                type="text"
                class="form-control"
                id="telp"
                placeholder="Masukkan No Telepon"
              />
            </div>
            <div class="mb-3">
              <label for="institusi" class="form-label">Institusi</label>
              <select
                v-model="institusi_id"
                class="form-select"
                id="institusi"
              >
                <option value="" disabled>Pilih Institusi</option>
                <option
                  v-for="inst in institusiList"
                  :key="inst.id"
                  :value="inst.id"
                >
                  {{ inst.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <select v-model="status" class="form-select" id="status">
                <option :value="1">Aktif</option>
                <option :value="0">Non-Aktif</option>
              </select>
            </div>

            <!-- Button Section -->
            <div class="d-flex justify-content-end mt-4">
              <button
                type="button"
                class="btn btn-outline-secondary me-2"
                @click="navigateToTablePemerintah"
              >
                Batal
              </button>
              <button type="submit" class="btn btn-success">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.content {
    display: flex;
    width: 100%;
    flex: 1;
}

.sidebar {
    max-width: 300px;
    background-color: #f4f4f4;
}

/* General page background color */
body {
    background-color: #F4F3F0;
}

/* Photo upload section styling */
.photo-upload {
    width: 300px;
    height: 300px;
    border-width: 2px;
    border-color: #588157;
    color: #588157;
    text-align: center;
    font-size: 14px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}


.photo-upload i {
    font-size: 40px;
}

.photo-upload span {
    color: #588157;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
}

/* Form control styling */
.form-control,
.form-select {
    background-color: #F9F9F9;
    color: #333;
    border-color: #e0e0e0;
    height: 50px;
    font-size: 16px;
}

.form-label {
    font-size: 14px;
    color: #333;
    padding-top: 20px;
    padding-bottom: 20px;
}

/* Button styling */
.btn-outline-secondary {
    color: #333;
    border-color: #ccc;
    border-radius: 20px;
    padding: 10px 20px;
}

.btn-success {
    background-color: #588157;
    border-color: #588157;
    color: white;
    border-radius: 20px;
    padding: 10px 20px;
}

.btn-success:hover {
    background-color: #588157;
    border-color: #588157;
}
</style>