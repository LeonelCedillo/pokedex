import type { State } from "./state.js";

export async function commandMapForward(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    locations.results.forEach((loc) => console.log(loc.name));
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}


export async function commandMapBack(state: State) {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    locations.results.forEach((loc) => console.log(loc.name));
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}