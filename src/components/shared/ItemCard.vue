<script setup>
import { computed } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import { useFavoritesStore } from '../../stores/useFavoritesStore';

const props = defineProps({
  item: { type: Object, required: true },
  showFavorite: { type: Boolean, default: true },
});

const favorites = useFavoritesStore();

const isFav = computed(() => favorites.isFavorite(props.item.id));

function toggleFav() {
  favorites.toggle(props.item.id);
}

const categoryIcon = {
  'First Times': '✨',
  Travel: '✈',
  Milestones: '★',
  'Date Night': '♥',
  'Open When': '✉',
};
</script>

<template>
  <BaseCard class="item-card" :hover="true" padding="none">
    <router-link :to="`/explore/${item.slug}`" class="item-card__link">
      <div class="item-card__media">
        <img
          :src="item.imageUrl"
          :alt="item.title"
          class="item-card__img"
          loading="lazy"
        />
        <span class="item-card__category">
          <span aria-hidden="true">{{ categoryIcon[item.category] || '♡' }}</span>
          {{ item.category }}
        </span>
        <button
          v-if="showFavorite"
          class="item-card__fav"
          :class="{ 'item-card__fav--active': isFav }"
          type="button"
          :aria-label="isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'"
          @click.prevent="toggleFav"
        >
          <svg viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="item-card__body">
        <h3 class="item-card__title">{{ item.title }}</h3>
        <p class="item-card__summary">{{ item.summary }}</p>
        <div class="item-card__highlights" v-if="item.highlights && item.highlights.length">
          <span
            v-for="tag in item.highlights.slice(0, 3)"
            :key="tag"
            class="item-card__tag"
          >
            {{ tag }}
          </span>
        </div>
        <span class="item-card__cta">Lihat kenangan →</span>
      </div>
    </router-link>
  </BaseCard>
</template>

<style scoped>
.item-card {
  height: 100%;
}

.item-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.item-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.item-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease);
}

.item-card__link:hover .item-card__img {
  transform: scale(1.06);
}

.item-card__category {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--bg-elevated) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--text);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  box-shadow: var(--shadow-xs);
}

.item-card__fav {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--bg-elevated) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  transition: all var(--dur) var(--ease);
  box-shadow: var(--shadow-xs);
}

.item-card__fav svg {
  width: 20px;
  height: 20px;
  transition: transform var(--dur) var(--ease);
}

.item-card__fav:hover {
  color: var(--brand);
  transform: scale(1.1);
}

.item-card__fav:hover svg {
  transform: scale(1.15);
}

.item-card__fav--active {
  color: var(--brand);
  background: var(--brand-soft);
}

.item-card__fav--active svg {
  animation: scale-in var(--dur) var(--ease-out);
}

.item-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  flex: 1;
}

.item-card__title {
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  font-weight: var(--fw-semibold);
  margin: 0;
  color: var(--text);
}

.item-card__summary {
  font-size: var(--fs-sm);
  color: var(--text-muted);
  margin: 0;
  line-height: var(--lh-body);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.item-card__tag {
  font-size: var(--fs-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--bg-muted);
  color: var(--text-muted);
  font-weight: var(--fw-medium);
}

.item-card__cta {
  margin-top: auto;
  padding-top: var(--space-3);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--brand);
  transition: transform var(--dur) var(--ease);
}

.item-card__link:hover .item-card__cta {
  transform: translateX(3px);
}

@media (max-width: 400px) {
  .item-card__title {
    font-size: var(--fs-lg);
  }
  .item-card__body {
    padding: var(--space-4);
  }
  .item-card__fav {
    width: 34px;
    height: 34px;
  }
  .item-card__fav svg {
    width: 18px;
    height: 18px;
  }
}
</style>
