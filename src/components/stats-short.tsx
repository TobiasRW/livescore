import { Match } from "@/types/match";

interface MatchProps {
  game: Match;
}

export default function ShortStats({ game }: MatchProps) {
  const getStat = (teamId: number, statType: string) => {
    return (
      game.statistics
        ?.find((stat) => stat.team.id === teamId)
        ?.statistics.find((s) => s.type === statType)?.value || "0"
    );
  };

  const homePossession = getStat(game.teams.home.id, "Ball Possession");
  const awayPossession = getStat(game.teams.away.id, "Ball Possession");
  const homeShotsOffGoal = getStat(game.teams.home.id, "Shots off Goal");
  const awayShotsOffGoal = getStat(game.teams.away.id, "Shots off Goal");
  const homeShotsOnGoal = getStat(game.teams.home.id, "Shots on Goal");
  const awayShotsOnGoal = getStat(game.teams.away.id, "Shots on Goal");

  const homeShots = Number(homeShotsOffGoal) + Number(homeShotsOnGoal);
  const awayShots = Number(awayShotsOffGoal) + Number(awayShotsOnGoal);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
      <div className="mx-auto flex w-11/12 flex-col gap-4 font-heading text-lg">
        <div className="">
          <div className="grid w-full grid-cols-3 items-center">
            <p className="text-left">{homePossession}</p>
            <p className="text-center">Possession</p>
            <p className="text-right">{awayPossession}</p>
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
          <p className="text-left">{homeShots}</p>
          <p className="text-center">Total shots</p>
          <p className="text-right">{awayShots}</p>
        </div>
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeShotsOnGoal}</p>
          <p className="text-center">Shots on Goal</p>
          <p className="text-right">{awayShotsOnGoal}</p>
        </div>
      </div>
    </div>
  );
}
