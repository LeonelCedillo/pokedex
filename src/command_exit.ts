import type { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!");
  state.readline.close();
  process.exit(0);
}
