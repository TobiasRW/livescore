import Image from "next/image";
import { Table } from "@/types/standings"; // Import the Table type

// Define the props for the component
interface StandingsProps {
  standings: Table;
}

export default function Standings({ standings }: StandingsProps) {
  if (!standings || standings.standings.length === 0) {
    return <p>No standings data available for this league</p>;
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] pb-6 drop-shadow-xl dark:bg-[#202020]">
      <div className="flex justify-between rounded-t-lg bg-blue px-5 py-4 text-white">
        <div className="font-heading">
          <p>Team</p>
        </div>
        <div className="flex w-24 items-center justify-end gap-6 font-heading">
          <p className="w-8">P</p>
          <p className="w-8">W</p>
          <p className="w-8">Pts</p>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col gap-4 px-5 font-heading">
        {standings.standings.map((team) => (
          <div
            key={team.team.id}
            className="flex justify-between border-b-[.5px] border-black pb-2 dark:border-white"
          >
            <div className="flex gap-2">
              <p className="w-4">{team.position}</p>
              <Image
                src={team.team.crest}
                alt={team.team.name}
                width={30}
                height={30}
                className="w-6"
              />
              <p>{team.team.shortName}</p>
            </div>
            <div className="flex w-24 items-center justify-end gap-6">
              <p className="w-8">{team.playedGames}</p>
              <p className="w-8">{team.won}</p>
              <p className="w-8">{team.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
