<script setup>
import "primeicons/primeicons.css";
import { ref, onMounted } from "vue";
import { useLaporanStore } from "@/stores/laporan";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Swal from "sweetalert2";

const dataStore = useLaporanStore();
const laporan = ref([]);
const selectedReport = ref();
let searchQuery = ref("");

const fetchLaporan = async () => {
  laporan.value = [];
  try {
    const response = await dataStore.getLaporan();
    laporan.value = response.data;
  } catch (error) {
    console.error("Error fetching laporan:", error);
  }
};

function selectReport(report) {
  // Pilih laporan dan tampilkan di kolom 2
  this.selectedReport = report;
}

function isSelected(report) {
  // Cek apabila laporan sudah terpilih
  return this.selectedReport === report;
}

function scrollToTop() {
  // Scroll ke atas kolom 1
  const column1 = document.getElementById("column-1");
  column1.scrollTo({ top: 0, behavior: "smooth" });
}

function filteredReports() {
  // Filter laporan berdasarkan searchQuery
  return laporan.value.filter((laporan) =>
    laporan.judul.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}

// Fungsi untuk mengubah format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString(); // Ambil dua digit terakhir tahun
  return `${day}/${month}/${year}  ${hours}:${minutes}  WIB`;
};

const updateStatusLaporan = async (report, destinatedStatus) => {
  const formData = new FormData();
  formData.append("status", destinatedStatus);
  await dataStore.updateStatusLaporan(formData, report.id);
  Swal.fire({
    icon: "success",
    title: "Status berhasil terupdate",
    showConfirmButton: false,
    timer: 1500,
  });
  fetchLaporan();
  selectedReport.value = null;
};

onMounted(() => {
  fetchLaporan();
});
</script>

<template>
  <div class="col d-flex" style="padding: 2rem">
    <!-- Column 1 -->
    <div class="col-3" id="column-1">
      <div class="d-flex" id="search-bar">
        <i class="pi pi-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari Laporan..."
        />
      </div>
      <div class="container" id="card-container">
        <div
          v-for="report in filteredReports()"
          class="card-template"
          @click="selectReport(report)"
          :class="{ 'active-card': isSelected(report) }"
        >
          <div class="row mx-auto" id="card-list">
            <div class="col-2" style="margin: auto">
              <span class="dot">
                <img
                  v-if="report.status[0].status == 'Menunggu'"
                  src="../assets/Accepted.png"
                  alt="Confirmation"
                  style="margin: 14%"
                />
                <img
                  v-else-if="report.status[0].status == 'Ditolak'"
                  src="../assets/Rejected.png"
                  alt="Confirmation"
                  style="margin: 14%"
                />
                <img
                  v-else
                  src="../assets/NotConfirmed.png"
                  alt="Confirmation"
                  style="margin: 14%"
                />
              </span>
            </div>
            <div class="col">
              <div class="d-flex">
                <h4 class="card-title">{{ report.judul }}</h4>
                <span class="card-date">{{
                  formatDate(report.created_at)
                }}</span>
              </div>
              <p class="card-description">{{ report.deskripsi }}</p>
            </div>
          </div>
        </div>
      </div>
      <button id="back-to-top" class="back-to-top" @click="scrollToTop">
        ↑ Top
      </button>
    </div>

    <!-- Column 2 -->
    <div class="flex-fill ms-3" id="column-2">
      <div v-if="selectedReport">
        <form @submit.prevent="updateStatusLaporan(selectedReport)">
          <img
            class="card-img-top img-fluid"
            :src="'http://127.0.0.1:8000/' + selectedReport.foto"
            alt="Foto Laporan"
          />
          <div class="card-content">
            <h3 class="card-title">{{ selectedReport.judul }}</h3>
            <p class="card-info-title">Permasalahan</p>
            <p class="card-info">{{ selectedReport.deskripsi }}</p>
            <p class="card-info-title">Lokasi</p>
            <p class="card-info">{{ selectedReport.lokasi }}</p>
            <p class="card-info-title">Tanggal Laporan</p>
            <p class="card-info">{{ formatDate(selectedReport.created_at) }}</p>
            <hr />
            <div
              v-if="selectedReport.status[0].status == null"
              class="card-buttons"
            >
              <button
                class="btn-cancel"
                @click.prevent="updateStatusLaporan(selectedReport, 'Ditolak')"
              >
                Tolak
              </button>
              <button
                class="btn-confirm"
                @click.prevent="updateStatusLaporan(selectedReport, 'Menunggu')"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
      <div v-else>
        <h3 class="text-center">Pilih laporan untuk melihat detailnya.</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
#column-1 {
  overflow-y: scroll;
  border-radius: 8px;
}

#column-2 {
  height: 110vh;
  overflow-y: scroll;
  background-color: #f3feee;
  border: 1.14px solid#3a5a40;
  border-radius: 8px;
}

.dot {
  height: 45px;
  width: 45px;
  background-color: #3a5a40;
  border-radius: 50%;
  display: inline-block;
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

#card-list {
  background-color: #f3feee;
  border: 1.14px solid#3a5a40;
  border-radius: 12px;
  padding: 18px;
  margin: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#card-list:hover {
  background-color: #d3e4cd;
  border-color: #3a5a40;
}

.active-card #card-list {
  background-color: #3a5a40;
  border-color: #f3feee;
  color: #f3feee;
}

.active-card .dot {
  background-color: #617b66;
}

#back-to-top {
  position: fixed;
  bottom: 2%;
  left: 25%;
  padding: 10px 15px;
  background-color: #3a5a40;
  color: #f3feee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#back-to-top:hover {
  background-color: #2a4830;
}

/* Media Query for very small screens */
@media (max-width: 1500px) {
  #column-1,
  #column-2 {
    min-width: 300px; /* Allow columns to reduce further if needed */
  }

  .row {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}

.card-content {
  padding: 24px;
  color: #272727;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
}

.card-info-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}

.card-info {
  font-size: 16px;
  line-height: 1.5;
}

.card-buttons {
  display: flex;
  justify-content: end;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  margin: 4px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

.btn-cancel {
  background-color: transparent;
  color: #3a5a40;
  border: 1px solid #3a5a40;
}

.btn-confirm {
  background-color: #3a5a40;
  color: white;
}

.btn-cancel:hover {
  background-color: #3a5a40;
  color: white;
  border: 1px solid #3a5a40;
}

.btn-cancel:active {
  background-color: #2b4330;
  color: white;
  border: 1px solid #2b4330;
}

.btn-confirm:hover {
  background-color: #4b7850;
  color: white;
}

.btn-confirm:active {
  background-color: #2b4330;
  color: white;
}
</style>
