<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../base/BaseButton.vue';
import { categories } from '../../data/items.js';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue', 'added']);

const store = useStore();

const title = ref('');
const category = ref('Date Night');
const summary = ref('');
const description = ref('');
const imageUrl = ref('');
const highlightsInput = ref('');
const frameStyle = ref('polaroid');
const errorMessage = ref('');

const previewTitle = computed(() => title.value || 'Judul Kenangan');
const previewCaption = computed(() => summary.value || 'Tulisan keterangan singkat...');

function close() {
  emit('update:modelValue', false);
}

function resetForm() {
  title.value = '';
  category.value = 'Date Night';
  summary.value = '';
  description.value = '';
  imageUrl.value = '';
  highlightsInput.value = '';
  frameStyle.value = 'polaroid';
  errorMessage.value = '';
}

function onFileChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'File yang dipilih bukan gambar.';
    return;
  }
  if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value);
  }
  imageUrl.value = URL.createObjectURL(file);
  errorMessage.value = '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
}

function makeUniqueSlug(base) {
  const existing = store.getters.allItems;
  let slug = base || `memory-${Date.now()}`;
  let i = 2;
  while (existing.some((item) => item.slug === slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

function handleSubmit() {
  errorMessage.value = '';
  if (!title.value.trim()) {
    errorMessage.value = 'Judul wajib diisi.';
    return;
  }
  if (!summary.value.trim()) {
    errorMessage.value = 'Keterangan singkat wajib diisi.';
    return;
  }
  if (!imageUrl.value) {
    errorMessage.value = 'Pilih satu foto terlebih dahulu.';
    return;
  }

  const baseSlug = slugify(title.value);
  const slug = makeUniqueSlug(baseSlug);
  const highlights = highlightsInput.value
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  const memory = {
    id: `item-${Date.now()}`,
    slug,
    title: title.value.trim(),
    category: category.value,
    summary: summary.value.trim(),
    description: description.value.trim() || summary.value.trim(),
    imageUrl: imageUrl.value,
    highlights: highlights.length ? highlights : ['Kenangan Baru'],
  };

  store.dispatch('addMemory', memory);
  emit('added', memory);
  resetForm();
  close();
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

function onBackdropClick(e) {
  if (e.target === e.currentTarget) close();
}
</script>

<template>
  <transition name="modal">
    <div
      v-if="modelValue"
      class="modal-overlay"
      @click="onBackdropClick"
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-memory-title"
      >
        <header class="modal__header">
          <h2 id="add-memory-title" class="modal__title">Tambah Kenangan Baru</h2>
          <button
            class="modal__close"
            type="button"
            aria-label="Tutup"
            @click="close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" />
              <line x1="6" y1="18" x2="18" y2="6" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div class="modal__body">
          <div class="modal__form">
            <div class="field">
              <label class="field__label" for="mem-title">Judul Kenangan</label>
              <input
                id="mem-title"
                v-model="title"
                class="field__input"
                type="text"
                placeholder="Contoh: Pertama kali ke kebun binatang"
                maxlength="80"
              />
            </div>

            <div class="field">
              <label class="field__label" for="mem-category">Kategori</label>
              <select id="mem-category" v-model="category" class="field__input">
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <div class="field">
              <label class="field__label" for="mem-summary">Keterangan Singkat</label>
              <input
                id="mem-summary"
                v-model="summary"
                class="field__input"
                type="text"
                placeholder="Satu kalimat yang menangkap momen ini."
                maxlength="140"
              />
            </div>

            <div class="field">
              <label class="field__label" for="mem-description">Cerita Lengkap</label>
              <textarea
                id="mem-description"
                v-model="description"
                class="field__input field__input--area"
                rows="4"
                placeholder="Tulis cerita lengkapnya di sini..."
              ></textarea>
            </div>

            <div class="field">
              <label class="field__label" for="mem-highlights">Poin Berkesan (pisahkan dengan koma)</label>
              <input
                id="mem-highlights"
                v-model="highlightsInput"
                class="field__input"
                type="text"
                placeholder="Kopi Susu, Senja, Jalan-jalan"
              />
            </div>

            <div class="field">
              <span class="field__label">Foto Kenangan</span>
              <label class="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                  hidden
                />
                <span v-if="!imageUrl" class="upload-box__placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
                    <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Pilih foto dari perangkat
                </span>
                <img v-else :src="imageUrl" alt="Pratinjau" class="upload-box__preview" />
              </label>
            </div>

            <div class="field">
              <span class="field__label">Gaya Bingkai</span>
              <div class="frame-styles">
                <button
                  v-for="style in ['classic', 'polaroid', 'wood']"
                  :key="style"
                  type="button"
                  class="frame-styles__opt"
                  :class="{ 'frame-styles__opt--active': frameStyle === style }"
                  @click="frameStyle = style"
                >
                  {{ style === 'classic' ? 'Klasik' : style === 'polaroid' ? 'Polaroid' : 'Kayu' }}
                </button>
              </div>
            </div>
          </div>

          <aside class="modal__preview">
            <span class="modal__preview-label">Pratinjau Langsung</span>
            <figure
              class="preview-frame"
              :class="`preview-frame--${frameStyle}`"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                :alt="previewTitle"
                class="preview-frame__img"
              />
              <div v-else class="preview-frame__empty">
                <span aria-hidden="true">♡</span>
                <span>Foto akan muncul di sini</span>
              </div>
          
            <figcaption class="preview-caption">
              <strong>{{ previewTitle }}</strong>
              <em>{{ previewCaption }}</em>
            </figcaption>
              </figure>
          </aside>
        </div>

        <p v-if="errorMessage" class="modal__error" role="alert">{{ errorMessage }}</p>

        <footer class="modal__footer">
          <BaseButton variant="ghost" size="md" @click="close">Batal</BaseButton>
          <BaseButton variant="primary" size="md" @click="handleSubmit">
            Simpan Kenangan
          </BaseButton>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: color-mix(in srgb, var(--color-neutral-950) 55%, transparent);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow-y: auto;
}

.modal {
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: scale-in var(--dur) var(--ease-out);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
}

.modal__title {
  font-size: var(--fs-2xl);
  margin: 0;
}

.modal__close {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
}

.modal__close:hover {
  background: var(--bg-muted);
  color: var(--text);
}

.modal__close svg {
  width: 20px;
  height: 20px;
}

.modal__body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--space-6);
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--text);
}

.field__input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--fs-base);
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.field__input::placeholder {
  color: var(--text-subtle);
}

.field__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: var(--shadow-glow);
}

.field__input--area {
  resize: vertical;
  min-height: 96px;
}

.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  min-height: 120px;
  padding: var(--space-4);
  border: 2px dashed var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: border-color var(--dur) var(--ease), color var(--dur) var(--ease), background var(--dur) var(--ease);
}

.upload-box:hover {
  border-color: var(--brand);
  color: var(--brand);
  background: var(--brand-soft);
}

.upload-box__placeholder {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.upload-box__preview {
  max-width: 100%;
  max-height: 220px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.frame-styles {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.frame-styles__opt {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-strong);
  background: transparent;
  color: var(--text-muted);
  font-weight: var(--fw-medium);
  font-size: var(--fs-sm);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.frame-styles__opt:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.frame-styles__opt--active {
  background: var(--brand);
  color: var(--brand-contrast);
  border-color: var(--brand);
}

/* ---- Preview pane ---- */
.modal__preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-muted);
  border-radius: var(--radius-lg);
  height: fit-content;
}

.modal__preview-label {
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
}

.preview-frame {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  display: grid;
  place-items: center;
}

.preview-frame__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-frame__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-subtle);
  font-size: var(--fs-xs);
  text-align: center;
  padding: var(--space-3);
}

.preview-frame__empty span:first-child {
  font-size: var(--fs-2xl);
  color: var(--brand);
}

.preview-frame--classic {
  padding: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
}
.preview-frame--classic .preview-frame__img {
  border: 2px solid var(--color-accent-300);
}

.preview-frame--polaroid {
  background: var(--color-neutral-0);
  padding: 8px 8px 24px;
  transform: rotate(-1.5deg);
}

.preview-frame--wood {
  padding: 10px;
  background: linear-gradient(135deg, #6b4a2b, #4a3018);
  border: 2px solid #2e1d0f;
}

.preview-caption {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.preview-caption strong {
  font-family: var(--font-display);
  font-size: var(--fs-sm);
  color: var(--text);
}

.preview-caption em {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  font-style: italic;
}

.modal__error {
  padding: var(--space-3) var(--space-6);
  margin: 0;
  color: var(--color-error-700);
  background: var(--color-error-50);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-6);
  border-top: 1px solid var(--border);
}

/* ---- Transition ---- */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--dur) var(--ease);
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.96);
}

@media (max-width: 768px) {
  .modal__body {
    grid-template-columns: 1fr;
  }
  .modal__preview {
    order: -1;
  }
}

@media (max-width: 400px) {
  .modal-overlay {
    padding: 0;
  }
  .modal {
    max-height: 100vh;
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
  }
  .modal__header {
    padding: var(--space-4);
  }
  .modal__title {
    font-size: var(--fs-xl);
  }
  .modal__body {
    padding: var(--space-4);
    gap: var(--space-4);
  }
  .modal__footer {
    padding: var(--space-4);
  }
  .modal__footer .base-btn {
    flex: 1;
  }
}
</style>
