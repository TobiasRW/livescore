import { Match } from "@/types/match";

interface MatchProps {
  game: Match;
}

export default function MatchStats({ game }: MatchProps) {
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

  const homeOffsides = getStat(game.teams.home.id, "Offsides");
  const awayOffsides = getStat(game.teams.away.id, "Offsides");
  const homeCorners = getStat(game.teams.home.id, "Corner Kicks");
  const awayCorners = getStat(game.teams.away.id, "Corner Kicks");
  const homeFouls = getStat(game.teams.home.id, "Fouls");
  const awayFouls = getStat(game.teams.away.id, "Fouls");
  const homeYellowCards = getStat(game.teams.home.id, "Yellow Cards");
  const awayYellowCards = getStat(game.teams.away.id, "Yellow Cards");
  const homeRedCards = getStat(game.teams.home.id, "Red Cards");
  const awayRedCards = getStat(game.teams.away.id, "Red Cards");
  const homePassPercentage = getStat(game.teams.home.id, "Passes %");
  const awayPassPercentage = getStat(game.teams.away.id, "Passes %");
  const homeSaves = getStat(game.teams.home.id, "Goalkeeper Saves");
  const awaySaves = getStat(game.teams.away.id, "Goalkeeper Saves");

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
      <div className="mx-auto flex w-11/12 flex-col gap-4 font-heading text-lg">
        {/* Possesion */}
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
        {/* Total shots */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeShots}</p>
          <p className="text-center">Total shots</p>
          <p className="text-right">{awayShots}</p>
        </div>
        {/* Shots on Goal */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeShotsOnGoal}</p>
          <p className="text-center">Shots on Goal</p>
          <p className="text-right">{awayShotsOnGoal}</p>
        </div>
        {/* Offsides */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeOffsides}</p>
          <p className="text-center">Offsides</p>
          <p className="text-right">{awayOffsides}</p>
        </div>
        {/* Corners */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeCorners}</p>
          <p className="text-center">Corners</p>
          <p className="text-right">{awayCorners}</p>
        </div>
        {/* Fouls */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeFouls}</p>
          <p className="text-center">Fouls</p>
          <p className="text-right">{awayFouls}</p>
        </div>
        {/* Yellow Cards */}
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-2 justify-self-start text-left">
            <p className="text-left">
              {homeYellowCards} <span className="text-sm font-light">x</span>
            </p>
            <div className="h-3 w-2 bg-yellow-300 shadow-md"></div>
          </div>
          <p className="text-center">Yellow Cards</p>
          <div className="flex items-center gap-2 justify-self-end text-right">
            <div className="h-3 w-2 bg-yellow-300 shadow-md"></div>
            <p className=" ">
              <span className="text-sm font-light">x </span>
              {awayYellowCards}
            </p>
          </div>
        </div>
        {/* Red Cards */}
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-2 justify-self-start text-left">
            <p className="text-left">
              {homeRedCards} <span className="text-sm font-light">x</span>
            </p>
            <div className="h-3 w-2 bg-red-600 shadow-md"></div>
          </div>
          <p className="text-center">Red Cards</p>
          <div className="flex items-center gap-2 justify-self-end text-right">
            <div className="h-3 w-2 bg-red-600 shadow-md"></div>
            <p className=" ">
              <span className="text-sm font-light">x </span>
              {awayRedCards}
            </p>
          </div>
        </div>
        {/* Pass Percentage */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homePassPercentage}</p>
          <p className="text-center">Pass Percentage</p>
          <p className="text-right">{awayPassPercentage}</p>
        </div>
        {/* Saves */}
        <div className="grid grid-cols-3 items-center">
          <p className="text-left">{homeSaves}</p>
          <p className="text-center">Goalkeeper Saves</p>
          <p className="text-right">{awaySaves}</p>
        </div>
      </div>
    </div>
  );
}
