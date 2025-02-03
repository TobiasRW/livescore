import { Match } from "@/types/match";
import { getLiveScores } from "../actions/live.actions";
import MatchCard from "@/components/match-card";

export const revalidate = 60; // // revalidate the page after 60 seconds

export default async function Home() {
  const data = await getLiveScores(); // Fetch live match data from the API

  // matches is type Match[] (array of matches) from the Match interface. Default to empty array in case of falsy value
  // saves the response data from the API to the matches variable
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
          // If live matches are available, display them
          matches.map((match: Match) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          // If no live matches are available, display this message
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
