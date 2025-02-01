"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import match from "../../data/match.json";

export default function MatchPage() {
  const { id } = useParams(); // Get the match ID from the URL
  const game = match.find((m) => m.fixture.id.toString() === id);

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
        <div className="mx-auto -mt-8 flex w-11/12 flex-col gap-12 rounded-lg bg-[#f0efef] py-4 drop-shadow-xl">
          <div className="mx-auto flex w-10/12 items-center justify-between">
            <Image
              src={game.teams.home.logo}
              alt={`${game.teams.home.name} logo`}
              width={30}
              height={30}
              className="w-10"
            />
            <div className="-mb-7 flex flex-col items-center justify-center gap-2">
              <p className="flex gap-1 font-heading text-3xl">
                {game.goals.home} - {game.goals.away}
              </p>
              <p className="flex gap-1 font-body text-sm font-light italic">
                {game.fixture.status.elapsed}'{" "}
                <span className="text-xs">{game.fixture.status.extra}</span>
              </p>
            </div>
            <Image
              src={game.teams.away.logo}
              alt={`${game.teams.away.name} logo`}
              width={30}
              height={30}
              className="w-10"
            />
          </div>

          <div className="mx-auto grid w-full grid-cols-[1.5fr,0.5fr,1.5fr] gap-5">
            {/* Home Team Events */}
            <div className="flex flex-col items-end space-y-2">
              {game.events
                .filter(
                  (event) =>
                    event.type === "Goal" &&
                    event.team.id === game.teams.home.id,
                )
                .map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <p className="font-heading text-base">
                      {event.player.name}
                    </p>
                    <span className="font-heading text-[#999999]">
                      {event.time.elapsed}'
                    </span>
                  </div>
                ))}
            </div>

            {/* Middle Separator */}
            <div className="flex items-start justify-center">
              <Image src="/ball.svg" alt="Ball" width={20} height={20} />
            </div>

            {/* Away Team Events */}
            <div className="flex flex-col items-start space-y-2">
              {game.events
                .filter(
                  (event) =>
                    event.type === "Goal" &&
                    event.team.id === game.teams.away.id,
                )
                .map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-heading text-[#999999]">
                      {event.time.elapsed}'
                    </span>
                    <p className="font-heading text-base">
                      {event.player.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Game Timeline */}
        <div className="mx-auto flex w-11/12 flex-col gap-6 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
          <div className="mx-auto flex w-10/12 flex-col gap-4">
            {game.events.map((event, index) => {
              const isSecondHalfStart =
                event.time.elapsed === 46 &&
                game.events[index - 1]?.time.elapsed < 46;

              return (
                <div key={index}>
                  {/* Separator for Second Half */}
                  {isSecondHalfStart && (
                    <div className="mb-8 mt-4 flex items-center">
                      <div className="h-[1px] w-full bg-black"></div>
                      <p className="mx-2 rounded-full border border-black px-3 py-2 font-heading text-sm text-black">
                        HT
                      </p>
                      <div className="h-[1px] w-full bg-black"></div>
                    </div>
                  )}

                  {/* Event Details */}
                  <div
                    className={`flex w-full ${
                      event.team.id === game.teams.home.id
                        ? "items-start justify-start"
                        : "items-end justify-end"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Home Team Events */}
                      {event.team.id === game.teams.home.id && (
                        <>
                          <p
                            className={`font-heading text-base ${
                              event.type === "subst" && event.assist?.name
                                ? "text-green-600"
                                : "text-black"
                            }`}
                          >
                            {event.player.name}
                          </p>

                          {event.type === "Goal" && (
                            <Image
                              src="/ball.svg"
                              alt="Goal"
                              width={20}
                              height={20}
                              className="w-4"
                            />
                          )}
                          {event.type === "Card" &&
                            event.detail === "Yellow Card" && (
                              <div className="h-4 w-3 bg-yellow-300"></div>
                            )}
                          {event.type === "Card" &&
                            event.detail === "Red Card" && (
                              <div className="h-4 w-3 bg-red-500"></div>
                            )}
                          {event.type === "subst" && (
                            <div className="flex items-center gap-2">
                              <Image
                                src="/subst.svg"
                                alt="Substitution"
                                width={20}
                                height={20}
                                className="w-4 rotate-180 transform"
                              />
                              <p className="font-heading text-base text-red-600">
                                {event.assist.name}
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      {/* Event Time */}
                      <p className="flex gap-1 font-heading text-[#999999]">
                        {event.time.elapsed}'{" "}
                        <span className="mt-[2px] text-xs">
                          {event.time.extra}
                        </span>
                      </p>

                      {/* Away Team Events */}
                      {event.team.id === game.teams.away.id && (
                        <>
                          {event.type === "Goal" && (
                            <Image
                              src="/ball.svg"
                              alt="Goal"
                              width={20}
                              height={20}
                              className="w-4"
                            />
                          )}
                          {event.type === "Card" &&
                            event.detail === "Yellow Card" && (
                              <div className="h-4 w-3 bg-yellow-300"></div>
                            )}
                          {event.type === "Card" &&
                            event.detail === "Red Card" && (
                              <div className="h-4 w-3 bg-red-500"></div>
                            )}
                          {event.type === "subst" && (
                            <div className="flex items-center gap-2">
                              <p className="font-heading text-base text-red-600">
                                {event.assist.name}
                              </p>
                              <Image
                                src="/subst.svg"
                                alt="Substitution"
                                width={20}
                                height={20}
                                className="w-4"
                              />
                            </div>
                          )}
                          <p
                            className={`font-heading text-base ${
                              event.type === "subst" && event.assist?.name
                                ? "text-green-600"
                                : "text-black"
                            }`}
                          >
                            {event.player.name}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
