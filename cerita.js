// =====================================================================
//  CERITA.JS  —  tulis ceritamu di sini.
//  Desain HP (layar kunci, kode sandi, home, WhatsApp, Galeri, aplikasi,
//  jumpscare, suara) ada di index.html / style.css / script.js.
//  Isi di bawah masih KOSONG. Hapus tanda // di contoh lalu ubah.
// =====================================================================

// ---- Video pembuka (diputar paling awal, setelah ketukan pertama) ----
// Isinya ada di file intro.js. Hapus baris yang memanggil intro.js di index.html untuk tanpa video.
INTRO_GAP = 2000;   // jeda (milidetik) setelah video selesai, sebelum disclaimer muncul (+0,7 dtk video memudar)

// ---- Prolog: muncul setelah disclaimer. Satu paragraf per layar, mengetik pelan, ada tombol Next ----
// Kosongkan ([]) untuk melewati prolog. Ketuk teks saat mengetik = tampil langsung.
PROLOGUE = [
  "Di sebuah rumah kos yang terletak di gang sempit, terjadi sebuah peristiwa yang mengundang banyak tanda tanya.",
  "Malam itu, pemilik kos bernama Ningsih (46), bersama suaminya, Dodo, mendatangi kamar salah satu penghuni bernama Putri.",
  "Sudah beberapa waktu Putri tidak terlihat keluar kamar. Namun, saat pintunya diketuk berkali-kali, tidak ada satu pun jawaban.",
  "Merasa kesal sekaligus curiga, Ningsih meminta suaminya untuk mendobrak pintu kamar tersebut.",
  "Namun, apa yang mereka temukan di dalam justru jauh dari dugaan.",
  "Kamar itu gelap, udara dipenuhi bau tak sedap, dan terdapat sejumlah kejanggalan di dalam kamar mandi.",
  "Sebuah simbol misterius, ubin yang hancur, serta noda mencurigakan menjadi awal dari terungkapnya sebuah kasus.",
  "Polisi kemudian datang untuk melakukan olah tempat kejadian perkara. Sejumlah barang bukti ditemukan, termasuk telepon genggam milik Putri yang tergeletak di atas kasurnya.",
  "Seluruh bukti dikumpulkan dan diserahkan kepada seorang detektif bernama FICO.",
  "Kini, tugasnya hanya satu: mengungkap apa yang sebenarnya terjadi pada Putri.",
  "Namun, apakah semua bukti yang ditemukan benar-benar mengarah pada satu jawaban?",
  "Atau justru ada sesuatu yang sengaja disembunyikan?"
];
PROLOGUE_BTN = "Next";     // tombol di tiap paragraf
PROLOGUE_LAST = "Mulai";   // tombol di paragraf terakhir
TYPE_MS = 75;              // kecepatan mengetik (milidetik per huruf) - makin besar makin lambat

// ---- Layar disclaimer (muncul setelah ketukan pertama, sebelum layar kunci) ----
// Teks muncul perlahan satu per satu, lalu tombol. Kosongkan keduanya untuk melewati layar ini.
DISCLAIMER_TITLE = "DISCLAIMER";
DISCLAIMER = [
  "Alternate Universe (AU) ini merupakan cerita fiksi bergenre horror dan mystery yang dibuat semata-mata untuk hiburan. Seluruh tokoh, nama, tempat, dan kejadian di dalamnya merupakan hasil imajinasi penulis.",
  "Apabila terdapat kesamaan dengan kehidupan nyata, hal tersebut hanyalah kebetulan dan tidak disengaja.",
  "Enjoy the story. Enter at your own risk."
];
DISCLAIMER_BTN = "Lanjutkan";

// ---- Pengaturan dasar ----
CONTACT = "Kontak";              // nama teman yang chat denganmu
CONTACT_ICON = "👤";             // ikon kecil di header chat
CODE = "1234";                   // kode sandi cadangan (dipakai kalau CODE_CLUES kosong)
// Teka-teki kode: angka disebar di layar kunci. Pemain mengetuk benda-bendanya untuk mencari petunjuk.
// Teks di bawah muncul lewat tombol "Petunjuk kode" di layar sandi. Kosongkan ("") untuk mematikan semuanya.
CODE_RIDDLE =
  "Kode ini terdiri dari 4 angka. Tiap angka disembunyikan di layar kunci (sebelum digeser).\n\n" +
  "Ada 4 benda yang menyimpan petunjuk: satu yang menunjukkan HARI, satu yang menunjukkan WAKTU, " +
  "satu yang menunjukkan DAYA, dan satu yang bisa MEMOTRET. Ketuk bendanya untuk mencari.\n\n" +
  "Tekan Batal untuk kembali ke layar kunci.";
// Urutan = Angka 1, 2, 3, 4.  at: date | time | battery | camera | flashlight | island | signal | wifi
// value() = angka yang jadi bagian kode.  text() = petunjuk yang dibaca pemain (aturannya harus menghasilkan value).
// Di sini jam & tanggal mengikuti HP pengguna, jadi kodenya bisa beda tiap orang/waktu.
// Begitu petunjuk dibuka, nilainya "dikunci" supaya kode tidak berubah saat jam berganti.
const _p = n => String(n).padStart(2, "0");
CODE_CLUES = [
  { at: "date",
    value: () => new Date().getDate() % 10,
    text:  () => "Hari ini tanggal " + new Date().getDate() + ".\nPakai angka terakhir dari tanggal itu." },
  { at: "time",
    value: () => new Date().getHours() % 10,
    text:  () => { const d = new Date(); return "Jam menunjukkan " + _p(d.getHours()) + ":" + _p(d.getMinutes()) + ".\nAmbil angka jam saja (" + _p(d.getHours()) + "), lalu pakai angka terakhirnya."; } },
  { at: "battery",
    value: () => 4,
    text:  () => "Baterai tinggal 44%.\nPakai angka yang muncul dua kali itu." },
  { at: "camera",
    value: () => 4,
    text:  () => "Kamera HP ini punya 2 lensa.\nKalikan jumlah lensa dengan 2." }
];
LIVE_CLOCK = true;   // true = jam & tanggal layar kunci mengikuti HP pengguna
WRONG_HINT = "Coba ingat lagi."; // petunjuk setelah 3x salah kode
REPLY_AFTER_SPAM = "";           // balasan pemain setelah spam notif ("" = tidak ada)
DOOR_NEXT = "start";             // node chat yang jalan setelah kode pintu benar
END_TEXT = "TAMAT";              // tulisan di akhir cerita

// ---- Spam notif: banner satu-satu, lalu muncul di chat ----
// Contoh: SPAM = ["Halo", "halo?", "jawab dong"];
SPAM = [];

// ---- Galeri foto: [jam, judul, emoji, latar, keterangan] ----
// Foto TERAKHIR terkunci sampai semua foto lain dilihat.
// Contoh: PH = [["20:01","Halaman","🏠","linear-gradient(#2d3a4a,#0e1218)","Keterangan foto."]];
PH = [];
GAL_END = "";   // kotak pesan yang muncul setelah semua foto dilihat

// ---- Alur chat ----
// msgs   : isi pesan teman. Awalan khusus:
//            ">teks" = pesan dari pemain     "!" = jumpscare
//            "@knock" "@creak" "@glass" "@laugh" = efek suara
// choices: [["teks pilihan","node tujuan"], ...]
// input  : {answer:["jawaban"],ok:"node jika benar",hint:"petunjuk jika salah"}
// tip    : tulisan arahan di bawah chat       next: lanjut otomatis     fin:true = tamat
// Node bernama "start" wajib ada: itu chat pertama setelah spam.
Object.keys(nodes).forEach(k => delete nodes[k]);
Object.assign(nodes, {
  start: {
    msgs: ["(tulis ceritamu di cerita.js)"],
    fin: true
  }
  // contoh node lain:
  // , pintu: { msgs: ["halo", "!"], choices: [["Jawab A", "nodeA"], ["Jawab B", "nodeB"]] }
});

// ---- Aplikasi di HP yang bisa dibuka ----
// cat = Catatan (boleh pakai lock = sandi, door = kode pintu), kal = Kalender, jam = Jam, ps = Pesan
// t = judul, body = isi ("\n" = baris baru)
Object.keys(APPV).forEach(k => delete APPV[k]);
Object.assign(APPV, {
  cat: { t: "Catatan",  body: "" },
  kal: { t: "Kalender", body: "" },
  jam: { t: "Jam",      body: "" },
  ps:  { t: "Pesan",    body: "" }
  // contoh Catatan terkunci + kode pintu:
  // cat: { t:"Catatan", lock:{hint:"Petunjuk sandi", a:["sandi"]}, body:"Isi catatan", door:"1234" }
});

// ---- Header chat & petunjuk (jangan diubah) ----
setupHint();
prepareIntro();
if (LIVE_CLOCK) startClock();
document.querySelector(".chat .av").textContent = CONTACT_ICON;
document.querySelector(".chat header b").textContent = CONTACT;
