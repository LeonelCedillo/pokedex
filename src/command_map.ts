import type { State } from "./state.js";
import { PokeAPI, type ShallowLocations,  type Location} from "./pokeapi.js";

export function commandMap(state: State) {
    const pokeAPI = new PokeAPI();
    const baseURL = pokeAPI.getBaseURL();
    const url = baseURL + "/location-area/id/";
}
