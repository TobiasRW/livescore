import Image from "next/image";
import Link from "next/link";
import { Match } from "@/types/match";

// Define the props for the 'MatchCard' component.
// 'match' must be of type 'Match' (a single match object).
type MatchCardProps = {
  match: Match;
};

// Match Card for displaying a live match on the home page
export default function MatchCard({ match }: MatchCardProps) {
  return (
    <Link
      href={`/match/${match.fixture.id}`}
      className="relative flex items-center gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]"
    >
      {/* Left Border Indicator */}
      <div className="left-0 top-0 h-20 w-2 rounded-r-lg bg-blueSec"></div>

      {/* Match Elapsed Time */}
      <div className="">
        <p className="text-center font-body text-xl text-blueSec">
          {match.fixture.status.short === "HT"
            ? "HT"
            : match.fixture.status.short === "FT"
              ? "FT"
              : `${match.fixture.status.elapsed ?? 0}'`}{" "}
          {match.fixture.status.short !== "HT" &&
            match.fixture.status.short !== "FT" &&
            match.fixture.status.extra && (
              <span className="text-xs">+{match.fixture.status.extra}</span>
            )}
        </p>
      </div>

      {/* Team Details and Scores */}
      <div className="flex w-full flex-col gap-5">
        {/* Home Team */}
        <div className="flex w-11/12 justify-between pr-2">
          <div className="flex items-center gap-4">
            <Image
              src={match.teams.home.logo}
              alt={`${match.teams.home.name} logo`}
              width={30}
              height={30}
              className="w-6"
            />
            <p className="truncate font-body">{match.teams.home.name}</p>
          </div>
          <p>{match.goals.home}</p>
        </div>

        <hr className="h-[1px] w-11/12 border-none bg-black dark:bg-neutral-600" />

        {/* Away Team */}
        <div className="flex w-11/12 justify-between pr-2">
          <div className="flex items-center gap-4">
            <Image
              src={match.teams.away.logo}
              alt={`${match.teams.away.name} logo`}
              width={30}
              height={30}
              className="w-6"
            />
            <p className="truncate font-body">{match.teams.away.name}</p>
          </div>
          <p>{match.goals.away}</p>
        </div>
      </div>
    </Link>
  );
}
