import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> { 
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("No pokemon specified!");
        return;
    }
    const pokemon = state.caughtPokemon[pokemonName];
    if (!pokemon) {
        console.log("You have not caught that pokemon");
        return;
    }
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    pokemon.stats.forEach((stat) => console.log(`  - ${stat.stat.name}: ${stat.base_stat}`));
    console.log("Types:");
    pokemon.types.forEach((type) => console.log(`  - ${type.type.name}`));
}

