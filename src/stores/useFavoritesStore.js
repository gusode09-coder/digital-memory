/* Pinia store — Favorites (auto-persisted via localStorage) */
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const STORAGE_KEY = 'dmb_favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(loadFavorites());

  const count = computed(() => favorites.value.length);

  function isFavorite(id) {
    return favorites.value.includes(id);
  }

  function toggle(id) {
    const index = favorites.value.indexOf(id);
    if (index === -1) {
      favorites.value.push(id);
    } else {
      favorites.value.splice(index, 1);
    }
  }

  function clear() {
    favorites.value = [];
  }

  // Auto-persist on any change
  watch(
    favorites,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      } catch {
        /* storage unavailable — ignore */
      }
    },
    { deep: true }
  );

  return {
    favorites,
    count,
    isFavorite,
    toggle,
    clear,
  };
});
