import { error } from "console";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?limit=20`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            return result as ShallowLocations;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw error;
            } else {
                console.error(String(error));
                throw new Error("Unknown error fetching locations");
            }
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            return {
                id: result.id,
                name: result.name,
                location: {
                    name: result.location.name,
                    url: result.location.url,
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw error;
            } else {
                console.error(String(error));
                throw new Error("Unknown error fetching location");
            }
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    id: number;
    name: string;
    location: {
        name: string;
        url: string;
    };
};