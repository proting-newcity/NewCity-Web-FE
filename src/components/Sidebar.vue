<template>

  <!-- SIDE BAR -->
  <div class="col-auto min-vh-100 d-flex align-items-center flex-column sidebar"
    style="background: #ECEBE6; width: 5%;">
    <a @click.prevent="$emit('changeTable', 'berita')" class="mt-4">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-berita.png" alt="icon-berita" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; color: #3A5A40; font-weight: 600;">Berita</p>
      </div>
    </a>

    <a @click.prevent="$emit('changeTable', 'report')">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-laporan.png" alt="icon-report" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Report</p>
      </div>
    </a>

    <a @click.prevent="$emit('changeTable', 'pemerintah')">
      <div class="flex-column d-flex align-items-center">
        <img src="../assets/logo-pemerintah.png" alt="icon-pemerintah" style="width: 50%;" />
        <p class="text-center" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Pemerintah</p>
      </div>
    </a>
  </div>

</template>

<script>
export default {
  name: "NavbarSidebar",
};
</script>

<style scoped>
/* Custom styles specific to NavbarSidebar */
</style>
