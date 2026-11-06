/* ===========================================================
   Mock data — Digital Memory Box
   6 static memory items with consistent shape.
   =========================================================== */

export const categories = [
  'First Times',
  'Travel',
  'Milestones',
  'Date Night',
  'Open When',
];

export const items = [
  {
    id: 'item-001',
    slug: 'first-date-di-kedai-kopi',
    title: 'First Date di Kedai Kopi',
    category: 'First Times',
    summary: 'Ngobrol berjam-jam di atas secangkir kopi susu yang ternyata terlalu pahit.',
    description:
      'Kita berdua sepakat ketemuan di kedai kopi kecil di pinggir jalan. Kamu datang lebih dulu, duduk di meja dekat jendela. Aku datang dengan nervous berlebih, hingga kopi susu pesananku datang dua kali karena lupa ngasih tau "less sugar". Tapi ternyata obrolan kita ngalir tanpa henti sampai kedai tutup. Tiga jam berlalu seperti tiga menit. Saat itulah aku tahu — ini bukan sekadar ngopi.',
    imageUrl:
      'https://images.pexels.com/photos/3978157/pexels-photo-3978157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Kopi Susu Less Sugar', 'Ngobrol 3 Jam', 'Dekat Jendela', 'Nervous Berlebih'],
  },
  {
    id: 'item-002',
    slug: 'liburan-pertama-ke-pantai',
    title: 'Liburan Pertama ke Pantai',
    category: 'Travel',
    summary: 'Senja pertama di tepi laut, kaki kita basah, hati kita penuh.',
    description:
      'Liburan pertama kita pilih pantai yang cukup jauh dari kota. Perjalanan lima jam di mobil yang diisi oleh playlist lagu-lagu lama dan debat ringan soal arah GPS. Sampainya langsung lari ke pinggir air. Kamu ambil foto pertama kita bareng, rambut kita berantakan kena angin. Saat matahari mulai tenggelam, kita duduk di atas handuk, jari kita saling menggenggam. Itu senja paling tenang yang pernah aku rasakan.',
    imageUrl:
      'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Road Trip 5 Jam', 'Senja di Tepi Laut', 'Foto Berantakan', 'Angin Laut'],
  },
  {
    id: 'item-003',
    slug: 'perayaan-anniversary-ke-1',
    title: 'Perayaan Anniversary ke-1',
    category: 'Milestones',
    summary: 'Setahun penuh tawa, pelukan, dan satu kue yang setengah gagal.',
    description:
      'Setahun pertama kita. Aku pesan kue kecil dari toko langganan, minta ditulisin "Happy 1st Anniversary". Kebetulan toko salah eja, tulisannya jadi "Happy 1st Aniversary" — tanpa dua R. Kamu malah ketawa lebar dan bilang itu makin unik. Kita makan kuenya di ruang tamu, pakai lilin satu batang, tiup bareng. Setahun terasa cepat, tapi aku tahu aku mau ngulang setahun ini berkali-kali.',
    imageUrl:
      'https://images.pexels.com/photos/7867442/pexels-photo-7867442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Kue Salah Tulisan', 'Lilin Satu Batang', 'Tiup Bareng', 'Setahun Penuh Tawa'],
  },
  {
    id: 'item-004',
    slug: 'nonton-konser-musik-bareng',
    title: 'Nonton Konser Musik Bareng',
    category: 'Date Night',
    summary: 'Suara pengeras suara bikin telinga berdengung, tapi nyanyi bareng kita paling keras.',
    description:
      'Kita udah lama pengen nonton band ini live. Tiket kepentok berbulan lalu, dan malam itu akhirnya datang. Venue outdoor, malam, lampu panggung warna-warni. Kamu pakai jaket band, aku pakai kaos hitam polos. Begitu lagu andalan mulai, kita langsung nyanyi serempak, suara serak, lompat-lompat. Suara kita tenggelam di antara ribuan orang, tapi di momen itu cuma berdua yang aku dengar.',
    imageUrl:
      'https://images.pexels.com/photos/13230484/pexels-photo-13230484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Venue Outdoor', 'Lampu Panggung', 'Nyanyi Serempak', 'Lompat-lompat'],
  },
  {
    id: 'item-005',
    slug: 'surat-buka-saat-kamu-sedih',
    title: 'Surat Buka Saat Kamu Sedih',
    category: 'Open When',
    summary: 'Tulisan tangan yang kubuat di malam kamu tertidur lebih awal.',
    description:
      'Ini bukan momen yang dirayakan, tapi ini momen yang aku simpan paling jauh. Pada suatu malam kamu tidur lebih awal karena lelah. Aku bangun, ambil kertas, dan mulai nulis. Aku tulis semua yang pengen kamu baca saat kamu sedih — alasan kamu kuat, alasan aku bangga, alasan kenapa hari ini bakal berlalu. Aku lipat suratnya, masukin amplop, tulis di depan: "Buka saat kamu sedih." Nanti, kalau waktunya tiba, kamu tinggal buka.',
    imageUrl:
      'https://images.pexels.com/photos/6830860/pexels-photo-6830860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Tulisan Tangan', 'Malam Kamu Tidur Awal', 'Amplop Lipat', 'Buka Saat Sedih'],
  },
  {
    id: 'item-006',
    slug: 'masak-spaghetti-bareng-di-rumah',
    title: 'Masak Spaghetti Bareng di Rumah',
    category: 'Date Night',
    summary: 'Dapur berantakan, saus sedikit gosong, tapi rasanya malah juara.',
    description:
      'Kita putuskan malem itu masak di rumah, bukan keluar. Resep spaghetti kita ambil dari internet, tapi gak ngikutin persis. Kamu ngaduk saus, aku ngiris bawang. Saus sempet gosong sedikit karena lupa diaduk, tapi kita selametin dengan tambahan tomat segar. Kita makan di lantai dapur pakai piring di panggusan koran. Tidak ada meja, tidak ada lilin, tidak ada pakaian rapi. Tapi itu malam makan malam paling enak seumur hidup.',
    imageUrl:
      'https://images.pexels.com/photos/5907612/pexels-photo-5907612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    highlights: ['Saus Gosong Sedikit', 'Makan di Lantai Dapur', 'Resep Internet', 'Malam Paling Enak'],
  },
];

export function getItemBySlug(slug) {
  return items.find((item) => item.slug === slug);
}
