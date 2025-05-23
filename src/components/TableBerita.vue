<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useBeritaStore } from "@/stores/berita";
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const dataStore = useBeritaStore();
const berita = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const result = ref();
const searchQuery = ref("");

const fetchBerita = async () => {
  console.log('Current path is:', route.path)
  berita.value = [];
  try {
    const response = await dataStore.getBerita(currentPage.value);
    berita.value = response.data;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error("Error fetching berita:", error);
  }
};

const searchBerita = async () => {
  berita.value = [];
  currentPage.value = 1;
  try {
    const response = await dataStore.searchBerita(currentPage.value, searchQuery.value);
    berita.value = response.data;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error("Error fetching berita:", error);
  }
};

const confirmDelete = async (id) => {
  result.value = await Swal.fire({
    title: "Anda yakin akan menghapus Berita?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#588157",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  });

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
};

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

const navigateToAddBerita = () => {
  router.push({ name: 'berita.add' });
};

const editBerita = (id) => {
  router.push({ name: 'berita.edit', params: { id } });
};

// Format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}  ${hours}:${minutes} WIB`;
};

onMounted(() => {
  fetchBerita();
});
</script>

<template>
  <div class="table-berita">
    <div v-if="$route.path == '/berita'">
    <!-- Button Tambah Berita -->
    <div class="d-flex justify-content-between align-items-center my-3 px-3">
      <button
        type="button"
        class="btn btn-success d-flex align-items-center"
        style="border-radius: 30px; padding: 10px 20px; background-color: #588157; font-weight: bolder;"
        @click="navigateToAddBerita"
      >
        <font-awesome-icon icon="fa-solid fa-plus" class="me-2" /> Tambah Berita
      </button>
      <div class="d-flex" id="search-bar">
        <i class="pi pi-search"></i>
        <input
          v-on:keyup.enter="searchBerita"
          type="text"
          v-model="searchQuery"
          placeholder="Cari Berita..."
        />
      </div>
    </div>

    <!-- Table berita -->
    <div class="card-body">
      <div
        class="table-responsive"
        style="border: 1px solid #ECEBE6; border-radius: 10px; height: calc(100vh - 280px);"
      >
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
                <font-awesome-icon
                  icon="fa-solid fa-pen"
                  @click="editBerita(item.id)"
                  style="cursor:pointer; color: #588157"
                />
                <font-awesome-icon
                  icon="fas fa-trash-alt"
                  @click="confirmDelete(item.id)"
                  class="ms-3"
                  style="cursor:pointer; color: #588157"
                />
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
        :disabled="currentPage.value === 1"
        @click="goToPreviousPage"
      >
        Sebelumnya
      </button>
      <p class="m-0">Halaman {{ currentPage.value }} dari {{ totalPages.value }}</p>
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="currentPage.value === totalPages.value"
        @click="goToNextPage"
      >
        Selanjutnya
      </button>
    </div>
    </div>
    <router-view v-else />
  </div>
</template>

<style scoped>
.table-berita {
  height: calc(100vh - 150px);
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

#search-bar {
  display: flex;
  padding: 0 24px;
  align-items: center;
  background-color: #f8f8f6;
  border-radius: 25px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  padding-left: 10px;
}
</style>
