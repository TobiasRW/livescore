import Image from "next/image";
import { Match } from "@/types/match";
import { getLiveScores } from "../actions/live.actions";
import MatchCard from "@/components/match-card";

export default async function Home() {
  const data = await getLiveScores();
  const matches: Match[] = data?.response || [];

  return (
    <div>
      <div className="flex h-36 flex-col items-center justify-center gap-4 rounded-b-3xl bg-[#1D3461]">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl text-white">Live Scores</h1>
        </div>
      </div>
      {/* Matches List */}
      <div className="mx-auto flex w-11/12 flex-col gap-8 pt-8">
        {matches.length > 0 ? (
          matches.map((match: Match) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          <div className="">
            <p className="text-center text-gray-500">
              No live matches currently available. Come back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
