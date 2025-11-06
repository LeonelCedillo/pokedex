export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}


export class Cache {
    // private map to hold all cache entries
    #cache = new Map<string, CacheEntry<any>>();
    // We'll use this as a timer to know when to clean up old entries.
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    // Field to hold the interval (in milliseconds) for the timer.
    #interval: number;

    // add a new entry to the cache
    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.#cache.get(key);
    }
}