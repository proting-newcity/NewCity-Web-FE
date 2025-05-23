<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBeritaStore } from "@/stores/berita";
import Swal from 'sweetalert2';

const dataStore = useBeritaStore();
const router = useRouter();
const route = useRoute();

const title = ref('');
const content = ref('');
const editorName = ref('admin');
const modifiedDate = ref('');
const status = ref('Draft');
const allCategories = ref([]);
const selectedCategory = ref('');
const photo = ref(null);
const existingPhotoUrl = ref('');

const fetchBeritaDetail = async (id) => {
  try {
    const response = await dataStore.getBeritaById(id);
    const b = response.data || response;
    title.value = b.title;
    content.value = b.content;
    status.value = b.status === 'published' ? 'Diterbitkan' : 'Draft';
    modifiedDate.value = new Date(b.updated_at).toLocaleString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    selectedCategory.value = b.id_kategori;
    existingPhotoUrl.value = b.foto;
  } catch (error) {
    console.error('Error fetching berita detail:', error);
  }
};

const fetchKategori = async () => {
  try {
    const response = await dataStore.getKategori();
    const data = Array.isArray(response) ? response : response.data || [];
    allCategories.value = data.map(item => ({ value: item.id, label: item.name }));
  } catch (error) {
    console.error("Error mengambil kategori:", error);
  }
};

function updateModifiedDate() {
  const now = new Date();
  modifiedDate.value = now.toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) photo.value = file;
}

const publish = async () => {
  status.value = 'Diterbitkan';
  updateModifiedDate();

  const formData = new FormData();
  if (title.value) formData.append('title', title.value);
  if (content.value) formData.append('content', content.value);
  formData.append('status', 'published');
  if (selectedCategory.value) formData.append('id_kategori', selectedCategory.value);
  if (photo.value) formData.append('foto', photo.value);

  try {
    await dataStore.updateBerita(formData, route.params.id);
    await Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Berita berhasil diterbitkan.', confirmButtonColor: '#588157' });
    router.replace({ name: 'berita.table' });
  } catch (error) {
    console.error('Error posting berita:', error);
    Swal.fire({ icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan saat menerbitkan.', confirmButtonColor: '#588157' });
  }
};

onMounted(async () => {
  updateModifiedDate();
  await fetchKategori();
  await fetchBeritaDetail(route.params.id);
});
</script>

<template>
  <div class="add-berita-container">
    <main class="editor-wrapper">
      <section class="editor-panel">
        <div class="toolbar">
          <button @click.prevent="publish" class="publish-btn">Terbitkan</button>
        </div>
        <div class="text-box">
          <input
            v-model="title"
            type="text"
            placeholder="Tambah judul..."
            class="title-input"
          />
          <textarea
            v-model="content"
            placeholder="Mulai tulis isi berita di sini..."
            class="content-area"
          ></textarea>
        </div>
        <div class="upload-section">
          <label class="upload-label">
            Unggah Foto:
            <input type="file" accept="image/*" @change="onFileChange" />
          </label>
        </div>
      </section>

      <aside class="details-panel">
        <h4 class="details-header">Detail Berita</h4>
        <div class="details-item"><strong>Judul:</strong> <span>{{ title || '—' }}</span></div>
        <div class="details-item"><strong>Editor:</strong> <span>{{ editorName }}</span></div>
        <div class="details-item"><strong>Terakhir Dimodifikasi:</strong> <span>{{ modifiedDate }}</span></div>
        <div class="details-item"><strong>Status:</strong> <span class="status">{{ status }}</span></div>

        <div class="details-section">
          <strong>Kategori:</strong>
          <div class="category-tags">
            <button
              v-for="cat in allCategories"
              :key="cat.value"
              :class="['tag-btn', { selected: selectedCategory === cat.value }]"
              @click="selectedCategory = cat.value"
            >{{ cat.label }}</button>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.add-berita-container { font-family: 'Poppins', sans-serif; padding: 20px; background: #f1f3f5; min-height: 100vh; }
.editor-wrapper { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
.editor-panel { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
.toolbar { display: flex; justify-content: flex-end; margin-bottom: 12px; }
.publish-btn { background: #588157; color: #fff; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
.publish-btn:hover { background: #4a704c; }
.text-box { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
.title-input { font-weight: bold; font-size: 1.25rem; padding: 8px; border: none; outline: none; }
.title-input::placeholder { font-weight: bold; color: #999; }
.content-area { flex: 1; padding: 8px; border: none; outline: none; min-height: 200px; resize: vertical; }
.upload-section { margin-top: 16px; }
.upload-label input { display: block; margin-top: 8px; }
.details-panel { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
.details-header { margin-bottom: 16px; font-size: 1.25rem; color: #333; }
.details-item { display: flex; justify-content: space-between; margin-bottom: 12px; }
.status { color: #588157; font-weight: 600; }
.category-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tag-btn { background: #e9ecef; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; font-size: 0.9rem; }
.tag-btn.selected { background: #588157; color: #fff; }
</style>