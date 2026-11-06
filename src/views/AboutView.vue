<script setup>
import { ref, onMounted } from 'vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';

const NOTE_KEY = 'dmb_our_notes';

const notes = ref([]);

function loadNotes() {
  try {
    const raw = localStorage.getItem(NOTE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) notes.value = parsed;
  } catch {
    /* ignore */
  }
}

function saveNotes() {
  try {
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes.value));
  } catch {
    /* ignore */
  }
}

loadNotes();

const newNote = ref('');
const author = ref('Kita');

function addNote() {
  const text = newNote.value.trim();
  if (!text) return;
  notes.value.unshift({
    id: `note-${Date.now()}`,
    text,
    author: author.value,
    date: new Date().toISOString(),
  });
  newNote.value = '';
  saveNotes();
}

function deleteNote(id) {
  notes.value = notes.value.filter((n) => n.id !== id);
  saveNotes();
}

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

onMounted(() => {});

const partners = [
  {
    initials: 'A',
    name: 'Si A',
    role: 'Kreator & Pengelola',
    tagline: 'Yang suka nyatet momen kecil biar gak lupa.',
    color: 'var(--color-primary-500)',
  },
  {
    initials: 'B',
    name: 'Si B',
    role: 'Penikmat Utama',
    tagline: 'Yang buka kotak kenangan tiap kangen.',
    color: 'var(--color-secondary-500)',
  },
];

const timeline = [
  { year: '2023', text: 'Pertama kali ngobrol di kedai kopi sampai tutup.' },
  { year: '2024', text: 'Liburan pertama bareng, senja di tepi laut.' },
  { year: '2024', text: 'Anniversary ke-1, kue dengan tulisan salah eja.' },
  { year: '2025', text: 'Buka surat pertama, dan masih terus jalan.' },
];
</script>

<template>
  <div class="about">
    <!-- Hero -->
    <section class="about__hero">
      <div class="container">
        <span class="about__eyebrow">Kisah Kita</span>
        <h1 class="about__title">Bukan cerita paling sempurna,<br />tapi paling kita.</h1>
        <p class="about__lead">
          Halaman ini adalah tempat kami berkenalan dengan diri sendiri — sebagai
          pasangan dan sebagai individu yang menyimpan kenangan satu sama lain.
        </p>
      </div>
    </section>

    <!-- Partner profiles -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Kita Berdua</h2>
        <p class="section-subtitle">
          Dua peran yang sama pentingnya — satu yang merawat arsip, satu yang
          menikmati isinya.
        </p>
        <div class="partners">
          <BaseCard
            v-for="p in partners"
            :key="p.name"
            padding="lg"
            class="partner-card"
          >
            <div class="partner-card__avatar" :style="{ background: p.color }">
              {{ p.initials }}
            </div>
            <h3 class="partner-card__name">{{ p.name }}</h3>
            <span class="partner-card__role">{{ p.role }}</span>
            <p class="partner-card__tagline">{{ p.tagline }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- How we started -->
    <section class="section about__story-section">
      <div class="container about__story-inner">
        <span class="about__eyebrow">Cerita Jadian</span>
        <h2 class="about__story-title">Dari secangkir kopi susu, sampai di sini</h2>
        <p class="about__story-text">
          Semua bermula dari satu kedai kopi kecil. Satu meja dekat jendela, dua
          cangkir, dan obrolan yang ngalir tanpa sadar. Kami nggak tahu kapan
          persisnya status berubah — tapi kami tahu malam itu, saat kedai tutup
          dan kami masih belum mau pulang, sesuatu sudah berubah.
        </p>
        <p class="about__story-text">
          Sejak itu, kami bersepakat untuk nyatet setiap momen kecil. Bukan karena
          takut lupa, tapi karena kami tahu momen-momen kecil inilah yang nanti
          kami rindukan. Digital Memory Box ini hadir untuk hal itu — kapsul
          waktu digital yang kami buka tiap kangen.
        </p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section about__timeline-section">
      <div class="container">
        <h2 class="section-title">Garis Waktu</h2>
        <p class="section-subtitle">
          Titik-titik kecil yang kalau dirangkai, jadi cerita utuh.
        </p>
        <ol class="timeline">
          <li
            v-for="(point, i) in timeline"
            :key="i"
            class="timeline__item"
          >
            <span class="timeline__year">{{ point.year }}</span>
            <span class="timeline__dot" aria-hidden="true"></span>
            <span class="timeline__text">{{ point.text }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- Interactive notes -->
    <section class="section about__notes-section">
      <div class="container about__notes-inner">
        <span class="about__eyebrow">Catatan untuk Masa Depan</span>
        <h2 class="about__notes-title">Harapan yang kami tulis hari ini</h2>
        <p class="section-subtitle">
          Tulis harapan, janji, atau sekadar hal yang ingin kamu ingat nanti.
          Catatan ini tersimpan di perangkatmu.
        </p>

        <BaseCard padding="lg" class="notes-form">
          <div class="notes-form__row">
            <select v-model="author" class="notes-form__select" aria-label="Penulis">
              <option value="Kita">Kita</option>
              <option value="Si A">Si A</option>
              <option value="Si B">Si B</option>
            </select>
            <input
              v-model="newNote"
              type="text"
              class="notes-form__input"
              placeholder="Tulis harapan untuk masa depan..."
              maxlength="160"
              @keyup.enter="addNote"
            />
            <BaseButton variant="primary" size="md" @click="addNote">Tambah</BaseButton>
          </div>
        </BaseCard>

        <div v-if="notes.length" class="notes-list">
          <BaseCard
            v-for="note in notes"
            :key="note.id"
            padding="md"
            class="note-item"
          >
            <p class="note-item__text">{{ note.text }}</p>
            <div class="note-item__meta">
              <span class="note-item__author">{{ note.author }}</span>
              <span class="note-item__date">{{ formatDate(note.date) }}</span>
              <button
                type="button"
                class="note-item__delete"
                aria-label="Hapus catatan"
                @click="deleteNote(note.id)"
              >
                Hapus
              </button>
            </div>
          </BaseCard>
        </div>
        <p v-else class="notes-empty">Belum ada catatan. Yuk tulis yang pertama.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__hero {
  padding-block: var(--space-20) var(--space-12);
  text-align: center;
  background: linear-gradient(180deg, var(--brand-soft), transparent);
}

.about__eyebrow {
  display: block;
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.about__title {
  font-size: var(--fs-4xl);
  margin: 0 0 var(--space-3);
}

.about__lead {
  color: var(--text-muted);
  max-width: 54ch;
  margin: 0 auto;
}

/* Partners */
.partners {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  max-width: 640px;
  margin: var(--space-8) auto 0;
}

.partner-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.partner-card__avatar {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--color-neutral-0);
  font-family: var(--font-display);
  font-size: var(--fs-2xl);
  font-weight: var(--fw-bold);
  margin-bottom: var(--space-2);
}

.partner-card__name {
  font-size: var(--fs-xl);
  margin: 0;
}

.partner-card__role {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--brand);
}

.partner-card__tagline {
  color: var(--text-muted);
  font-size: var(--fs-sm);
  margin: 0;
}

/* Story */
.about__story-section {
  padding-block: var(--space-12);
}

.about__story-inner {
  max-width: var(--container-narrow);
  text-align: center;
}

.about__story-title {
  font-size: var(--fs-2xl);
  margin-bottom: var(--space-4);
}

.about__story-text {
  font-size: var(--fs-lg);
  line-height: var(--lh-body);
  color: var(--text);
  text-align: left;
  margin-bottom: var(--space-4);
}

/* Timeline */
.about__timeline-section {
  padding-block: var(--space-12);
  background: var(--bg-muted);
}

.timeline {
  list-style: none;
  max-width: var(--container-narrow);
  margin: var(--space-8) auto 0;
  position: relative;
  padding-left: var(--space-8);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: var(--border-strong);
}

.timeline__item {
  position: relative;
  padding: var(--space-3) 0 var(--space-6);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
  align-items: start;
}

.timeline__year {
  font-family: var(--font-display);
  font-weight: var(--fw-bold);
  font-size: var(--fs-lg);
  color: var(--brand);
  min-width: 64px;
}

.timeline__dot {
  position: absolute;
  left: -28px;
  top: 14px;
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  background: var(--brand);
  border: 3px solid var(--bg-elevated);
  box-shadow: 0 0 0 2px var(--brand);
}

.timeline__text {
  color: var(--text);
  font-size: var(--fs-base);
  padding-top: var(--space-1);
}

/* Notes */
.about__notes-section {
  padding-block: var(--space-12);
}

.about__notes-inner {
  max-width: var(--container-narrow);
  text-align: center;
}

.about__notes-title {
  font-size: var(--fs-2xl);
  margin-bottom: var(--space-3);
}

.notes-form {
  text-align: left;
  margin: var(--space-6) auto;
}

.notes-form__row {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  flex-wrap: wrap;
}

.notes-form__select,
.notes-form__input {
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--fs-base);
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.notes-form__select {
  flex: 0 0 auto;
}

.notes-form__input {
  flex: 1;
  min-width: 200px;
}

.notes-form__select:focus,
.notes-form__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: var(--shadow-glow);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  text-align: left;
  margin-top: var(--space-6);
}

.note-item {
  animation: fade-up var(--dur) var(--ease-out) both;
}

.note-item__text {
  font-size: var(--fs-base);
  color: var(--text);
  margin: 0 0 var(--space-2);
  font-style: italic;
}

.note-item__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--fs-xs);
  color: var(--text-subtle);
}

.note-item__author {
  font-weight: var(--fw-semibold);
  color: var(--brand);
}

.note-item__delete {
  margin-left: auto;
  color: var(--color-error-500);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.note-item__delete:hover {
  color: var(--color-error-700);
}

.notes-empty {
  color: var(--text-muted);
  font-style: italic;
  margin-top: var(--space-6);
}

@media (max-width: 600px) {
  .partners {
    grid-template-columns: 1fr;
  }
  .notes-form__row .base-btn {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .about__hero {
    padding-block: var(--space-12) var(--space-8);
  }
  .about__title {
    font-size: var(--fs-3xl);
  }
  .about__story-text {
    font-size: var(--fs-base);
  }
  .notes-form__row {
    flex-direction: column;
    align-items: stretch;
  }
  .notes-form__select,
  .notes-form__input {
    width: 100%;
  }
  .timeline {
    padding-left: var(--space-6);
  }
  .timeline__dot {
    left: -22px;
  }
}
</style>
