export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra?: number | null;
}

export interface Statistic {
  type: string;
  value: string | number;
}

export interface TeamStatistics {
  team: Team;
  statistics: Statistic[];
}

export interface Player {
  id: number;
  number: number;
  name: string;
  pos: string;
}

export interface Coach {
  id: number;
  name: string;
  photo: string;
}

export interface Lineup {
  team: Team;
  formation: string;
  startXI: { player: Player }[];
  substitutes: { player: Player }[];
  coach: Coach;
}

export interface Event {
  time: {
    elapsed: number;
    extra?: number | null;
  };
  team: Team;
  player: {
    id: number;
    name: string;
  };
  assist?: {
    id?: number | null;
    name?: string | null;
  };
  type: string;
  detail: string;
}

export interface Match {
  fixture: {
    id: number;
    status: FixtureStatus;
  };
  league: {
    id: number;
    name: string;
    country: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  statistics?: TeamStatistics[];
  lineups?: Lineup[];
  events: {
    time: {
      elapsed: number;
      extra?: number | null;
    };
    team: Team;
    player: {
      id: number;
      name: string;
    };
    assist?: {
      id?: number | null;
      name?: string | null;
    };
    type: string;
    detail: string;
  }[];
}

export interface ApiResponse {
  response: Match[];
}
