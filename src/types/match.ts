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
