import type { State } from "./state.js";

export async function commandMapb(state: State) {
    try {
        const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL ?? undefined);
        data.results.forEach((loc) => console.log(loc.name));
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous;
    } catch (err) {
        console.error("Error fetching locations:", (err as Error).message);
    }
}
