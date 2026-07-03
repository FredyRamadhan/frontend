import type { Metadata } from "next";
import Image from "next/image";

import documentationCafe from "../../../assets/placeholders/documentation-cafe.jpeg";
import documentationFatisda from "../../../assets/placeholders/documentation-fatisda.jpeg";
import {
  ActionButton,

  SiteFooter,
  SiteHeader,
} from "@/components/page-chrome";

export const metadata: Metadata = {
  title: "Proses Pengembangan Aplikasi",
  description:
    "Proses pengembangan aplikasi TemanIsyarat, dari riset hingga deployment.",
};

const bodyParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

export default function ProsesPengembanganPage() {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-8 sm:px-10 lg:px-[300px]">
        <article className="space-y-6 p-2">
          {/* Header */}
          <header className="space-y-3">
            <p className="px-2 text-[16px] leading-none text-[#7c7c7c]">
              Artikel
            </p>
            <h1 className="px-1 text-[48px] font-bold leading-none tracking-tight text-[#111111]">
              Proses Pengembangan Aplikasi
            </h1>
            <p className="max-w-[760px] px-2 text-[14px] leading-[1.43] text-[#7c7c7c]">
              {metadata.description}
            </p>
            <p className="flex items-center gap-1 px-2 text-[12px] leading-none text-[#0000cc]">
              <span>Today</span>
              <span>•</span>
              <span>3 min read</span>
            </p>
          </header>

          {/* Hero: Single image */}
          <div className="relative h-[272px] overflow-hidden rounded-[32px] bg-[#0000cc]">
            <Image
              src={documentationCafe}
              alt="Dokumentasi pengembangan"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 680px"
              priority
            />
          </div>

          {/* Body */}
          <div className="space-y-4">
            {bodyParagraphs.slice(0, 3).map((paragraph, index) => (
              <p
                key={`body-${index}`}
                className="max-w-[760px] p-1 text-justify text-[16px] leading-[1.5] text-black"
              >
                {paragraph}
              </p>
            ))}

            {/* Inline image */}
            <div className="relative h-[281px] w-full overflow-hidden rounded-[16px]">
              <Image
                src={documentationFatisda}
                alt="Proses pengembangan aplikasi"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 680px"
              />
            </div>

            {bodyParagraphs.slice(3).map((paragraph, index) => (
              <p
                key={`tail-${index}`}
                className="max-w-[760px] p-1 text-justify text-[16px] leading-[1.5] text-black"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-8 flex justify-end p-2.5">
          <ActionButton href="/" tone="dark" arrow>
            Kembali ke Beranda
          </ActionButton>
        </div>
      </main>

      {/* <ArticleDetailFooter /> */}
      <SiteFooter />
    </div>
  );
}
