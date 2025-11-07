import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> { 
    const areaName = args[0];
    if (!areaName) {
        console.log("No location specified!");
        return;
    }
    const location = await state.pokeAPI.fetchLocation(areaName);
    console.log(`Exploring ${areaName}...`);
    console.log("Found Pokemon:");
    location.pokemon_encounters.forEach((enc) => { 
        const pokemonName = enc["pokemon"]["name"];
        console.log(` - ${pokemonName}`)
    });
}

