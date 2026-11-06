# Digital Memory Box for Partner

Kapsul waktu digital estetik untuk menyimpan, mengorganisir, dan mengenang perjalanan hubungan secara terstruktur. Dibangun untuk pasangan (penikmat konten) & diri sendiri (kreator/pengelola konten).

Teknologi: **Vue 3 + Vite**, JavaScript, Composition API (`<script setup>`), **Vue Router 4**, **Vuex 4**, **Pinia**, dan **plain CSS** (tanpa Tailwind, tanpa TypeScript, tanpa backend/database).

---

## Instalasi

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi
npm run preview  # pratinjau hasil build
```

---

## Struktur Folder

```
src/
├── main.js                        # Entry: mendaftarkan Pinia, Vuex, Router
├── App.vue                        # Shell: header + <router-view> + footer
├── style.css                      # Import tokens + reset global
├── assets/
│   └── styles/
│       └── tokens.css             # Design tokens (warna, tipografi, spacing, shadow)
├── router/
│   └── index.js                   # Route contract (hash history)
├── store/
│   └── index.js                   # Vuex: daftar memori (+ ADD_MEMORY, persist localStorage)
├── stores/
│   └── useFavoritesStore.js        # Pinia: favorit (auto-persist localStorage)
├── composables/
│   └── useItemFilter.js            # Composable: gabungan search + category filter
├── data/
│   └── items.js                   # 6 mock data kenangan statis + helper
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue          # Navigasi sticky + badge favorit + menu mobile
│   │   └── AppFooter.vue
│   ├── base/
│   │   ├── BaseButton.vue          # Tombol reusable (variant + size + router-link)
│   │   └── BaseCard.vue            # Kartu dasar (padding + hover)
│   └── shared/
│       ├── ItemCard.vue            # Kartu kenangan + tombol favorit
│       ├── SearchBar.vue           # Input pencarian (v-model)
│       ├── EmptyState.vue          # State kosong (empty / search / star)
│       ├── PhotoFrame.vue          # Bingkai foto (classic / polaroid / wood)
│       └── AddMemoryModal.vue      # Modal upload foto (input file + URL.createObjectURL)
└── views/
    ├── HomeView.vue               # Hero, count-up timer, highlight
    ├── ExploreView.vue            # Katalog + search + filter kategori + favorit + modal
    ├── DetailView.vue             # Dynamic route :slug + PhotoFrame + related
    ├── AboutView.vue              # Profil pasangan, garis waktu, catatan interaktif
    └── NotFoundView.vue           # 404 fallback
```

---

## Route Contract

| Path                         | View          | Keterangan                                  |
| ---------------------------- | ------------- | ------------------------------------------- |
| `/`                          | HomeView      | Hero, count-up timer real-time, highlight   |
| `/explore`                   | ExploreView   | Katalog + SearchBar + filter + favorit     |
| `/explore/:slug`             | DetailView    | Detail kenangan berdasarkan param `:slug`   |
| `/about`                     | AboutView     | Profil pasangan, garis waktu, catatan       |
| `/:pathMatch(.*)*`           | NotFoundView  | Fallback 404                               |

---

## Fitur Utama

1. **Hero Banner & Real-time Count-up Timer** — menghitung durasi hubungan otomatis; interval dibersihkan saat komponen unmount (`onUnmounted`).
2. **Interactive Highlight & Memory Feed** — momen pilihan di Home dan katalog utama di Explore.
3. **Category & Search Filter (simultan)** — lewat `composables/useItemFilter.js`; kategori: First Times, Travel, Milestones, Date Night, Open When.
4. **Favorites System** — Pinia store `useFavoritesStore.js`, auto-persist via `localStorage`.
5. **Dynamic Memory Detail & Photo Frame** — `DetailView` membaca `:slug` dari router, menampilkan `PhotoFrame` estetik dengan 3 gaya bingkai.
6. **Form Upload Foto & Custom Frame** — `AddMemoryModal.vue`: pilih foto via `<input type="file">` + `URL.createObjectURL`, pratinjau langsung, simpan ke Vuex `ADD_MEMORY`.
7. **Our Story Page** — profil pasangan, garis waktu, dan catatan interaktif (harapan masa depan, tersimpan di `localStorage`).

---

## Data Model

Setiap item kenangan memiliki struktur atribut identik:

```js
{
  id: 'item-001',
  slug: 'first-date-di-kedai-kopi',
  title: 'First Date di Kedai Kopi',
  category: 'First Times',
  summary: 'Deskripsi pendek untuk kartu.',
  description: 'Penjelasan/cerita lengkap momen.',
  imageUrl: 'https://...',
  highlights: ['Kopi Susu', 'Ngobrol 3 Jam'],
}
```

6 item statis awal:

1. `first-date-di-kedai-kopi` — First Times
2. `liburan-pertama-ke-pantai` — Travel
3. `perayaan-anniversary-ke-1` — Milestones
4. `nonton-konser-musik-bareng` — Date Night
5. `surat-buka-saat-kamu-sedih` — Open When
6. `masak-spaghetti-bareng-di-rumah` — Date Night

Kenangan yang ditambahkan via modal ikut tersimpan (dan bertahan setelah reload) berkat persist `localStorage` pada Vuex store.

---

## Persistensi

Aplikasi tidak menggunakan backend/database. Data disimpan secara lokal di browser:

- `dmb_memories` — daftar kenangan (Vuex store).
- `dmb_favorites` — daftar id favorit (Pinia store).
- `dmb_our_notes` — catatan harapan di halaman Kisah Kita.

---

## Catatan Pengujian

Berikut checklist yang diverifikasi melalui `npm run build` (kompilasi & import):

- [x] Build produksi berhasil tanpa error import/kompilasi.
- [x] Semua rute terdaftar: `/`, `/explore`, `/explore/:slug`, `/about`, wildcard 404.
- [x] Navigasi header & tombol berpindah rute dengan benar (`router-link`).
- [x] Filter kategori + pencarian dapat digabung simultan (composable `useItemFilter`).
- [x] Favorites store Pinia auto-persist ke `localStorage` (watcher `deep`).
- [x] Dynamic route `:slug` memuat PhotoFrame & cerita lengkap; fallback bila slug tidak ditemukan.
- [x] AddMemoryModal: upload via `<input type="file">` + `URL.createObjectURL`, pratinjau langsung, simpan ke Vuex `ADD_MEMORY`.
- [x] Count-up timer membersihkan interval saat unmount.
- [x] Responsif pada breakpoint 375px (guard `@media (max-width: 400px)` di seluruh komponen).

> Catatan: pengujian visual interaktif di browser (klik, animasi, transisi) tidak dijalankan otomatis di sini — verifikasi di atas berfokus pada kompilasi, struktur import, dan konsistensi kontrak rute/data.

---

Dibuat dengan hati untuk pasangan & diri sendiri.
