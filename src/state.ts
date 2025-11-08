import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type ShallowLocations,  type Location} from "./pokeapi.js";
import { Pokemon } from "./pokeapi.js";


export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    caughtPokemon: Record<string, Pokemon>;
};

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: "",
        prevLocationsURL: "",
        caughtPokemon: {},
    }
}

