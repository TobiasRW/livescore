// Description: This file contains the types used to represent a match/fixture. The structure of the interfaces is based on the API response from api-football.com

// Interface to represent a football team
export interface Team {
  id: number; // The team id
  name: string; // The name of the team ´
  logo: string; // The URL to the team's logo
}

// Interface to represent the current state of a fixture
export interface FixtureStatus {
  short: string; // The short status of the fixture (e.g. HT, FT)
  elapsed: number | null; // The number of minutes elapsed in the fixture
  extra?: number | null; // The number of minutes of extra time (optional)
}

// Interface to represent a statistic
export interface Statistic {
  type: string; // The type of statistic (e.g. "Shots on Goal")
  value: string | number; // The value of the statistic (e.g. 5 or "53%")
}

// Interface to represent a team's statistics
export interface TeamStatistics {
  team: Team; // which team the statistics belong to
  statistics: Statistic[]; // an array of statistics
}

// Interface to represent a player
export interface Player {
  id?: number | null; // The player id
  number?: number; // The player's shirt number
  name?: string | null; // The player's name
  pos?: string; // The player's position
}

// Interface to represent a coach
export interface Coach {
  id: number; // The coach id
  name: string; // The coach's name
}

// Interface to represent a lineup
export interface Lineup {
  team: Team; // The team
  formation: string; // The formation (e.g. "4-4-2")
  startXI: { player: Player }[]; // an array of starting players
  substitutes: { player: Player }[]; // an array of substitute players
  coach: Coach; // The coach
}

// Interface to represent an event that has occurred in a match
export interface Event {
  time: {
    elapsed: number; // The number of minutes elapsed in the fixture when the event occurred
    extra?: number | null; // The number of minutes of extra time when the event occurred (optional)
  };
  team: Team; // The team that the event belongs to
  player: Player; // The player involved in the event
  assist?: Player; // The player who assisted the event (optional)
  type: string; // The type of event (e.g. "Goal")
  detail: string; // The details of the event (e.g. "Penalty Confirmed")
}

// Interface to represent a match - Brings together all the information about a match/fixture
export interface Match {
  fixture: {
    // The fixture information
    id: number;
    status: FixtureStatus;
  };
  league: {
    // The league the fixture belongs to
    id: number;
    name: string;
  };
  teams: {
    // The teams playing in the fixture
    home: Team;
    away: Team;
  };
  goals: {
    // The goals scored by each team
    home: number | null;
    away: number | null;
  };
  statistics?: TeamStatistics[]; // an array of team statistics
  lineups?: Lineup[]; // an array of lineups
  events: {
    // an array of event objects
    time: {
      // The time the event occurred
      elapsed: number;
      extra?: number | null;
    };
    team: Team; // The team the event belongs to
    player: {
      // The player involved in the event
      id: number;
      name: string;
    };
    assist?: {
      // The player who assisted the event (optional)
      id?: number | null;
      name?: string | null;
    };
    type: string; // The type of event
    detail: string; // The details of the event
  }[];
}

// Interface to represent the response from the API. Shape mirrors the API response
export interface ApiResponse {
  response: Match[];
}
