"use client";
import Image from "next/image";
import matches from "../app/data/livescores.json";
import Link from "next/link";

export default function Home() {
  interface Match {
    fixture: {
      id: number;
      status: {
        long: string;
        short: string;
        elapsed: number | null;
      };
    };
    league: {
      id: number;
      name: string;
      country: string;
    };
    teams: {
      home: {
        id: number;
        name: string;
        logo: string;
      };
      away: {
        id: number;
        name: string;
        logo: string;
      };
    };
    goals: {
      home: number | null;
      away: number | null;
    };
  }

  return (
    <div>
      <div className="flex h-32 flex-col items-center justify-center gap-4 rounded-b-3xl bg-[#1D3461]">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/pl.svg"
            alt="Premier League Logo"
            width={20}
            height={20}
          />
          <h1 className="text-3xl text-white">Live Scores</h1>
        </div>
      </div>
      <div className="mx-auto flex w-11/12 flex-col gap-8 pt-8">
        {matches.map((match: Match) => (
          <Link
            href={`/match/${match.fixture.id}`}
            className="relative flex items-center gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]"
            key={match.fixture.id}
          >
            <div className="abosulte bg-blueSec left-0 top-0 h-20 w-2 rounded-r-lg"></div>
            <div className="">
              <p className="text-blueSec text-center font-body text-xl">
                {match.fixture.status.elapsed}'
              </p>
            </div>
            <div className="flex w-full flex-col gap-5">
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
        ))}
      </div>
    </div>
  );
}
