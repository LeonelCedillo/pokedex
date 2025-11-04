import readline from "readline";

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter(word => word !== "");
}


export function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    
    rl.prompt();

    rl.on('line', (input) => {
        const cleaned = cleanInput(input);
        if (!cleaned) {
            rl.prompt();
            return;
        }
        
    });
}