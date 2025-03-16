"use server";
import { ApiResponse, Table } from "@/types/standings"; // Importing the types we need

export async function getStandings(league: string): Promise<ApiResponse> {
  try {
    // Endpoint for fetching standings
    const url = `https://api.football-data.org/v4/competitions/${league}/standings`;

    // API key for the Football API (stored en environment variable)
    const API_KEY = process.env.API_TOKEN;

    // If the API key is missing, throw an error
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    // Fetch standings from the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Headers required by the API
        "X-Auth-Token": API_KEY,
      },
    });

    // If the response is not ok, throw
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response as JSON
    const data = await response.json();

    // Extract the standings from the response
    const table: Table = { standings: data.standings[0]?.table || [] };

    // Return the standings. Repsonse is wrapped in an object to match the ApiResponse type
    return { response: table };
  } catch (error) {
    console.log("Error in getStandings", error);
    return { response: { standings: [] } };
  }
}
