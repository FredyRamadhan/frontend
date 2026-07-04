import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";

import detailIllustration from "../../../../assets/illustrations/illustration-medium.svg";
import cheersImg from "../../../../assets/placeholders/cheers.jpg";
import gerkatinPlaceholderImg from "../../../../assets/placeholders/gerkatin-placeholder.jpg";
import {
  ActionButton,
  SiteFooter,
  InlineImage,
  SiteHeader,
} from "@/components/page-chrome";
import { blocksToParagraphs, excerptFromArticle } from "@/lib/articles";
import { formatArticleDate, formatReadTime } from "@/lib/format";
import { getArticleBySlug } from "@/lib/sanity";

export const dynamic = "force-dynamic";

const GERKATIN_MD_PATH = path.join(process.cwd(), "tentang-gerkatin.md");

function parseMarkdownToParagraphs(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const blocks = content.split(/\n\n+/);
  const paragraphs: string[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.some((line) => line.startsWith("* "))) {
      for (const line of lines) {
        if (line.startsWith("* ")) {
          const cleaned = line.replace(/^\* /, "").replace(/\*\*(.*?)\*\*/g, "$1").trim();
          if (cleaned) paragraphs.push(cleaned);
        }
      }
    } else {
      const cleaned = block.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      if (cleaned) paragraphs.push(cleaned);
    }
  }

  return paragraphs;
}

const fallbackGerkatinParagraphs = fs.existsSync(GERKATIN_MD_PATH)
  ? parseMarkdownToParagraphs(GERKATIN_MD_PATH)
  : [];

const fallbackParagraphs = fallbackGerkatinParagraphs.length > 0
  ? fallbackGerkatinParagraphs
  : [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ];

const fallbackExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const isGerkatin = slug === "tentang-gerkatin";
  const title = article?.article ?? (isGerkatin ? "Tentang GERKATIN" : "Artikel");

  let description: string;
  if (article) {
    description = excerptFromArticle(article, fallbackExcerpt);
  } else if (isGerkatin && fallbackGerkatinParagraphs.length > 0) {
    const firstPara = fallbackGerkatinParagraphs[0];
    description = firstPara.length > 120 ? `${firstPara.slice(0, 117).trimEnd()}...` : firstPara;
  } else {
    description = fallbackExcerpt;
  }

  return { title, description };
}

export default async function ArticleInstancePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article && slug !== "tentang-gerkatin") {
    notFound();
  }

  const title = article?.article ?? "Tentang GERKATIN";
  const subtitle = article?.categoryName ?? "Artikel";
  const description = article ? excerptFromArticle(article, fallbackExcerpt) : fallbackExcerpt;
  const isGerkatin = slug === "tentang-gerkatin";
  const bodyParagraphs = blocksToParagraphs(article?.content ?? []);
  const contentParagraphs = bodyParagraphs.length > 0 ? bodyParagraphs : fallbackParagraphs;
  const heroImageUrl = isGerkatin ? cheersImg : article?.imageUrl;
  const articleAuthor = isGerkatin ? "TemanIsyarat Team" : article?.authorName;
  const articleDate = isGerkatin ? "03 Mar 2026" : formatArticleDate(article?.date);
  const articleReadTime = isGerkatin
    ? `${Math.max(1, Math.ceil(fallbackGerkatinParagraphs.join(" ").split(/\s+/).length / 200))} min read`
    : formatReadTime(article?.readingTime);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="mx-auto w-full lg:max-w-6xl flex-1 px-6 py-8 sm:px-10">
        
        <article className="lg:space-y-12 space-y-6">
          <div className="relative h-[272px] overflow-hidden rounded-[32px] bg-[#0000cc]">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 680px"
                  priority
                />
              ) : (
                <InlineImage
                src={detailIllustration}
                alt={title}
                className="absolute right-0 top-[18px] h-[236px] w-auto max-w-[85%] object-contain pr-4"
                />
              )}
          </div>
          <header className="space-y-3 flex flex-col gap-4">
            <div className="space-y-6">
              <p className="text-lg leading-none text-[#7c7c7c] px-2">{subtitle}</p>
              <h1 className="px-1 text-5xl font-bold leading-none tracking-tight text-[#111111]">
                {title}
              </h1>
              {/* <p className="px-2 text-xl leading-[1.43] text-[#7c7c7c]">
                {description}
              </p> */}
            </div>
            <div className="flex gap-2 px-1 flex-col align-top">
              <p className="font-bold text-[#0000cc] text-lg">{articleAuthor}</p>
              <p className="flex items-center gap-2 text-md leading-none">
                <span>{articleDate}</span>
                <span>•</span>
                <span className="text-[#0000cc]">{articleReadTime}</span>
              </p>
            </div>
          </header>

          

          <div className="space-y-4">
            {contentParagraphs.slice(0, 3).map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 24)}-${index}`}
                className="p-1 text-justify text-[16px] leading-[1.5] text-black"
              >
                {paragraph}
              </p>
            ))}

            {/* {isGerkatin ? (
              <div className="relative h-[281px] w-full overflow-hidden rounded-[16px]">
                <Image
                  src={gerkatinPlaceholderImg}
                  alt="Tentang GERKATIN"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 680px"
                />
              </div>
            ) : (
              <div className="h-[281px] w-full rounded-[16px] bg-[#c6c6c6]" aria-hidden />
            )} */}

            {contentParagraphs.slice(3).map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 24)}-tail-${index}`}
                className="p-1 text-justify text-[16px] leading-[1.5] text-black"
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
