<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import BaseButton from '../components/base/BaseButton.vue';
import PhotoFrame from '../components/shared/PhotoFrame.vue';
import EmptyState from '../components/shared/EmptyState.vue';
import ItemCard from '../components/shared/ItemCard.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const favorites = useFavoritesStore();

const slug = computed(() => route.params.slug);

const item = computed(() => store.getters.itemBySlug(slug.value));

const isFav = computed(() => (item.value ? favorites.isFavorite(item.value.id) : false));

function toggleFav() {
  if (item.value) favorites.toggle(item.value.id);
}

/* ---- Related memories (same category, excluding current) ---- */
const related = computed(() => {
  if (!item.value) return [];
  return store.getters.allItems
    .filter((i) => i.category === item.value.category && i.id !== item.value.id)
    .slice(0, 3);
});

/* ---- Frame style picker on detail ---- */
const frameStyles = ['classic', 'polaroid', 'wood'];
const frameLabels = { classic: 'Klasik', polaroid: 'Polaroid', wood: 'Kayu' };
const activeFrame = ref('polaroid');

watch(
  slug,
  () => {
    activeFrame.value = 'polaroid';
  },
  { immediate: true }
);

/* ---- If slug invalid, stay on page but show empty state (router fallback handles wildcard) ---- */
onUnmounted(() => {});
</script>

<template>
  <div class="detail">
    <template v-if="item">
      <section class="detail__hero">
        <div class="container detail__hero-inner">
          <nav class="breadcrumb" aria-label="breadcrumb">
            <router-link to="/explore">Jelajah</router-link>
            <span aria-hidden="true">/</span>
            <span class="breadcrumb__current">{{ item.title }}</span>
          </nav>

          <span class="detail__category">{{ item.category }}</span>
          <h1 class="detail__title">{{ item.title }}</h1>
          <p class="detail__summary">{{ item.summary }}</p>

          <div class="detail__actions">
            <button
              type="button"
              class="fav-btn"
              :class="{ 'fav-btn--active': isFav }"
              @click="toggleFav"
            >
              <svg viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z" stroke-linejoin="round" />
              </svg>
              <span>{{ isFav ? 'Ada di Favorit' : 'Tambah ke Favorit' }}</span>
            </button>
            <BaseButton variant="ghost" size="md" @click="router.push('/explore')">
              ← Kembali ke Jelajah
            </BaseButton>
          </div>
        </div>
      </section>

      <section class="detail__frame-section">
        <div class="container detail__frame-inner">
          <div class="frame-controls">
            <span class="frame-controls__label">Gaya Bingkai</span>
            <div class="frame-controls__opts">
              <button
                v-for="style in frameStyles"
                :key="style"
                type="button"
                class="frame-opt"
                :class="{ 'frame-opt--active': activeFrame === style }"
                @click="activeFrame = style"
              >
                {{ frameLabels[style] }}
              </button>
            </div>
          </div>

          <PhotoFrame
            :image-url="item.imageUrl"
            :title="item.title"
            :caption="item.summary"
            :frame-style="activeFrame"
            class="detail__frame"
          />
        </div>
      </section>

      <section class="detail__story">
        <div class="container detail__story-inner">
          <h2 class="detail__story-title">Cerita Lengkap</h2>
          <p class="detail__story-text">{{ item.description }}</p>

          <div class="detail__highlights" v-if="item.highlights && item.highlights.length">
            <h3 class="detail__highlights-title">Poin Berkesan</h3>
            <ul class="highlights-list">
              <li v-for="tag in item.highlights" :key="tag" class="highlights-list__item">
                <span class="highlights-list__dot" aria-hidden="true">♡</span>
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="related.length" class="detail__related">
        <div class="container">
          <h2 class="section-title">Kenangan Serupa</h2>
          <p class="section-subtitle">
            Momen lain dalam kategori <strong>{{ item.category }}</strong>.
          </p>
          <div class="detail__related-grid">
            <ItemCard v-for="r in related" :key="r.id" :item="r" />
          </div>
        </div>
      </section>
    </template>

    <section v-else class="detail__missing">
      <div class="container">
        <EmptyState
          icon="search"
          title="Kenangan tidak ditemukan"
          message="Mungkin sudah lama, mungkin belum dibuat. Coba kembali ke Jelajah."
        >
          <BaseButton to="/explore" variant="primary" size="md">
            Kembali ke Jelajah
          </BaseButton>
        </EmptyState>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail__hero {
  padding-block: var(--space-12) var(--space-8);
  background: linear-gradient(180deg, var(--brand-soft) 0%, transparent 100%);
  text-align: center;
}

.detail__hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--fs-sm);
  color: var(--text-muted);
}

.breadcrumb a {
  color: var(--brand);
}

.breadcrumb__current {
  color: var(--text);
  font-weight: var(--fw-medium);
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail__category {
  display: inline-block;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  color: var(--brand);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid var(--border);
}

.detail__title {
  font-size: var(--fs-4xl);
  margin: var(--space-2) 0 0;
  max-width: 18ch;
}

.detail__summary {
  font-size: var(--fs-lg);
  color: var(--text-muted);
  max-width: 52ch;
  margin: 0;
}

.detail__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-4);
}

.fav-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  color: var(--text-muted);
  border: 1px solid var(--border-strong);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}

.fav-btn svg {
  width: 20px;
  height: 20px;
  transition: transform var(--dur) var(--ease);
}

.fav-btn:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.fav-btn:hover svg {
  transform: scale(1.15);
}

.fav-btn--active {
  background: var(--brand-soft);
  color: var(--brand);
  border-color: var(--brand);
}

/* ---- Frame ---- */
.detail__frame-section {
  padding-block: var(--space-8);
}

.detail__frame-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.frame-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.frame-controls__label {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.frame-controls__opts {
  display: flex;
  gap: var(--space-2);
}

.frame-opt {
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

.frame-opt:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.frame-opt--active {
  background: var(--brand);
  color: var(--brand-contrast);
  border-color: var(--brand);
}

.detail__frame {
  max-width: 480px;
}

/* ---- Story ---- */
.detail__story {
  padding-block: var(--space-10) var(--space-16);
}

.detail__story-inner {
  max-width: var(--container-narrow);
}

.detail__story-title {
  font-size: var(--fs-2xl);
  margin-bottom: var(--space-4);
}

.detail__story-text {
  font-size: var(--fs-lg);
  line-height: var(--lh-body);
  color: var(--text);
  white-space: pre-line;
}

.detail__highlights {
  margin-top: var(--space-8);
  padding: var(--space-6);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.detail__highlights-title {
  font-size: var(--fs-xl);
  margin-bottom: var(--space-4);
}

.highlights-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.highlights-list__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--fs-base);
  color: var(--text);
}

.highlights-list__dot {
  color: var(--brand);
  font-size: var(--fs-sm);
}

/* ---- Related ---- */
.detail__related {
  padding-block: var(--space-12);
  background: var(--bg-muted);
}

.detail__related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* ---- Missing ---- */
.detail__missing {
  padding-block: var(--space-20);
}

@media (max-width: 768px) {
  .detail__related-grid {
    grid-template-columns: 1fr;
  }
  .highlights-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .detail__hero {
    padding-block: var(--space-8) var(--space-6);
  }
  .detail__title {
    font-size: var(--fs-3xl);
  }
  .detail__summary {
    font-size: var(--fs-base);
  }
  .detail__story-text {
    font-size: var(--fs-base);
  }
  .frame-opt {
    font-size: var(--fs-xs);
    padding: var(--space-2) var(--space-3);
  }
  .detail__highlights {
    padding: var(--space-4);
  }
}
</style>
