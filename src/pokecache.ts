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

    // Get the #startReapLoop started.
    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    // add a new entry to the cache
    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        // return this.#cache.get(key);
        const entry = this.#cache.get(key);
        if (!entry) return undefined;
        return entry.val; 
    }

    // Loop through the cache and delete any entries that are older than Date.now() - #interval.
    #reap(): void {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < now - this.#interval) {
                this.#cache.delete(key)
            }
        }
    }

    // Call #reap() every #interval milliseconds and store the interval ID in #reapIntervalID.
    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    // Stop the reap loop and set #reapIntervalId back to undefined.
    stopReapLoop(): void {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}