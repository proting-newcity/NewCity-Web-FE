<script setup>
import { ref, onMounted } from "vue";
import { useBeritaStore } from "@/stores/berita";
import Swal from 'sweetalert2';

const dataStore = useBeritaStore();
const berita = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const result = ref();

const fetchBerita = async () => {
  berita.value = [];
  try {
    const response = await dataStore.getBerita(currentPage.value);
    berita.value = response.data;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error("Error fetching berita:", error);
  }
};

const confirmDelete = async (id) => {
  console.log(id);
  result.value = await Swal.fire({
    title: "Anda yakin akan menghapus Berita?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#588157",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  });

  console.log(result.value);
  if (result.value.isConfirmed) {
    try {
      await deleteBerita(id);
      await Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#588157",

      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus data.",
        icon: "error",
        confirmButtonColor: "#588157",
      });
    }
  }
}

const deleteBerita = async (id) => {
  try {
    await dataStore.deleteBerita(id);
    fetchBerita();
  } catch (error) {
    console.error("Error menghapus berita:", error);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchBerita();
  }
};

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
      <button type="button" class="btn btn-success d-flex align-items-center"
        style="border-radius: 30px; padding: 10px 20px; background-color: #588157; font-weight: bolder;"
        @click="navigateToAddBerita">
        <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:5px !important;" /> Tambah Berita
      </button>
    </div>

    <!-- Table berita -->
    <div class="card-body">
      <div class="table-responsive"
        style="border: 1px solid #ECEBE6; border-radius: 10px; height: calc(100vh - 150px);">
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
                <font-awesome-icon icon="fa-solid fa-pen" @click="editBerita(item.id)" style="cursor:pointer; color: #588157" />
                <font-awesome-icon icon="fas fa-trash-alt ms-3" @click="confirmDelete(item.id)"
                  style="cursor:pointer;margin-left:10px !important; color: #588157" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center px-3 my-3">
      <button type="button" class="btn btn-secondary" :disabled="currentPage === 1" @click="goToPreviousPage">
        Sebelumnya
      </button>
      <p class="m-0">Halaman {{ currentPage }} dari {{ totalPages }}</p>
      <button type="button" class="btn btn-secondary" :disabled="currentPage === totalPages" @click="goToNextPage">
        Selanjutnya
      </button>
    </div>
  </div>
</template>





<style scoped>
.table-berita {
    height: calc(100vh - 150px); /* Adjust the height according to your layout */
    
}

.table-active {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

.table {
  margin-bottom: 0;
}
</style>e