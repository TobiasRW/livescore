import { Match } from "@/types/match";
import { getLiveScores } from "../actions/live.actions";
import MatchCard from "@/components/match-card";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 60;

export default async function Home() {
  const data = await getLiveScores(); // Fetch live match data from the API

  // matches is type Match[] (array of matches) from the Match interface. Default to empty array in case of falsy value
  // saves the response data from the API to the matches variable
  const matches: Match[] = data?.response || [];

  return (
    <div>
      <div className="flex h-36 flex-col items-center justify-center gap-4 rounded-b-3xl bg-[#1D3461] sm:h-56">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <h1 className="text-3xl text-white sm:text-4xl">Live Scores</h1>
        </div>
      </div>
      {/* Matches List */}
      <div className="mx-auto flex w-11/12 max-w-[500px] flex-col gap-8 pt-8">
        {matches.length > 0 ? (
          // If live matches are available, display them
          matches.map((match: Match) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          // If no live matches are available, display this message

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
              <p className="mx-auto w-11/12 text-center font-body text-sm font-semibold italic text-black sm:text-base dark:text-white">
                No live matches currently available at this time 😢
              </p>
              <p className="mx-auto w-11/12 text-center font-body text-sm font-light italic text-black dark:text-white">
                To see a demo of the app in action, you can see stats from
                previous matches below:
              </p>
              <div className="flex gap-4">
                <Link
                  href="/match/1213921"
                  className="flex items-center rounded-lg bg-[#1D3461] px-4 py-2 font-heading text-sm text-white"
                >
                  Match 1
                </Link>
                <Link
                  href="/match/1223823"
                  className="flex items-center rounded-lg bg-[#1D3461] px-4 py-2 font-heading text-sm text-white"
                >
                  Match 2
                </Link>
                <Link
                  href="/match/1212931"
                  className="flex items-center rounded-lg bg-[#1D3461] px-4 py-2 font-heading text-sm text-white"
                >
                  Match 3
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-[#f0efef] py-6 drop-shadow-xl dark:bg-[#202020]">
              <div className="mx-auto w-11/12 font-body text-sm font-medium italic text-black sm:text-base dark:text-white">
                <p> This app shows live scores from the following leagues:</p>
                <ul className="mt-2 flex flex-col gap-1 font-light">
                  <li>1. UEFA Champions League 🇪🇺</li>
                  <li>2. UEFA Europa League 🇪🇺</li>
                  <li>3. UEFA Conference League 🇪🇺</li>
                  <li>4. FIFA World Cup 🇪🇺</li>
                  <li>5. European Championship 🇪🇺</li>
                  <li>6. Dansih Superliga 🇩🇰</li>
                  <li>7. English Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿</li>
                  <li>8. English Championship 🏴󠁧󠁢󠁥󠁮󠁧󠁿</li>
                  <li>9. Spanish La Liga 🇪🇸</li>
                  <li>10. Italian Serie A 🇮🇹</li>
                  <li>11. German Bundesliga 🇩🇪</li>
                  <li>12. French Ligue 1 🇫🇷</li>
                  <li>13. Portuguese Primeira Liga 🇵🇹</li>
                </ul>
                <br />
                <p>Come back later to check for live scores and stats! 🕒</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
