import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { DATA } from "@/data/resume";
import { VideoSkeleton } from "@/components/skeletons/video-skeleton";

export const metadata = {
  title: "Videos",
  description:
    "Watch my latest videos about software development and technology.",
};

const BLUR_FADE_DELAY = 0.04;

const VideoCard = dynamic(
  () => import("@/components/video-card").then((mod) => mod.VideoCard),
  {
    loading: () => <VideoSkeleton />,
  }
);

export default function VideosPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="videos">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                My Videos
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Latest Videos
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Watch my latest videos about software development and
                technology.
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid gap-6 sm:grid-cols-2">
          {(Array.isArray(DATA.videos) ? DATA.videos : []).map(
            (video: any, idx: number) => (
              <BlurFade
                key={video?.url ?? idx}
                delay={BLUR_FADE_DELAY * (idx + 2)}
              >
                <VideoCard video={video} />
              </BlurFade>
            )
          )}
        </div>
      </section>
    </main>
  );
}
