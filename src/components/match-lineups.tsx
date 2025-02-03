import { Match } from "@/types/match";

interface MatchProps {
  game: Match;
}

export default function MatchLineups({ game }: MatchProps) {
  const homeLineup = game.lineups?.find(
    (lineup) => lineup.team.id === game.teams.home.id,
  );
  const awayLineup = game.lineups?.find(
    (lineup) => lineup.team.id === game.teams.away.id,
  );

  const shortenName = (fullName: string | null | undefined): string => {
    if (!fullName) return "";

    const nameParts = fullName.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}. ${nameParts.slice(1).join(" ")}`
      : fullName;
  };

  const homeSubs = homeLineup?.substitutes;
  const awaySubs = awayLineup?.substitutes;

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
      <div className="mx-auto flex w-11/12 gap-4 font-heading text-lg">
        {/* Home team */}
        <div className="flex flex-1 flex-col gap-4 text-left">
          <div className="">
            <h4 className="mb-2 underline">Coach</h4>
            <p className="mt-1 font-body text-sm font-light italic">
              {homeLineup?.coach.name}
            </p>
          </div>
          <div className="">
            <h4 className="mb-2 underline">Starting 11</h4>
            <ul className="mt-1">
              {homeLineup?.startXI.map((player) => (
                <li
                  key={player.player.id}
                  className="flex gap-4 font-body text-sm font-light italic"
                >
                  <p className="w-3 font-heading text-base not-italic">
                    {player.player.number}
                  </p>{" "}
                  <p>{shortenName(player.player.name)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h4 className="mb-2 underline">Substitutes</h4>
            <ul>
              {homeSubs?.map((player) => (
                <li
                  key={player.player.id}
                  className="mt-1 flex gap-4 font-body text-sm font-light italic"
                >
                  <p className="w-3 font-heading text-base not-italic">
                    {player.player.number}
                  </p>{" "}
                  <p>{shortenName(player.player.name)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Away team */}
        <div className="flex flex-1 flex-col gap-4 text-right">
          <div className="text-right">
            <h4 className="mb-2 underline">Coach</h4>
            <p className="mt-1 font-body text-sm font-light italic">
              {awayLineup?.coach.name}
            </p>
          </div>
          <div className="">
            <h4 className="mb-2 underline">Starting 11</h4>
            <ul className="mt-1">
              {awayLineup?.startXI.map((player) => (
                <li
                  key={player.player.id}
                  className="flex justify-end gap-4 font-body text-sm font-light italic"
                >
                  <p>{shortenName(player.player.name)}</p>
                  <p className="w-3 font-heading text-base not-italic">
                    {player.player.number}
                  </p>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h4 className="mb-2 underline">Substitutes</h4>
            <ul>
              {awaySubs?.map((player) => (
                <li
                  key={player.player.id}
                  className="mt-1 flex justify-end gap-4 font-body text-sm font-light italic"
                >
                  <p>{shortenName(player.player.name)}</p>
                  <p className="w-3 font-heading text-base not-italic">
                    {player.player.number}
                  </p>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
