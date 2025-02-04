"use server";
import { ApiResponse, Match } from "@/types/match"; // Importing the types we need

// League references: 39, 40, 2, 3, 848, 135, 140, 78, 1, 4, 61, 119,

export async function getLiveScores(): Promise<ApiResponse> {
  try {
    // Endpoint for fetching live scores
    const url = "https://v3.football.api-sports.io/fixtures?live=all";

    // API key for the Football API (stored en environment variable)
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    // If the API key is missing, throw an error
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    // Fetch live scores from the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Headers required by the API
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response as JSON
    const data = await response.json();

    // An array of specific league id's
    const leagues = [
      39, 40, 2, 3, 848, 135, 140, 78, 1, 4, 61, 119, 94, 45, 48, 143, 81, 90,
    ];

    // Filter the live scores to only include matches from the leagues array
    const liveScores = data.response.filter((match: Match) =>
      leagues.includes(match.league.id),
    );

    // Return the filtered live scores. Repsonse is wrapped in an object to match the ApiResponse type
    return { response: liveScores };
  } catch (error) {
    console.log("Error in getLiveScores", error);
    return { response: [] };
  }
}

export async function getMatchDetails(id: number): Promise<ApiResponse> {
  try {
    // Endpoint for fetching match details
    const url = `https://v3.football.api-sports.io/fixtures?id=${id}`;

    // API key for the Football API (stored en environment variable)
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    // If the API key is missing, throw
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    // Fetch match details from the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Headers required by the API
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    // If the response is not ok, throw
    if (!response.ok) {
      throw new Error(
        `Failed to fetch match details (status: ${response.status})`,
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the match details. Repsonse is wrapped in an object to match the ApiResponse type
    return { response: data.response || [] }; // Return an empty array if no response
  } catch (error) {
    console.error("Error in getMatchDetails:", error);
    return { response: [] };
  }
}
