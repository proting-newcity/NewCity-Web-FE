<script>
export default {
  name: "NavbarSidebar",
};
</script>

<template>
  <div class="col-auto min-vh-100 d-flex align-items-center flex-column sidebar"
    style="background: #ECEBE6; width: 5%;">

    <router-link :to="{ name: 'berita.table' }" class="mt-4" style="cursor:pointer;">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-berita.png" alt="icon-berita" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; color: #3A5A40; font-weight: 600;">Berita</p>
      </div>
    </router-link>

    <a style="cursor:pointer;">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-laporan.png" alt="icon-report" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Report</p>
      </div>
    </a>

    <router-link :to="{ name: 'pemerintah.table' }" class="mt-4" style="cursor:pointer;">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-pemerintah.png" alt="icon-pemerintah" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Pemerintah</p>
      </div>
    </router-link>
  </div>

</template>

<style scoped>
/* Custom styles specific to NavbarSidebar */
</style>
