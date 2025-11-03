
export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter(word => word !== "");
}