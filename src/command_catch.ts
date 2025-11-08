import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> { 
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("No pokemon specified!");
        return;
    }
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    // Use base experience to calculate difficulty
    const baseExp = pokemon.base_experience;
    const catchChance = Math.max(0.1, 1 - baseExp / 600); // baseExp ~50–600
    const roll = Math.random();
    if (roll < catchChance) {
        console.log(`${pokemonName} was caught!`);
        state.caughtPokemon[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}

