<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const dataStore = useAuthStore();
const name = ref('');
const username = ref('');
const phone = ref('');
const institusi_id = ref(null);
const institusiList = ref([]);
const status = ref(null);
const foto = ref(null);
const currentFoto = ref('');

const fetchPemerintah = async () => {
    try {
        const response = await dataStore.getPemerintahById(id);
        const data = response.data;
        name.value = data.user.name;
        username.value = data.user.username;
        phone.value = data.phone;
        institusi_id.value = data.institusi.id;
        status.value = data.status;
        currentFoto.value = data.user.foto;
    } catch (error) {
        console.error("Error mengambil pemerintah:", error);
    }
};

const fetchInstitusi = async () => {
    try {
        const response = await dataStore.getInstitusi(id);
        institusiList.value = response;
    } catch (error) {
        console.error("Error mengambil institusi:", error);
    }
}

const updatePemerintah = async () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('username', username.value);
    formData.append('phone', phone.value);
    formData.append('institusi_id', institusi_id.value);
    formData.append('status', status.value);

    if (foto.value) {
        formData.append('foto', foto.value);
    }

    await dataStore.updatePemerintah(formData, id);

};

onMounted(async () => {
    await dataStore.getUser();
    fetchInstitusi();
    fetchPemerintah();
})

const changeTable = (table) => {
    activeTable.value = table;
};
</script>

<template>
    <Navbar />
    <div class="content">
        <Sidebar @changeTable="changeTable" />
        <div class="col md-12 bg-white p-5">
            <div class="container-fluid">
                <div class="row">
                    <div class="col bg-white p-5">
                        <div class="row">
                            <!-- Photo Upload Section -->
                            <div class="row justify-content-md-center" style="margin-left: 150px;">
                                <div
                                    class="photo-upload border border-success rounded-circle d-flex flex-column justify-content-center align-items-center">
                                    <i class="bi bi-camera" style="font-size: 4em; color: #588157;"></i>
                                    <span>Unggah Foto</span>
                                    <input type="file" class="d-none"
                                        @change="event => foto.value = event.target.files[0]" />
                                    <!-- Display the current photo if available -->
                                    <img v-if="currentFoto" :src="`http://localhost:8000/${currentFoto}`" alt="Profile"
                                        class="photo-image" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="row">
                                    <label for="username" class="form-label">Username</label>
                                    <input v-model="username" type="text" class="form-control" id="username"
                                        placeholder="Masukkan Username">
                                </div>
                                <div class="row">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password"
                                        placeholder="Masukkan Password">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Section -->
                    <div class="col bg-white p-5">
                        <form @submit.prevent="updatePemerintah">
                            <div class="row mb-3">
                                <div class="row">
                                    <label for="name" class="form-label">Nama</label>
                                    <input v-model="name" type="text" class="form-control" id="name"
                                        placeholder="Masukkan Nama">
                                </div>
                                <div class="row">
                                    <label for="telp" class="form-label">No Telepon</label>
                                    <input v-model="phone" type="text" class="form-control" id="telp"
                                        placeholder="Masukkan No Telepon">
                                </div>
                                <div class="row">
                                    <label for="institusi" class="form-label">Institusi</label>
                                    <select v-model="institusi_id" class="form-select" id="institusi">
                                        <option value="" disabled>Pilih Institusi</option>
                                        <option v-for="institusi in institusiList" :key="institusi.id"
                                            :value="institusi.id">
                                            {{ institusi.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="row">
                                    <label for="status" class="form-label">Status</label>
                                    <select v-model="status" class="form-select" id="status">
                                        <option value="1" selected>Aktif</option>
                                        <option value="0">Non-Aktif</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Button Section -->
                            <div class="d-flex justify-content-end mt-4">
                                <button type="button" class="btn btn-outline-secondary me-2">Batal</button>
                                <button type="submit" class="btn btn-success"
                                    @click.prevent="updatePemerintah">Simpan</button>
                            </div>
                        </form>
                    </div>
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