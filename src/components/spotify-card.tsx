"use client";

import useSWR from "swr";
import { cn } from "@/lib/utils";
import { SpotifyData } from "@/lib/spotify";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.66 0 12 0m5.521 17.34c-.24.359-.66.48-1.021.24c-2.82-1.74-6.36-2.101-10.561-1.141c-.418.122-.779-.179-.899-.539c-.12-.421.18-.78.54-.9c4.56-1.021 8.52-.6 11.64 1.32c.42.18.479.659.301 1.02m1.44-3.3c-.301.42-.841.6-1.262.3c-3.239-1.98-8.159-2.58-11.939-1.38c-.479.12-1.02-.12-1.14-.6s.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2m.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721c-.18-.601.18-1.2.72-1.381c4.26-1.26 11.28-1.02 15.721 1.621c.539.3.719 1.02.419 1.56c-.299.421-1.02.599-1.559.3"
      ></path>
    </svg>
  );
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SpotifyCard({ initialData }: { initialData?: SpotifyData }) {
  const { data, error } = useSWR<SpotifyData>("/api/spotify", fetcher, {
    refreshInterval: 10000,
    fallbackData: initialData,
  });

  if (error || !data) {
    return (
      <div className="w-full h-[120px] rounded-xl bg-muted animate-pulse" />
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        {data.isPlaying ? "vibing to :" : "last played : "}
      </h2>
      <div className="relative overflow-hidden rounded-xl">
      <BorderBeam
        duration={8}
        size={200}
        className="from-transparent via-green-500 to-transparent"
      />
      <motion.div
        className="w-full overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={data.songUrl || "#"}
          target="_blank"
          className={cn(
            "group relative flex h-full items-center gap-x-4 p-4",
            "hover:bg-accent/50 transition-colors duration-300",
          )}
        >
          <div className="absolute right-4 top-4 text-[#1DB954]">
            <SpotifyIcon className="h-6 w-6" />
          </div>

          <div className="relative flex-shrink-0">
            {data.albumImageUrl ? (
              <Image
                src={data.albumImageUrl}
                alt="Album Art"
                width={80}
                height={80}
                className={cn(
                  "h-20 w-20 rounded-full object-cover shadow-md",
                  data.isPlaying && "animate-[spin_10s_linear_infinite]",
                )}
              />
            ) : (
              <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                <SpotifyIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h3 className="font-semibold text-base truncate pr-8">
              {data.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {data.artist}
            </p>
          </div>
        </Link>
      </motion.div>
    </div>
    </>
  );
}
