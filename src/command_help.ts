import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();
  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
  console.log();
}
