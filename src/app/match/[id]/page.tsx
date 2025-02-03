// import match from "../../data/match.json";
import { Match } from "@/types/match";
import { getMatchDetails } from "@/actions/live.actions";
import Score from "@/components/match-score";
import Filter from "@/components/filter";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getStandings } from "@/actions/standings.actions";
import { leagueIdToCode } from "@/app/utils/leagues"; // Import the mapping

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const fixture = parseInt(id);
  const data = await getMatchDetails(fixture);

  const game: Match | undefined = data?.response?.[0];

  // Extract the league ID from the match API response
  const leagueId = game.league.id;

  // Convert the league ID to a league code for the standings API
  const leagueCode = leagueIdToCode[leagueId];

  // Fetch the correct standings if the league code is found
  const standings = leagueCode
    ? (await getStandings(leagueCode)).response?.standings?.[0]?.table || []
    : [];

  // const game = match.find((match) => match.fixture.id === parseInt(params.id));

  if (!game) {
    return <div className="text-center text-red-500">Match not found!</div>;
  }

  return (
    <div className="pb-10">
      {/* Match Header */}
      <div className="h-36 rounded-b-3xl bg-[#1D3461]">
        <div className="mx-auto grid h-full w-11/12 grid-cols-3 items-center justify-center">
          <Link
            href="/"
            className="flex items-center justify-self-start rounded-full bg-white p-2 text-black"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="justify-self-center text-nowrap text-center text-3xl text-white">
            Match Details
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Match Score & Goals */}
        <Score game={game} />

        {/* Filter */}
        <Filter game={game} standings={standings} />
      </div>
    </div>
  );
}
