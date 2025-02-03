import Image from "next/image";
import { Match, Event } from "@/types/match";

interface MatchProps {
  game: Match;
}

// Main MatchTimeline Component
// This component maps over the events of the match and renders each one using the MatchEvent component.
export default function MatchTimeline({ game }: MatchProps) {
  return (
    <div className="timeline-container mx-auto flex w-full flex-col gap-6 rounded-lg bg-[#f0efef] pb-6 pt-3 drop-shadow-xl dark:bg-[#202020]">
      <div className="flex items-center justify-center">
        <p className="mx-2 px-3 py-2 font-heading text-sm text-black dark:text-white">
          Match Start
        </p>
      </div>
      <div className="timeline-content mx-auto flex w-10/12 flex-col gap-4">
        {game.events.map((event, index) => (
          <MatchEvent
            key={index}
            event={event}
            game={game}
            prevEvent={game.events[index - 1]}
          />
        ))}
      </div>
    </div>
  );
}

// MatchEvent Component
// Renders each match event while handling event positioning (home vs. away).
// Also inserts a half-time separator when the second half starts.
function MatchEvent({
  event,
  game,
  prevEvent,
}: {
  event: Event;
  game: Match;
  prevEvent?: Event;
}) {
  // Determine if the event is in the second half
  const isSecondHalfStart =
    event.time.elapsed > 45 && (prevEvent?.time.elapsed ?? 0) <= 45; // if the event is after 45 minutes and the previous event is before 45 minutes

  // Determine if the event belongs to the home or away team
  const isHomeTeam = event.team.id === game.teams.home.id;

  return (
    <div>
      {/* Display Half-Time Separator if this is the start of the second half */}
      {isSecondHalfStart && <HalfTimeSeparator />}

      {/* Event Container - aligns events to the left for home team and right for away team */}
      <div
        className={`flex w-full ${isHomeTeam ? "items-start justify-start" : "items-end justify-end"}`}
      >
        <div className="flex items-center gap-2">
          {/* Show event details for home team before the time */}
          {isHomeTeam && <EventDetails event={event} />}

          {/* Show event time in the center */}
          <EventTime time={event.time} />

          {/* Show event details for away team after the time */}
          {!isHomeTeam && <EventDetails event={event} />}
        </div>
      </div>
    </div>
  );
}

// HalfTimeSeparator Component
// Renders a visual separator to indicate the start of the second half.
function HalfTimeSeparator() {
  return (
    <div className="mb-8 mt-4 flex items-center">
      <div className="h-[1px] w-full bg-black dark:bg-white"></div>
      <p className="mx-2 rounded-full border border-black px-3 py-2 font-heading text-sm text-black dark:border-white dark:text-white">
        HT
      </p>
      <div className="h-[1px] w-full bg-black dark:bg-white"></div>
    </div>
  );
}

// EventDetails Component
// Displays event information such as player name and corresponding event icon (goal, card, substitution).
function EventDetails({ event }: { event: Event }) {
  return (
    <>
      {/* Player Name */}
      <p
        className={`font-heading text-base ${event.type === "subst" && event.assist?.name ? "text-green-600 dark:text-green-700" : "text-black dark:text-white"}`} // green text for incoming player in substitution
      >
        {event.player.name}
      </p>

      {/* Event Icon (Goal, Card, Substitution) */}
      {getEventIcon(event)}
    </>
  );
}

// EventTime Component
// Displays the time of an event, including extra time if applicable.
function EventTime({
  time,
}: {
  time: { elapsed: number; extra?: number | null };
}) {
  return (
    <p className="flex gap-1 font-heading text-[#999999]">
      {time.elapsed}&#39;
      {time.extra !== null && time.extra !== undefined && (
        <span className="mt-[2px] text-xs">+{time.extra}</span>
      )}
    </p>
  );
}

// getEventIcon Function
// Returns the appropriate icon or visual indicator for a given event type (goal, card, substitution).
function getEventIcon(event: Event) {
  switch (event.type) {
    case "Goal":
      return (
        <>
          <Image
            src="/ball.svg"
            alt="Goal"
            width={20}
            height={20}
            className="w-4 dark:hidden"
          />
          <Image
            src="/ball-white.svg"
            alt="Goal"
            width={20}
            height={20}
            className="hidden w-4 dark:block"
          />
        </>
      );

    case "Card":
      return (
        <div
          className={`h-4 w-3 ${event.detail === "Yellow Card" ? "bg-yellow-300" : "bg-red-500"}`}
        ></div>
      );

    case "subst":
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/subst.svg"
            alt="Substitution"
            width={20}
            height={20}
            className={`w-4 ${event.team.id ? "rotate-180" : ""} transform`}
          />
          {/* Display the player being substituted with red text */}
          <p className="font-heading text-base text-red-600 dark:text-red-700">
            {event.assist?.name}
          </p>
        </div>
      );

    case "Var":
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/VAR.svg"
            alt="VAR"
            width={20}
            height={20}
            className="w-6"
          />
          <p className="text-xs italic text-black dark:text-white">
            {event.detail}
          </p>
        </div>
      );

    default:
      return null;
  }
}
