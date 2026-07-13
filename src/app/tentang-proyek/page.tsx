import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";

import gerkatinPlaceholder from "../../../assets/placeholders/gerkatin-placeholder.jpg";
import meeting from "../../../assets/placeholders/meeting.jpg";
import {
  ActionButton,
  SiteFooter,
  SiteHeader,
} from "@/components/page-chrome";

export const metadata: Metadata = {
  title: "Tentang Proyek",
  description:
    "Deskripsi proyek penelitian pengembangan teknologi pengenal bahasa isyarat untuk komunitas Tuli.",
};

const SPLIT_INDEX = 2;

const bodyContent: ReactNode[] = [
  <p
    key="p1"
    className="p-1 text-justify text-[16px] leading-[1.5] text-black"
  >
    <strong>Latar Belakang.</strong> Sebuah perubahan besar sedang terjadi dalam
    pengembangan teknologi untuk membantu komunitas Tuli, di mana teknologi
    pengenal bahasa isyarat kini dipandang sebagai sistem yang luas dan saling
    terhubung. Proyek penelitian ini dibuat untuk membangun teknologi yang
    menghormati aturan tata bahasa, keamanan data, dan pelestarian budaya.
    Melalui inisiatif ini, teknologi yang dihasilkan diharapkan benar-benar
    sesuai dengan kebutuhan nyata para pengguna di lapangan.
  </p>,
  <p
    key="p2"
    className="p-1 text-justify text-[16px] leading-[1.5] text-black"
  >
    <strong>Fokus Pelestarian BISINDO Solo.</strong> Fokus utama dari proyek ini
    adalah menjaga dan memasukkan Bahasa Isyarat Indonesia (BISINDO), khususnya
    dialek khas Solo yang memiliki gerakan dan tata bahasa unik. Selama ini,
    sistem kecerdasan buatan (AI) sering kali kurang akurat karena hanya dilatih
    menggunakan data dari variasi Jakarta. Proyek ini hadir untuk menyelesaikan
    masalah tersebut dengan membuat kumpulan data (<em>dataset</em>) resmi untuk
    BISINDO Solo serta mengembangkan model <em>deep learning</em> yang hemat
    daya. Sistem ini dirancang agar bisa berjalan langsung di HP Android (
    <em>edge computing</em>) dengan cepat tanpa perlu jaringan internet yang
    kuat.
  </p>,
  <p
    key="p3"
    className="p-1 text-justify text-[16px] leading-[1.5] text-black"
  >
    <strong>Kolaborasi dengan GERKATIN Surakarta.</strong> Dalam
    pelaksanaannya, proyek ini bekerja sama dengan Gerakan untuk Kesejahteraan
    Tunarungu Indonesia (GERKATIN) Kota Surakarta sebagai mitra utama. Kerja
    sama ini bertujuan untuk memastikan bahwa data bahasa isyarat yang diambil
    memang asli dan digunakan sehari-hari oleh komunitas Tuli. Selain itu,
    kolaborasi ini mengajak penutur asli (<em>native signers</em>) untuk ikut
    serta agar perbedaan dialek bisa terekam dengan baik. Proses penelitian ini
    juga memberikan manfaat berupa pelatihan digital dan pengenalan AI bagi
    anggota komunitas.
  </p>,
  <p
    key="p4"
    className="p-1 text-justify text-[16px] leading-[1.5] text-black"
  >
    <strong>Target & Manfaat.</strong> Proyek ini menargetkan pembuatan aplikasi
    Android yang bisa mengenali bahasa isyarat secara langsung (<em>real-time</em>
    ) menggunakan teknologi MediaPipe Holistic dan GRU dengan target akurasi
    minimal 80%. Bagi para peneliti, proyek ini memberikan pengalaman langsung
    dalam membuat AI dari awal sekaligus menambah catatan ilmiah yang masih
    jarang ada. Sementara bagi GERKATIN Surakarta, proyek ini menyediakan alat
    bantu komunikasi yang murah sekaligus menjadi bukti nyata dalam menjaga
    kebudayaan Tuli Solo di dunia digital.
  </p>,
];

export default function TentangProyekPage() {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="mx-auto w-full lg:max-w-6xl flex-1 px-6 py-8 sm:px-10">
        <article className="lg:space-y-12 space-y-6">
          {/* Hero */}
          <div className="relative h-[272px] overflow-hidden rounded-[32px] bg-[#0000cc]">
            <Image
              src={gerkatinPlaceholder}
              alt="Dokumentasi proyek"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 680px"
              priority
            />
          </div>

          {/* Header */}
          <header className="space-y-3 flex flex-col gap-4">
            <div className="space-y-6">
              <p className="text-lg leading-none text-[#7c7c7c] px-2">
                Artikel
              </p>
              <h1 className="px-1 text-5xl font-bold leading-none tracking-tight text-[#111111]">
                Tentang TemanIsyarat
              </h1>
            </div>
            <div className="flex gap-2 px-1 flex-col align-top">
              <p className="font-bold text-[#0000cc] text-lg">TemanIsyarat Team</p>
              <p className="flex items-center gap-2 text-md leading-none">
                <span>3 Mar 2026</span>
                <span>•</span>
                <span className="text-[#0000cc]">3 min read</span>
              </p>
            </div>
          </header>

          {/* Body */}
          <div className="space-y-4">
            {bodyContent.slice(0, SPLIT_INDEX)}

            {/* Inline image */}
            <div className="relative h-[281px] w-full overflow-hidden rounded-[16px]">
              <Image
                src={meeting}
                alt="Proses penelitian dan kolaborasi"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 680px"
              />
            </div>

            {bodyContent.slice(SPLIT_INDEX)}
          </div>
        </article>

        <div className="mt-8 flex justify-end p-2.5">
          <ActionButton href="/" tone="dark" arrow>
            Kembali ke Beranda
          </ActionButton>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
