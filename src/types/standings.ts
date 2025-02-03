// Description: This file contains the types used to represent the standings of a league. The structure of the interfaces is based on the API response from football-data.org

// Interface to represent a football team in the standings
export interface Team {
  id: number; // The team id
  name: string; // The name of the team
  shortName: string; // The short name of the team
  tla: string; // The three-letter abbreviation of the team
  crest: string; // The URL to the team's logo
}

// Interface to represent a row in the standings table
export interface StandingsTable {
  position: number; // The position in the standings
  team: Team;
  playedGames: number; // The number of games played
  won: number; // The number of games won
  draw: number; // The number of games drawn
  lost: number; // The number of games lost
  points: number; // The number of points
  goalsFor: number; // The number of goals scored
  goalsAgainst: number; // The number of goals conceded
  goalDifference: number; // The goal difference
}
