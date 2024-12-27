<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';

const authStore = useAuthStore();

onMounted(async () => {
    await authStore.getUser();
})
</script>

<template>
    <Navbar />
    <div class="content">
        <Sidebar />
        <router-view :key="$route.path" />
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
    overflow: auto;
    flex: 1;
}

.sidebar {
    max-width: 300px;
    background-color: #f4f4f4;
}

.table-berita,
.table-pemerintah,
.table-report {
    flex: 1;
    padding: 20px;

}
</style>