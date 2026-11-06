<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { useItemFilter } from '../composables/useItemFilter';
import { categories } from '../data/items.js';
import BaseButton from '../components/base/BaseButton.vue';
import SearchBar from '../components/shared/SearchBar.vue';
import ItemCard from '../components/shared/ItemCard.vue';
import EmptyState from '../components/shared/EmptyState.vue';
import AddMemoryModal from '../components/shared/AddMemoryModal.vue';

const store = useStore();
const favorites = useFavoritesStore();

const allItems = computed(() => store.getters.allItems);
const source = computed(() => allItems.value);

const {
  filtered,
  query,
  activeCategory,
  setSearch,
  setCategory,
  reset,
} = useItemFilter(source, 'All');

const showFavoritesOnly = ref(false);

const visibleItems = computed(() => {
  if (!showFavoritesOnly.value) return filtered.value;
  return filtered.value.filter((item) => favorites.isFavorite(item.id));
});

const categoryTabs = computed(() => ['All', ...categories]);

const favoritesCount = computed(() => favorites.count);

const isFiltering = computed(
  () =>
    query.value.trim() !== '' ||
    activeCategory.value !== 'All' ||
    showFavoritesOnly.value
);

function clearFilters() {
  reset();
  showFavoritesOnly.value = false;
}

/* ---- Add Memory Modal ---- */
const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}
function onAdded(memory) {
  // Optionally navigate to detail after adding
  // For now keep on explore page; toast-like feedback via scroll
  // eslint-disable-next-line no-console
  console.info('Kenangan baru ditambahkan:', memory.slug);
}

/* ---- Live URL query sync (optional, lightweight) ---- */
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

watch(
  () => route.query.q,
  (q) => {
    if (typeof q === 'string' && q !== query.value) {
      setSearch(q);
    }
  },
  { immediate: true }
);

watch(query, (q) => {
  if (q !== (route.query.q || '')) {
    router.replace({ query: q ? { q } : {} });
  }
});
</script>

<template>
  <div class="explore">
    <section class="explore__header">
      <div class="container">
        <span class="explore__eyebrow">Katalog Kenangan</span>
        <h1 class="explore__title">Jelajah setiap momen, satu per satu</h1>
        <p class="explore__lead">
          Cari berdasarkan judul, cerita, atau tag. Saring berdasarkan kategori.
          Gabungkan keduanya untuk menemukan kenangan spesifik yang kamu cari.
        </p>
      </div>
    </section>

    <section class="explore__controls">
      <div class="container explore__controls-inner">
        <SearchBar
          :model-value="query"
          placeholder="Cari judul, cerita, atau tag..."
          @update:model-value="setSearch"
        />

        <div class="explore__chips">
          <button
            v-for="cat in categoryTabs"
            :key="cat"
            type="button"
            class="chip"
            :class="{ 'chip--active': activeCategory === cat }"
            @click="setCategory(cat)"
          >
            {{ cat === 'All' ? 'Semua' : cat }}
          </button>
        </div>

        <div class="explore__actions">
          <button
            type="button"
            class="fav-toggle"
            :class="{ 'fav-toggle--active': showFavoritesOnly }"
            @click="showFavoritesOnly = !showFavoritesOnly"
          >
            <svg viewBox="0 0 24 24" :fill="showFavoritesOnly ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z" stroke-linejoin="round" />
            </svg>
            <span>Favorit</span>
            <span class="fav-toggle__badge" v-if="favoritesCount">{{ favoritesCount }}</span>
          </button>
          <BaseButton variant="primary" size="md" @click="openModal">
            <span aria-hidden="true">+</span> Tambah Kenangan
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="explore__results">
      <div class="container">
        <div class="explore__meta">
          <span>
            Menampilkan <strong>{{ visibleItems.length }}</strong> kenangan
            <template v-if="activeCategory !== 'All'">
              · kategori <strong>{{ activeCategory }}</strong>
            </template>
          </span>
          <button
            v-if="isFiltering"
            type="button"
            class="reset-btn"
            @click="clearFilters"
          >
            Reset filter
          </button>
        </div>

        <div v-if="visibleItems.length" class="explore__grid">
          <ItemCard v-for="item in visibleItems" :key="item.id" :item="item" />
        </div>

        <EmptyState
          v-else
          :icon="showFavoritesOnly ? 'star' : 'search'"
          :title="showFavoritesOnly ? 'Belum ada favorit' : 'Tidak ada kenangan yang cocok'"
          :message="showFavoritesOnly
            ? 'Tandai kenangan dengan hati untuk menyimpannya di sini.'
            : 'Coba kata kunci lain atau ganti kategori.'"
        >
          <BaseButton v-if="isFiltering" variant="outline" size="md" @click="clearFilters">
            Reset filter
          </BaseButton>
        </EmptyState>
      </div>
    </section>

    <AddMemoryModal v-model="modalOpen" @added="onAdded" />
  </div>
</template>

<style scoped>
.explore__header {
  padding-block: var(--space-16) var(--space-8);
  text-align: center;
}

.explore__eyebrow {
  display: block;
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.explore__title {
  font-size: var(--fs-4xl);
  margin: 0 0 var(--space-3);
}

.explore__lead {
  color: var(--text-muted);
  max-width: 56ch;
  margin: 0 auto;
}

.explore__controls {
  position: sticky;
  top: var(--header-h);
  z-index: var(--z-base);
  padding-block: var(--space-4);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-block: 1px solid var(--border);
}

.explore__controls-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.explore__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
}

.chip {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-strong);
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.chip:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.chip--active {
  background: var(--brand);
  color: var(--brand-contrast);
  border-color: var(--brand);
  box-shadow: var(--shadow-sm);
}

.explore__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
}

.fav-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-strong);
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.fav-toggle svg {
  width: 18px;
  height: 18px;
}

.fav-toggle:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.fav-toggle--active {
  background: var(--brand-soft);
  color: var(--brand);
  border-color: var(--brand);
}

.fav-toggle__badge {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: var(--radius-full);
  background: var(--brand);
  color: var(--brand-contrast);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.explore__results {
  padding-block: var(--space-8) var(--space-16);
}

.explore__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-6);
  font-size: var(--fs-sm);
  color: var(--text-muted);
}

.explore__meta strong {
  color: var(--text);
}

.reset-btn {
  color: var(--brand);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.reset-btn:hover {
  color: var(--brand-hover);
}

.explore__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .explore__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .explore__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .explore__header {
    padding-block: var(--space-10) var(--space-6);
  }
  .explore__title {
    font-size: var(--fs-3xl);
  }
  .explore__controls {
    padding-block: var(--space-3);
  }
  .chip {
    font-size: var(--fs-xs);
    padding: var(--space-2) var(--space-3);
  }
  .fav-toggle {
    font-size: var(--fs-xs);
    padding: var(--space-2) var(--space-3);
  }
  .explore__grid {
    gap: var(--space-4);
  }
}
</style>
