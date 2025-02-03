import Image from "next/image";
import { Match } from "@/types/match";

interface MatchProps {
  game: Match;
}

// Main MatchCard Component
export default function MatchCard({ game }: MatchProps) {
  return (
    <div className="match-card mx-auto -mt-8 flex w-11/12 flex-col gap-12 rounded-lg bg-[#f0efef] py-4 drop-shadow-xl dark:bg-[#202020]">
      {/* Teams & Score top display */}
      <MatchScore game={game} />

      {/* Match Goals */}
      <div className="mx-auto grid w-full grid-cols-[1.5fr,0.5fr,1.5fr] gap-5">
        {/* Home Team Goals */}
        <MatchGoals game={game} teamType="home" />

        {/* Middle Separator Image */}
        <div className="flex items-start justify-center">
          <Image
            src="/ball.svg"
            alt="Ball"
            width={20}
            height={20}
            className="dark:hidden"
          />
          <Image
            src="/ball-white.svg"
            alt="Ball"
            width={20}
            height={20}
            className="hidden dark:block"
          />
        </div>

        {/* Away Team Goals */}
        <MatchGoals game={game} teamType="away" />
      </div>
    </div>
  );
}

// Component for displaying the teams and score
function MatchScore({ game }: { game: Match }) {
  return (
    <div className="score-container mx-auto flex w-10/12 items-center justify-between">
      {/* Home Team Logo */}
      <Image
        src={game.teams.home.logo}
        alt={`${game.teams.home.name} logo`}
        width={30}
        height={30}
        className="w-10"
      />

      {/* Score Display */}
      <div className="-mb-7 flex flex-col items-center justify-center gap-2">
        <p className="flex gap-1 font-heading text-3xl">
          {game.goals.home} - {game.goals.away}
        </p>

        {/* Match Status (HT, FT, Elapsed Time) */}
        <MatchStatus status={game.fixture.status} />
      </div>

      {/* Away Team Logo */}
      <Image
        src={game.teams.away.logo}
        alt={`${game.teams.away.name} logo`}
        width={30}
        height={30}
        className="w-10"
      />
    </div>
  );
}

// Component for displaying the match status (HT, FT, or elapsed time)
function MatchStatus({
  status,
}: {
  status: { short: string; elapsed?: number | null; extra?: number | null };
}) {
  return (
    <p className="flex gap-1 font-body text-sm font-light italic">
      {status.short === "HT"
        ? "HT"
        : status.short === "FT"
          ? "FT"
          : `${status.elapsed ?? 0}'`}{" "}
      {status.short !== "HT" && status.short !== "FT" && status.extra && (
        <span className="text-xs">+{status.extra}</span>
      )}
    </p>
  );
}

// Component for listing goal events for both teams
function MatchGoals({
  game,
  teamType,
}: {
  game: Match;
  teamType: "home" | "away";
}) {
  const isHome = teamType === "home"; // Check if the team is the home team

  // Filter goal events so only goal events are included
  const goalEvents = game.events.filter(
    (event) =>
      event.type === "Goal" && event.team.id === game.teams[teamType].id,
  );

  // No goals scored, return an empty div
  if (goalEvents.length === 0) return <div></div>;

  return (
    <div
      className={`flex flex-col ${isHome ? "items-end" : "items-start"} space-y-2`}
    >
      {goalEvents.map((event, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Home Team */}
          {isHome && (
            <p className="font-heading text-base">{event.player.name}</p>
          )}
          {/* Time of Goal (always displayed towards the middle) */}
          <span className="font-heading text-[#999999]">
            {event.time.elapsed}'
          </span>
          {/* Away Team */}
          {!isHome && (
            <p className="font-heading text-base">{event.player.name}</p>
          )}
        </div>
      ))}
    </div>
  );
}
