import type { Metadata } from "next";

import { TeamCard } from "@/components/team-card";
import { SectionTitle, SiteFooter, SiteHeader } from "@/components/page-chrome";
import { getAuthors } from "@/lib/sanity";
import memberWilli from "../../../assets/members/willi.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

type TeamMember = {
  name: string;
  role: string;
  imageUrl?: any;
};

const fallbackTeam: TeamMember[] = Array.from({ length: 9 }, () => ({
  name: "Card Subtitle",
  role: "Card Subtitle",
}));

export default async function AboutPage() {
  const authors = await getAuthors(9);

  const teamMembers: TeamMember[] =
    authors.length > 0
      ? authors.map((author) => ({
          name: author.name,
          role: author.bio || "Anggota Tim",
          imageUrl: memberWilli,
        }))
      : fallbackTeam.map((member) => ({
          ...member,
          imageUrl: memberWilli,
        }));

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111111]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-[120px] lg:py-16">
          <SectionTitle>Profil Tim Pengembang</SectionTitle>

          <div className="mt-8 rounded-[64px] bg-[#e5e8fa] p-4 sm:p-8 lg:p-16">
            <div className="grid justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={`${member.name}-${index}`}
                  name={member.name}
                  role={member.role}
                  imageUrl={member.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
