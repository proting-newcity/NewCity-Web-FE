<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();


</script>

<template>
  <nav class="navbar navbar-expand-lg" style="background: #ECEBE6;">
    <div class="container-fluid">
      <img src="../assets/logo-NewCity.png" alt="logo-NewCity" style="width: 10%;" class="my-3 ms-3">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
        </div>
        <form class="d-flex">
          <button type="submit" class="btn btn-success" @click.prevent="authStore.handleLogout">Logout</button>
        </form>
      </div>
    </div>
  </nav>
</template>
