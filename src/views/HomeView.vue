<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../components/base/BaseButton.vue';
import ItemCard from '../components/shared/ItemCard.vue';
import EmptyState from '../components/shared/EmptyState.vue';

const store = useStore();

const highlights = computed(() => store.getters.highlightItems);
const totalMemories = computed(() => store.getters.allItems.length);

/* ---- Real-time count-up: relationship duration ---- */
const RELATIONSHIP_START = new Date('2023-11-14T19:00:00');

const years = ref(0);
const months = ref(0);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let intervalId = null;

function tick() {
  const now = new Date();
  let diffMs = now - RELATIONSHIP_START;
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  seconds.value = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  minutes.value = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  hours.value = totalHours % 24;

  const approxDays = Math.floor(totalHours / 24);
  years.value = Math.floor(approxDays / 365);
  const remainingAfterYears = approxDays - years.value * 365;
  months.value = Math.floor(remainingAfterYears / 30);
  days.value = remainingAfterYears - months.value * 30;
}

tick();
intervalId = setInterval(tick, 1000);

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});

const statUnits = computed(() => [
  { label: 'Tahun', value: years.value },
  { label: 'Bulan', value: months.value },
  { label: 'Hari', value: days.value },
  { label: 'Jam', value: hours.value },
  { label: 'Menit', value: minutes.value },
  { label: 'Detik', value: seconds.value },
]);
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="container hero__inner">
        <span class="hero__eyebrow">Kapsul Waktu Digital</span>
        <h1 class="hero__title">
          Setiap kenangan kita,<br />
          <em>tersimpan rapi</em> dalam satu kotak.
        </h1>
        <p class="hero__lead">
          Digital Memory Box adalah tempat kami mengumpulkan momen-momen kecil yang
          ternyata besar maknanya — kopi pertama, senja pertama, dan semua yang
          datang sesudahnya.
        </p>
        <div class="hero__actions">
          <BaseButton to="/explore" variant="primary" size="lg">
            Buka Kotak Kenangan
          </BaseButton>
          <BaseButton to="/about" variant="outline" size="lg">
            Kisah Kita
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Count-up timer -->
    <section class="section timer-section">
      <div class="container">
        <span class="timer-section__label">Sudah bersama selama</span>
        <h2 class="timer-section__title">Hitung mundur yang tidak pernah berhenti</h2>
        <div class="timer" role="timer" aria-live="polite">
          <div
            v-for="unit in statUnits"
            :key="unit.label"
            class="timer__unit"
          >
            <span class="timer__value">{{ String(unit.value).padStart(2, '0') }}</span>
            <span class="timer__label">{{ unit.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="section highlights">
      <div class="container">
        <span class="highlights__eyebrow">Momen Pilihan</span>
        <h2 class="section-title">Kenangan yang paling sering kami buka</h2>
        <p class="section-subtitle">
          Tiga momen yang kami simpan paling dekat — yang kalau kangen, kami balik
          lagi ke sini.
        </p>

        <div v-if="highlights.length" class="highlights__grid">
          <ItemCard
            v-for="item in highlights"
            :key="item.id"
            :item="item"
            class="animate-fade-up"
          />
        </div>
        <EmptyState
          v-else
          title="Belum ada momen pilihan"
          message="Kenanganmu akan muncul di sini begitu ditambahkan."
        />
      </div>
    </section>

    <!-- Stats strip -->
    <section class="section stats-strip">
      <div class="container stats-strip__inner">
        <div class="stats-strip__item">
          <span class="stats-strip__value">{{ totalMemories }}</span>
          <span class="stats-strip__label">Kenangan Tersimpan</span>
        </div>
        <div class="stats-strip__item">
          <span class="stats-strip__value">5</span>
          <span class="stats-strip__label">Kategori Cerita</span>
        </div>
        <div class="stats-strip__item">
          <span class="stats-strip__value">∞</span>
          <span class="stats-strip__label">Waktu Bersama</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: var(--space-24) var(--space-20);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 15% 20%, var(--color-primary-100), transparent 45%),
    radial-gradient(circle at 85% 80%, var(--color-secondary-100), transparent 45%),
    radial-gradient(circle at 50% 50%, var(--color-accent-50), transparent 60%);
  opacity: 0.9;
}

.hero__inner {
  text-align: center;
  max-width: var(--container-narrow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.hero__eyebrow {
  display: inline-block;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--brand-soft);
  color: var(--brand);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero__title {
  font-size: var(--fs-5xl);
  font-weight: var(--fw-bold);
  line-height: var(--lh-tight);
  margin: 0;
}

.hero__title em {
  color: var(--brand);
  font-style: italic;
}

.hero__lead {
  font-size: var(--fs-lg);
  color: var(--text-muted);
  max-width: 54ch;
  margin: 0;
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-4);
}

/* ---- Timer ---- */
.timer-section {
  padding-block: var(--space-12);
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-muted) 100%);
}

.timer-section__label {
  display: block;
  text-align: center;
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.timer-section__title {
  text-align: center;
  font-size: var(--fs-2xl);
  color: var(--text);
  margin-bottom: var(--space-8);
}

.timer {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-3);
  max-width: 640px;
  margin-inline: auto;
}

.timer__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-2);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur) var(--ease);
}

.timer__unit:hover {
  transform: translateY(-3px);
}

.timer__value {
  font-family: var(--font-display);
  font-size: var(--fs-3xl);
  font-weight: var(--fw-bold);
  color: var(--brand);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.timer__label {
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ---- Highlights ---- */
.highlights__eyebrow {
  display: block;
  text-align: center;
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.highlights__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-8);
}

/* ---- Stats strip ---- */
.stats-strip {
  padding-block: var(--space-8);
}

.stats-strip__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--brand);
  border-radius: var(--radius-xl);
  color: var(--brand-contrast);
  text-align: center;
}

.stats-strip__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stats-strip__value {
  font-family: var(--font-display);
  font-size: var(--fs-4xl);
  font-weight: var(--fw-bold);
  line-height: 1;
}

.stats-strip__label {
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .timer {
    grid-template-columns: repeat(3, 1fr);
  }
  .highlights__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .hero {
    padding-block: var(--space-16) var(--space-12);
  }
  .hero__title {
    font-size: var(--fs-4xl);
  }
  .hero__lead {
    font-size: var(--fs-base);
  }
  .timer {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2);
  }
  .timer__value {
    font-size: var(--fs-2xl);
  }
  .timer-section__title {
    font-size: var(--fs-xl);
  }
  .stats-strip__value {
    font-size: var(--fs-3xl);
  }
  .highlights__grid {
    gap: var(--space-4);
  }
}
</style>
