"use client";

import React from "react";
import HeatMap, { type SVGProps } from "@uiw/react-heat-map";
import { BorderBeam } from "@/components/magicui/border-beam";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
}

export function GithubContributions() {
  const [contributions, setContributions] = React.useState<ContributionDay[]>(
    []
  );
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hoveredText, setHoveredText] = React.useState("");

  React.useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((data) => {
        setContributions(
          (data.contributions ?? []).filter(
            (d: ContributionDay) => d.count > 0
          )
        );
        setTotal(data.totalContributions ?? 0);
        setHoveredText(
          `${data.totalContributions} contributions in the last year`
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Calculate exact SVG width:
  // initStartDate = previous Sunday of oneYearAgo
  const dayOfWeek = oneYearAgo.getDay();
  const initStart = new Date(
    oneYearAgo.getTime() - dayOfWeek * 24 * 60 * 60 * 1000
  );
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksNeeded =
    Math.ceil((today.getTime() - initStart.getTime()) / msPerWeek) + 1;
  // rectSize=14, space=4, leftPad=5 (weekLabels=false)
  const svgWidth = weeksNeeded * (14 + 4) + 5;

  const defaultText = `${total} contributions in the last year`;

  /* eslint-disable react/display-name */
  const renderRect =
    (handleMouseEnter: (text: string) => void): SVGProps["rectRender"] =>
    (props, data) => {
      const date = new Date(data.date);
      const day = date.getDate();
      const suffix =
        day >= 11 && day <= 13
          ? "th"
          : (["th", "st", "nd", "rd"][day % 10] ?? "th");
      const formattedDate =
        date.toLocaleDateString("en-US", { day: "numeric", month: "long" }) +
        suffix;
      const tileInfo = `${data.count ? data.count : "No"} contributions on ${formattedDate}`;
      return (
        <rect
          className="transition-all hover:brightness-125"
          onMouseEnter={() => handleMouseEnter(tileInfo)}
          {...props}
        />
      );
    };
  /* eslint-enable react/display-name */

  if (loading) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl mt-2">
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-purple-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-pink-500 to-transparent"
      />
      <motion.div
        className="w-full rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-muted-foreground mb-3 min-h-[20px] transition-all duration-150">
          {hoveredText}
        </p>
        <div className="w-full overflow-x-auto">
          <HeatMap
            startDate={oneYearAgo}
            endDate={today}
            onMouseLeave={() => setHoveredText(defaultText)}
            value={contributions}
            weekLabels={false}
            monthLabels={[
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ]}
            legendCellSize={0}
            space={4}
            style={{ color: "#9ca3af" }}
            rectProps={{ rx: 4 }}
            rectSize={14}
            width={svgWidth}
            panelColors={{
              0: "#161b22",
              1: "#0e4429",
              4: "#006d32",
              8: "#26a641",
              12: "#39d353",
            }}
            rectRender={renderRect((text) => setHoveredText(text))}
          />
        </div>
      </motion.div>
    </div>
  );
}
