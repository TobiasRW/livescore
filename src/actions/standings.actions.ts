"use server";

export async function getStandings(league: string) {
  try {
    const url = `https://api.football-data.org/v4/competitions/${league}/standings`;

    const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN;
    if (!API_KEY) {
      throw new Error("Missing API key for Football API");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);
    return { response: data };
  } catch (error) {
    console.log("Error in getStandings", error);
    return { response: [] };
  }
}
