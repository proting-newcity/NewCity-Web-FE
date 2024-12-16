<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const dataStore = useAuthStore();
const berita = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);

const fetchBerita = async () => {
  try {
    const response = await dataStore.getBerita(currentPage.value);
    berita.value = response.data;
    totalPages.value = response.last_page;
    console.log("Berita:", berita.value);
  } catch (error) {
    console.error("Error fetching berita:", error);
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
        <i class="fas fa-plus me-2" style="font-size: 12px;"></i> Tambah Berita
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
              <td>Editor Placeholder</td>
              <td>{{ item.updated_at }}</td>
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
</style>