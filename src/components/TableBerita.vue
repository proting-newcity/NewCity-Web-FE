<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const dataStore = useAuthStore();
const berita = ref([]); // Data berita untuk tabel
const currentPage = ref(1); // Halaman aktif
const totalPages = ref(0); // Total halaman

// Fungsi untuk mengambil data berita
const fetchBerita = async () => {
  berita.value = [];
  try {
    const response = await dataStore.getBerita(currentPage.value);
    berita.value = response.data; // Data berita
    totalPages.value = response.last_page; // Total halaman
    console.log("Berita:", berita.value);
  } catch (error) {
    console.error("Error fetching berita:", error);
  }
};

// Navigasi ke halaman sebelumnya
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchBerita();
  }
};

// Navigasi ke halaman berikutnya
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchBerita();
  }
};

// Fungsi untuk mengubah format tanggal
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString(); // Ambil dua digit terakhir tahun
    return `${day}/${month}/${year}  ${hours}:${minutes}  WIB`;
  };

onMounted(() => {
  fetchBerita();
});
</script>



<template>
  <div class="table-berita">
    <!-- Button Tambah Berita -->
    <div class="d-flex justify-content-start align-items-center my-3 px-3">
      <button
        type="button"
        class="btn btn-success d-flex align-items-center"
        style="border-radius: 30px; padding: 10px 20px; background-color: #588157; font-weight: bolder;"
        @click="navigateToAddBerita"
      >
        <i class="fas fa-plus me-2" style="font-size: 12px;"></i> Tambah Berita
      </button>
    </div>

    <!-- Table berita -->
    <div class="card-body">
      <div class="table-responsive" style="border: 1px solid #ECEBE6; border-radius: 10px; height: 100%;">
        <table class="table table-hover">
          <thead>
            <tr class="table-active">
              <th>No</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Editor</th>
              <th>Terakhir Dimodifikasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in berita" :key="index">
              <td>{{ index + 1 + (currentPage - 1) * berita.length }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.kategori.name }}</td>
              <td>{{ item.user.name }}</td>
              <td>{{ formatDate(item.updated_at) }}</td>
              <td>{{ item.status }}</td>
              <td>
                <i class="fas fa-pen" @click="editBerita(index)" style="cursor:pointer;"></i>
                <i class="fas fa-trash-alt ms-3" @click="deleteBerita(index)" style="cursor:pointer;"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center px-3 my-3">
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="currentPage === 1"
        @click="goToPreviousPage"
      >
        Sebelumnya
      </button>
      <p class="m-0">Halaman {{ currentPage }} dari {{ totalPages }}</p>
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="currentPage === totalPages"
        @click="goToNextPage"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>





<style scoped>
.table-berita {
    height: 100%; /* Adjust the height according to your layout */
    
}

.table-active {
    width: 100%; /* Full width */
    border-collapse: collapse;
    margin: 0;
    padding: 0;
}

.table {
    margin-bottom:  0; /* Remove default margin */
}
</style>