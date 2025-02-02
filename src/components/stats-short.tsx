import { Match } from "@/types/match";

interface MatchProps {
  game: Match;
}

export default function ShortStats({ game }: MatchProps) {
  const homePossession =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.home.id)
      ?.statistics.find((s) => s.type === "Ball Possession")?.value || "0%";

  const awayPossession =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.away.id)
      ?.statistics.find((s) => s.type === "Ball Possession")?.value || "0%";

  const homeShotsOffGoal =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.home.id)
      ?.statistics.find((s) => s.type === "Shots off Goal")?.value || "0";

  const awayShotsOffGoal =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.away.id)
      ?.statistics.find((s) => s.type === "Shots off Goal")?.value || "0";

  const homeShotsOnGoal =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.home.id)
      ?.statistics.find((s) => s.type === "Shots on Goal")?.value || "0";

  const awayShotsOnGoal =
    game.statistics
      ?.find((stat) => stat.team.id === game.teams.away.id)
      ?.statistics.find((s) => s.type === "Shots on Goal")?.value || "0";

  const homeShots = Number(homeShotsOffGoal) + Number(homeShotsOnGoal);
  const awayShots = Number(awayShotsOffGoal) + Number(awayShotsOnGoal);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
      <div className="mx-auto flex w-11/12 flex-col gap-4 font-heading text-lg">
        <div className="">
          <div className="grid w-full grid-cols-3 items-center">
            <p className="text-left font-medium">{homePossession}</p>
            <p className="text-center">Possession</p>
            <p className="text-right font-medium">{awayPossession}</p>
          </div>
          <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full">
            <div
              className="absolute left-0 h-full bg-blue"
              style={{ width: homePossession }}
            ></div>
            <div
              className="absolute right-0 h-full bg-[#DCDCDC]"
              style={{ width: awayPossession }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <p className="text-left font-medium">{homeShots}</p>
          <p className="text-center">Total shots</p>
          <p className="text-right font-medium">{awayShots}</p>
        </div>
        <div className="grid grid-cols-3 items-center">
          <p className="text-left font-medium">{homeShotsOnGoal}</p>
          <p className="text-center">Shots on Goal</p>
          <p className="text-right font-medium">{awayShotsOnGoal}</p>
        </div>
      </div>
    </div>
  );
}
