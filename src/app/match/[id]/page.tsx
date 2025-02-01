import Image from "next/image";
// import match from "../../data/match.json";
import { Match } from "@/types/match";
import { getMatchDetails } from "@/actions/live.actions";
import Timeline from "@/components/match-timeline";
import Score from "@/components/match-score";

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const fixture = parseInt(id);
  const data = await getMatchDetails(fixture);

  const game: Match | undefined = data?.response?.[0];

  // const game = match.find((match) => match.fixture.id === parseInt(params.id));

  if (!game) {
    return <div className="text-center text-red-500">Match not found!</div>;
  }

  return (
    <div>
      {/* Match Header */}
      <div className="flex h-32 flex-col items-center justify-center gap-4 rounded-b-3xl bg-[#1D3461]">
        <h1 className="text-3xl text-white">Match Details</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Match Score & Goals */}
        <Score game={game} />

        {/* Game Timeline */}
        <Timeline game={game} />
      </div>
    </div>
  );
}
