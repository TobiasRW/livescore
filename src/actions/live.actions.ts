"use server";
import { ApiResponse, Match } from "@/types/match";
// import { revalidatePath } from "next/cache";

// Leagues: 39, 40, 2, 3, 848, 135, 140, 78, 1, 4, 61, 119,

export async function getLiveScores(): Promise<ApiResponse> {
  try {
    const url = "https://v3.football.api-sports.io/fixtures?live=all";

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const leagues = [39, 40, 2, 3, 848, 135, 140, 78, 1, 4, 61, 119];

    const liveScores = data.response.filter((match: any) =>
      leagues.includes(match.league.id),
    );

    return { response: liveScores };
  } catch (error) {
    console.log("Error in getLiveScores", error);
    return { response: [] };
  }
}

export async function getMatchDetails(
  id: number,
): Promise<{ response: Match[] }> {
  try {
    const url = `https://v3.football.api-sports.io/fixtures?id=${id}`;

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch match details (status: ${response.status})`,
      );
    }

    const data = await response.json();
    return { response: data.response || [] }; // Ensures a valid array is always returned
  } catch (error) {
    console.error("Error in getMatchDetails:", error);
    return { response: [] }; // Prevents UI crashes by returning a safe fallback
  }
}
