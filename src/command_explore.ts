import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> { 
    const areaName = args[0];
    if (!areaName) {
        console.log("No location specified!");
        return;
    }
    const location = await state.pokeAPI.fetchLocation(areaName);
    location.pokemon_encounters.forEach((enc) => console.log(enc["pokemon"]["name"]));
}

