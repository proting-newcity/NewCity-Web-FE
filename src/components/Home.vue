<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import Sidebar from './Sidebar.vue';
import TableBerita from './TableBerita.vue';
import Navbar from './navbar.vue';

const authStore = useAuthStore();

onMounted(async () => {
    await authStore.getUser();
})
</script>

<template>
    <Navbar />
    <div class="content">
        <Sidebar />
        <TableBerita />
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
    /* flex: 0 0 20%; Sidebar takes 20% width */
    max-width: 300px; /* Set max width if needed */
    background-color: #f4f4f4; /* Example background color */
}

.table-berita {
    flex: 1; /* Remaining space given to TableBerita */
    padding: 20px; /* Add padding for neatness */
    
}
</style>