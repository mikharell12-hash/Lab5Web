"use strict";

const pesan = document.getElementById("pesan");
const formatRupiah = (angka) => Number(angka).toLocaleString("id-ID");

// Latihan 1: Output pada halaman dan Console.
function tampilkanHelloWorld() {
  pesan.textContent = "Hello World";
  console.log("Hello World");
}
document.getElementById("btnHello").addEventListener("click", tampilkanHelloWorld);
document.getElementById("btnConsole").addEventListener("click", () => {
  console.log("Pesan ditulis ke Console. Konten halaman: ", pesan.textContent);
});
console.log("Praktikum JavaScript siap dijalankan.");

// Latihan 2: Alert dan prompt; dialog hanya muncul saat tombol ditekan.
document.getElementById("btnPrompt").addEventListener("click", () => {
  const namaPengguna = prompt("Masukkan nama Anda:", "");
  const hasil = document.getElementById("hasilPrompt");
  if (namaPengguna && namaPengguna.trim() !== "") {
    alert(`Halo, ${namaPengguna.trim()}!`);
    hasil.textContent = `Selamat datang, ${namaPengguna.trim()}.`;
    hasil.className = "result success";
  } else {
    alert("Nama belum diisi.");
    hasil.textContent = "Nama belum diisi atau dialog dibatalkan.";
    hasil.className = "result error";
  }
});

// Latihan 3: Function dengan operasi aritmetika.
function operasiDasar(a, b) {
  return {
    penjumlahan: a + b,
    pengurangan: a - b,
    perkalian: a * b,
    pembagian: b !== 0 ? (a / b).toFixed(2) : "Tidak dapat dibagi nol",
    modulus: b !== 0 ? a % b : "Tidak dapat dihitung dengan pembagi nol"
  };
}
document.getElementById("btnOperasi").addEventListener("click", () => {
  const a = Number(document.getElementById("angkaA").value);
  const b = Number(document.getElementById("angkaB").value);
  const out = document.getElementById("hasilOperasi");
  if (document.getElementById("angkaA").value.trim() === "" || document.getElementById("angkaB").value.trim() === "") {
    out.textContent = "Kedua bilangan wajib diisi."; out.className = "result error"; return;
  }
  const hasil = operasiDasar(a, b);
  out.innerHTML = `Penjumlahan: <strong>${hasil.penjumlahan}</strong><br>Pengurangan: <strong>${hasil.pengurangan}</strong><br>Perkalian: <strong>${hasil.perkalian}</strong><br>Pembagian: <strong>${hasil.pembagian}</strong><br>Modulus: <strong>${hasil.modulus}</strong>`;
  out.className = "result success";
  console.log("Hasil operasi dasar:", hasil);
});

// Latihan 4: if-else dan validasi nilai.
document.getElementById("btnNilaiIf").addEventListener("click", () => {
  const raw = document.getElementById("nilaiIf").value;
  const nilai = Number(raw);
  const out = document.getElementById("hasilNilaiIf");
  if (raw.trim() === "" || !Number.isFinite(nilai) || nilai < 0 || nilai > 100) {
    out.textContent = "Input tidak valid. Masukkan nilai dari 0 sampai 100."; out.className = "result error";
  } else if (nilai >= 60) {
    out.textContent = `Nilai ${nilai}: Lulus.`; out.className = "result success";
  } else {
    out.textContent = `Nilai ${nilai}: Belum lulus.`; out.className = "result error";
  }
});

// Latihan 5: switch memilih nama bilangan.
document.getElementById("btnSwitch").addEventListener("click", () => {
  const pilihan = document.getElementById("pilihanSwitch").value;
  const namaBilangan = { "1": "satu", "2": "dua", "3": "tiga", "4": "empat", "5": "lima" };
  let hasil;
  switch (pilihan) {
    case "1": hasil = "Bilangan satu"; break;
    case "2": hasil = "Bilangan dua"; break;
    case "3": hasil = "Bilangan tiga"; break;
    case "4": hasil = "Bilangan empat"; break;
    case "5": hasil = "Bilangan lima"; break;
    default: hasil = "Pilihan tidak tersedia";
  }
  const out = document.getElementById("hasilSwitch");
  out.textContent = hasil; out.className = `result ${namaBilangan[pilihan] ? "success" : "error"}`;
});

// Latihan 6 dan eksperimen: cek bilangan bulat serta function cekGenap.
function cekGenap(angka) { return Number.isInteger(angka) && angka % 2 === 0; }
document.getElementById("btnBilangan").addEventListener("click", () => {
  const raw = document.getElementById("bilangan").value;
  const angka = Number(raw);
  const out = document.getElementById("hasilBilangan");
  if (raw.trim() === "" || !Number.isInteger(angka)) {
    out.textContent = "Masukkan bilangan bulat yang valid."; out.className = "result error";
  } else {
    out.textContent = cekGenap(angka) ? "Bilangan genap" : "Bilangan ganjil";
    out.className = "result success";
  }
});

// Latihan 7: satu function dengan parameter untuk mengubah warna.
function ubahWarnaLatar(warna) { document.body.style.backgroundColor = warna; }
document.querySelectorAll("[data-warna]").forEach((tombol) => {
  tombol.addEventListener("click", () => ubahWarnaLatar(tombol.dataset.warna));
});

// Latihan 8: DOM, event listener checkbox, dan total menu.
const daftarMenu = document.querySelectorAll(".menu");
function hitungTotal() {
  let total = 0;
  daftarMenu.forEach((item) => { if (item.checked) total += Number(item.value); });
  document.getElementById("total").textContent = formatRupiah(total);
}
daftarMenu.forEach((item) => item.addEventListener("change", hitungTotal));

// Mini project: perhitungan nilai akhir, predikat, dan status.
function hitungNilaiAkhir(tugas, uts, uas) { return tugas * 0.30 + uts * 0.30 + uas * 0.40; }
function tentukanPredikat(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 75) return "B";
  if (nilai >= 60) return "C";
  if (nilai >= 50) return "D";
  return "E";
}
document.getElementById("formNilai").addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = ["tugas", "uts", "uas"].map((id) => document.getElementById(id).value);
  const out = document.getElementById("hasilAkhir");
  const nilai = inputs.map(Number);
  if (inputs.some((v) => v.trim() === "") || nilai.some((v) => !Number.isFinite(v) || v < 0 || v > 100)) {
    out.textContent = "Semua nilai harus diisi dengan angka dari 0 sampai 100."; out.className = "result result-large error"; return;
  }
  const akhir = hitungNilaiAkhir(...nilai);
  const status = akhir >= 60 ? "Lulus" : "Belum lulus";
  out.innerHTML = `Nilai akhir: <strong>${akhir.toFixed(2)}</strong><br>Predikat: <strong>${tentukanPredikat(akhir)}</strong><br>Status: <strong>${status}</strong>`;
  out.className = `result result-large ${akhir >= 60 ? "success" : "error"}`;
  console.log("Nilai akhir:", akhir.toFixed(2), "Predikat:", tentukanPredikat(akhir), "Status:", status);
});

// Eksperimen: tabel perkalian 7 dari 1-10.
document.getElementById("btnTabel").addEventListener("click", () => {
  const baris = [];
  for (let i = 1; i <= 10; i++) baris.push(`7 x ${i} = ${7 * i}`);
  const out = document.getElementById("tabel7");
  out.textContent = baris.join("\n"); out.hidden = false;
});
document.getElementById("btnCekGenap").addEventListener("click", () => {
  const hasil = cekGenap(8);
  const out = document.getElementById("hasilCekGenap");
  out.textContent = `cekGenap(8) menghasilkan ${hasil}.`; out.className = "result success";
});
document.getElementById("btnToggle").addEventListener("click", () => {
  const teks = document.getElementById("teksToggle");
  teks.hidden = !teks.hidden;
});

// Validasi form untuk jawaban pertanyaan nomor 7.
document.getElementById("formValidasi").addEventListener("submit", (event) => {
  event.preventDefault();
  const nama = document.getElementById("namaValidasi").value.trim();
  const rawNilai = document.getElementById("nilaiValidasi").value;
  const nilai = Number(rawNilai);
  const out = document.getElementById("hasilValidasi");
  if (!nama) {
    out.textContent = "Nama tidak boleh kosong."; out.className = "result error";
  } else if (rawNilai.trim() === "" || !Number.isFinite(nilai) || nilai < 0 || nilai > 100) {
    out.textContent = "Nilai harus berupa angka dalam rentang 0-100."; out.className = "result error";
  } else {
    out.textContent = `Validasi berhasil. Nama: ${nama}; nilai: ${nilai}.`; out.className = "result success";
  }
});
