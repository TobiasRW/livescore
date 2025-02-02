"use client";

import { useState } from "react";
import Timeline from "@/components/match-timeline";
import ShortStats from "@/components/stats-short";
import FullStats from "@/components/match-stats";
import Lineups from "@/components/match-lineups";
import { Match } from "@/types/match";

interface MatchFilterProps {
  game: Match | undefined;
}

export default function Filter({ game }: MatchFilterProps) {
  type FilterType = "Timeline" | "Stats" | "Line-ups";
  const [activeFilter, setActiveFilter] = useState<FilterType>("Timeline");

  // Render the selected content
  const filteredContent = () => {
    if (!game) {
      return (
        <div className="text-center text-red-500">No match data available</div>
      );
    }
    switch (activeFilter) {
      case "Timeline":
        return (
          <div className="flex flex-col gap-8">
            <Timeline game={game} />
            <ShortStats game={game} />
          </div>
        );
      case "Stats":
        return <FullStats game={game} />;
      case "Line-ups":
        return <Lineups game={game} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-8">
      {/* Filter Buttons */}
      <div className="flex justify-between gap-4 text-center">
        <button
          className={`${
            activeFilter === "Timeline"
              ? "bg-blue text-white"
              : "bg-[#f0efef] text-black dark:bg-[#202020] dark:text-white"
          } w-1/3 rounded-full px-4 py-2 drop-shadow-xl`}
          onClick={() => setActiveFilter("Timeline")}
        >
          Timeline
        </button>
        <button
          className={`${
            activeFilter === "Stats"
              ? "bg-blue text-white"
              : "bg-[#f0efef] text-black dark:bg-[#202020] dark:text-white"
          } w-1/3 rounded-full px-4 py-2 drop-shadow-xl`}
          onClick={() => setActiveFilter("Stats")}
        >
          Stats
        </button>
        <button
          className={`${
            activeFilter === "Line-ups"
              ? "bg-blue text-white"
              : "bg-[#f0efef] text-black dark:bg-[#202020] dark:text-white"
          } w-1/3 rounded-full px-4 py-2 drop-shadow-xl`}
          onClick={() => setActiveFilter("Line-ups")}
        >
          Line-ups
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="">{filteredContent()}</div>
    </div>
  );
}
