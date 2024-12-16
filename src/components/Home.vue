<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Sidebar from './Sidebar.vue';
import TableBerita from './TableBerita.vue';
import TablePemerintah from './TablePemerintah.vue';
import Navbar from './navbar.vue';

const authStore = useAuthStore();
const activeTable = ref('berita');

onMounted(async () => {
    await authStore.getUser();
})

const changeTable = (table) => {
    activeTable.value = table;
};
</script>

<template>
    <Navbar />
    <div class="content">
        <Sidebar @changeTable="changeTable" />
        <TableBerita v-if="activeTable === 'berita'" />
        <TablePemerintah v-if="activeTable === 'pemerintah'" />
        <TableReport v-if="activeTable === 'report'" />
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content {
    display: flex;
    width: 100%;
    flex: 1;
}

.sidebar {
    max-width: 300px;
    background-color: #f4f4f4;
}

.table-berita,
.table-pemerintah,
.table-pemerintah {
    flex: 1;
    padding: 20px;

}
</style>