import { getBlogPosts } from "@/data/blog";
import dynamic from "next/dynamic"; // Restore dynamic import
import { DATA } from "@/data/resume"; // Re-ordered to match conventions if needed, but keeping it simple
import Link from "next/link";
import Image from "next/image"; // Added Image import
import Markdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PersonSchema } from "@/components/schema/person-schema";
import { Metadata } from "next";
import { Icons } from "@/components/icons";
import ShinyButton from "@/components/ui/shiny-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SocialIconLink } from "@/components/social-icon-link";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";
import { GithubSkeleton } from "@/components/skeletons/github-skeleton";
import { ProjectSkeleton } from "@/components/skeletons/project-skeleton";
import { HackathonSkeleton } from "@/components/skeletons/hackathon-skeleton";
import { GithubContributions } from "@/components/github-calendar"; // Static import
import { BorderBeam } from "@/components/magicui/border-beam";
import { GhibliSkyBackground } from "@/components/ghibli-elements";
import { SpotifyCard } from "@/components/spotify-card";
import { getSpotifyData } from "@/lib/spotify"; // Import fetching logic
const BLUR_FADE_DELAY = 0.04;
export const metadata: Metadata = {
  title: "Abhishek Biradar",
  description: DATA.summary,
  openGraph: {
    title: "Abhishek Biradar",
    description: DATA.summary,
    url: DATA.url,
    siteName: "Abhishek Biradar",
    images: [
      {
        url: "https://seekernothing.com/portfolio.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name}'s Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Biradar",
    description: DATA.summary,
    creator: "@" + "Star_Knight12",
    images: ["https://seekernothing.com/portfolio.png"],
  },
};

const BlogCard = dynamic(
  () => import("@/components/blog-card").then((mod) => mod.BlogCard),
  {
    ssr: true,
    loading: () => <BlogSkeleton />,
  },
);

const ProjectCardDynamic = dynamic(
  () => import("@/components/project-card").then((mod) => mod.ProjectCard),
  {
    ssr: true,
    loading: () => <ProjectSkeleton />,
  },
);

const HackathonCardDynamic = dynamic(
  () => import("@/components/hackathon-card").then((mod) => mod.HackathonCard),
  {
    ssr: true,
    loading: () => <HackathonSkeleton />,
  },
);

export default async function Page() {
  const posts = await getBlogPosts();
  const spotifyData = await getSpotifyData(); // Fetch spotify data

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <GhibliSkyBackground />
      </div>

      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <PersonSchema />
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]} 
                 `}
                />
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="profile-wrapper md:-translate-x-4 lg:-translate-x-6 xl:-translate-x-10">
                  <div className="size-28 relative z-10 border-4 border-primary/10 shadow-lg rounded-full overflow-hidden">
                    <Image
                      alt={DATA.name}
                      src={DATA.avatarUrl}
                      width={112}
                      height={112}
                      priority
                      className="object-cover scale-126"
                    />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>

        <section id="connect">
          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Socials</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {Object.entries(DATA.contact.social).map(
                  ([name, social], idx) => (
                    <SocialIconLink
                      key={name}
                      name={name}
                      url={social.url}
                      icon={<social.icon className="size-full" />}
                      delay={BLUR_FADE_DELAY * 5 + idx * 0.05}
                    />
                  ),
                )}
              </div>
            </div>
          </BlurFade>
        </section>

        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="spotify">
          <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
            <h2 className="text-xl font-bold mb-4">Listening to</h2>
            <SpotifyCard initialData={spotifyData} />
          </BlurFade>
        </section>

        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">GitHub Contributions</h2>
            <GithubContributions />
          </BlurFade>
        </section>

        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Featured Projects</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <div className="grid gap-4 sm:grid-cols-2">
                {DATA.projects.slice(0, 4).map((project) => (
                  <div
                    key={project.title}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <ProjectCard
                      {...project}
                      tags={Array.from(project.technologies)}
                    />
                  </div>
                ))}
              </div>
              <Link href="/projects" className="mt-4 block">
                <ShinyButton className="w-full sm:w-auto group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-semibold">
                  View All Projects →
                </ShinyButton>
              </Link>
            </BlurFade>
          </div>
        </section>

        {/* Education section removed per request */}

        <section id="blogs">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Recent Blog Posts</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <div className="flex flex-col space-y-4">
                {posts
                  .sort((a, b) => {
                    if (
                      new Date(a.metadata.publishedAt) >
                      new Date(b.metadata.publishedAt)
                    ) {
                      return -1;
                    }
                    return 1;
                  })
                  .slice(0, 2)
                  .map((post) => (
                    <BlogCard
                      key={post.slug}
                      post={{
                        title: post.metadata.title,
                        publishedAt: post.metadata.publishedAt,
                        summary: post.metadata.summary,
                        slug: post.slug,
                      }}
                    />
                  ))}
                <Link href="/blog" className="mt-4 block">
                  <RainbowButton className="w-full sm:w-[160px] px-4 py-2 group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-bold text-sm">
                    Read More Blogs
                  </RainbowButton>
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Contact</h2>

              <p className="text-muted-foreground">
                Always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach
                out!
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="mailto:abhishekbiradar@hotmail.com"
                  className="flex items-center gap-2 underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  <Icons.email className="size-4" />
                  abhishekbiradar@hotmail.com
                </a>

                <a
                  href={DATA.contact.social.X.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <DATA.contact.social.X.icon className="size-4" />
                  Connect on X
                </a>
              </div>
            </div>
          </BlurFade>
        </section>
        <footer className="mt-20 border-t py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    © {new Date().getFullYear()} {DATA.name}. All rights
                    reserved.
                  </p>
                  <p>
                    Open source under{" "}
                    <a
                      href="https://opensource.org/licenses/MIT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      MIT License
                    </a>
                    , available on{" "}
                    <a
                      href="https://github.com/seekernothing/prasendev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      GitHub
                    </a>
                    , and{" "}
                    <a
                      href="https://cloud.umami.is/analytics/eu/share/UgmoNDJoNpUy3N8n?date=0week"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      Analytics
                    </a>
                  </p>
                </div>
                {/* <div className="flex space-x-4">
                  <Link
                    href="/sitemap.xml"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Sitemap
                  </Link>
                  <Link
                    href="/rss.xml"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    RSS
                  </Link>
                </div> */}
              </div>
            </div>
          </BlurFade>
        </footer>
      </main>
    </>
  );
}
