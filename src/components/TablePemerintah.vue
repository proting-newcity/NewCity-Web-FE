<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { usePemerintahStore } from "@/stores/pemerintah";
import Swal from 'sweetalert2';
import axios from '@/axios.js';

const dataStore = usePemerintahStore();
const pemerintah = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const router = useRouter();
const result = ref();
let searchQuery = ref("");

const fetchPemerintah = async () => {
  try {
    pemerintah.value = ref([]);
    const response = await dataStore.getPemerintah(currentPage.value);
    pemerintah.value = response.data;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error("Error mengambil pemerintah:", error);
  }
};

const searchPemerintah = async () => {
  pemerintah.value = [];
  currentPage.value = 1;
  try {
    const response = await dataStore.searchPemerintah(currentPage.value, searchQuery.value);
    pemerintah.value = response.data;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error("Error fetching pemerintah:", error);
  }
};

const getFotoUrl = (fotoPath) => {
  if (!fotoPath) return null;
  return fotoPath.startsWith("storage/")
    ? `${axios.defaults.baseURL}/${fotoPath}`
    : fotoPath;
};

const confirmDelete = async (id) => {
  result.value = await Swal.fire({
    title: "Anda yakin akan menghapus laporan?",
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
      await deletePemerintah(id);
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

const deletePemerintah = async (id) => {
  try {
    await dataStore.deletePemerintah(id);
    fetchPemerintah();
  } catch (error) {
    console.error("Error menghapus pemerintah:", error);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPemerintah();
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPemerintah();
  }
};

const navigateToEditPemerintah = (id) => {
  router.push({ name: "pemerintah.edit", params: { id } }).catch((err) => {
    console.log(err)
  });
};

watch(
  currentPage,
  () => {
    fetchPemerintah();
  }
);

onMounted(() => {
  fetchPemerintah();
});
</script>

<template>
  <div class="table-pemerintah">
    <!-- Table Pemerintah Content -->
    <div v-if="!$route.params.id">

      <div class="d-flex justify-content-between align-items-center my-3 px-3">
        <button type="button" class="btn btn-success d-flex align-items-center"
          style="border-radius: 30px; padding: 10px 20px; background-color: #588157; font-weight: bolder;"
          @click="navigateToAddPemerintah">
          <font-awesome-icon icon="fa-solid fa-plus" style="margin-right:5px !important;" /> Tambah Akun
        </button>

        <div class="d-flex " id="search-bar">
          <i class="pi pi-search"></i>
          <input v-on:keyup.enter="searchPemerintah" type="text" v-model="searchQuery" placeholder="Cari Laporan..." />
        </div>
      </div>

      <div class="card-body">
        <div class="table-responsive"
          style="border: 1px solid #ECEBE6; border-radius: 10px; height: calc(100vh - 150px);">
          <table class="table table-hover">
            <thead>
              <tr class="table-active">
                <th>Nama</th>
                <th>Phone Number</th>
                <th>Institusi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pemerintah" :key="index">
                <td style="display: flex; align-items: center; padding-left: 20px;">
                  <img v-if="item.user.foto" :src="getFotoUrl(item.user.foto)" alt="Profile"
                    style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 10px !important;" />
                  <div>{{ item.user.name }}</div>
                </td>
                <td>{{ item.phone }}</td>
                <td>{{ item.institusi.name }}</td>
                <td>{{ item.status ? "Aktif" : "Non-Aktif" }}</td>
                <td>
                  <font-awesome-icon icon="fa-solid fa-pen" style="cursor: pointer; color: #588157"
                    @click="navigateToEditPemerintah(item.user.id)" />
                  <font-awesome-icon icon="fas fa-trash-alt ms-3" @click="confirmDelete(item.user.id)"
                    style="cursor: pointer; color: #588157; margin-left: 10px !important;" />
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
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

    <router-view v-else />
  </div>
</template>


<style scoped>
.table th,
.table td {
  padding-left: 20px;
}

.table td {
  vertical-align: middle;
}


.table-pemerintah {
  height: calc(100vh - 150px);
}

.table-active {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

.table-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.table-actions i {
  color: #588157;
  font-size: 1.2rem;
  cursor: pointer;
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