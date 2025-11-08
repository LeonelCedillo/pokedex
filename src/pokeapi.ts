import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      const locations: ShallowLocations = await resp.json();
      this.cache.add(url, locations);
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }


  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<Location>(url);
    if (cached) return cached;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      const location: Location = await resp.json();
      this.cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  }

  
  async fetchPokemon(PokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${PokemonName}`;
    const cached = this.cache.get<Pokemon>(url);
    if (cached) return cached;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      const pokemon: Pokemon = await resp.json();
      this.cache.add(url, pokemon);
      return pokemon;
    } catch (e) {
      throw new Error(
        `Error fetching pokemon '${PokemonName}': ${(e as Error).message}`,
      );
    }
  }
}


export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};


export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};




export type Pokemon = {
  "id": number,
  "name": string,
  "base_experience": number,
  "height": number,
  "is_default": true,
  "order": number,
  "weight": number,
  "abilities": {
      "is_hidden": true,
      "slot": number,
      "ability": {
        "name": string,
        "url": string
      }
  }[];
  "forms": {
      "name": string,
      "url": string
  }[];
  
  "game_indices": {
      "game_index": number,
      "version": {
        "name": string,
        "url": string
      }
  }[];
  "held_items": {
      "item": {
        "name": string,
        "url": string
      },
      "version_details": {
          "rarity": number,
          "version": {
            "name": string,
            "url": string
          }
      }[];
  }[];
  "location_area_encounters": string,
  "moves": {
      "move": {
        "name": string,
        "url": string
      },
      "version_group_details": {
          "level_learned_at": number,
          "version_group": {
            "name": string,
            "url": string
          },
          "move_learn_method": {
            "name": string,
            "url": string
          },
          "order": number
      }[];
  }[];
  "species": {
    "name": string,
    "url": string
  },
  "sprites": {
    "back_default": string,
    "back_female": null,
    "back_shiny": string,
    "back_shiny_female": null,
    "front_default": string,
    "front_female": null,
    "front_shiny": string,
    "front_shiny_female": null,
    "other": {
      "dream_world": {
        "front_default": string,
        "front_female": null
      },
      "home": {
        "front_default": string,
        "front_female": null,
        "front_shiny": string,
        "front_shiny_female": null
      },
      "official-artwork": {
        "front_default": string,
        "front_shiny": string
      },
      "showdown": {
        "back_default": string,
        "back_female": null,
        "back_shiny": string,
        "back_shiny_female": null,
        "front_default": string,
        "front_female": null,
        "front_shiny": string,
        "front_shiny_female": null
      }
    },
    "versions": {
      "generation-i": {
        "red-blue": {
          "back_default": string,
          "back_gray": string,
          "front_default": string,
          "front_gray": string
        },
        "yellow": {
          "back_default": string,
          "back_gray": string,
          "front_default": string,
          "front_gray": string
        }
      },
      "generation-ii": {
        "crystal": {
          "back_default": string,
          "back_shiny": string,
          "front_default": string,
          "front_shiny": string
        },
        "gold": {
          "back_default": string,
          "back_shiny": string,
          "front_default": string,
          "front_shiny": string
        },
        "silver": {
          "back_default": string,
          "back_shiny": string,
          "front_default": string,
          "front_shiny": string
        }
      },
      "generation-iii": {
        "emerald": {
          "front_default": string,
          "front_shiny": string
        },
        "firered-leafgreen": {
          "back_default": string,
          "back_shiny": string,
          "front_default": string,
          "front_shiny": string
        },
        "ruby-sapphire": {
          "back_default": string,
          "back_shiny": string,
          "front_default": string,
          "front_shiny": string
        }
      },
      "generation-iv": {
        "diamond-pearl": {
          "back_default": string,
          "back_female": null,
          "back_shiny": string,
          "back_shiny_female": null,
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        },
        "heartgold-soulsilver": {
          "back_default": string,
          "back_female": null,
          "back_shiny": string,
          "back_shiny_female": null,
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        },
        "platinum": {
          "back_default": string,
          "back_female": null,
          "back_shiny": string,
          "back_shiny_female": null,
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        }
      },
      "generation-v": {
        "black-white": {
          "animated": {
            "back_default": string,
            "back_female": null,
            "back_shiny": string,
            "back_shiny_female": null,
            "front_default": string,
            "front_female": null,
            "front_shiny": string,
            "front_shiny_female": null
          },
          "back_default": string,
          "back_female": null,
          "back_shiny": string,
          "back_shiny_female": null,
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        }
      },
      "generation-vi": {
        "omegaruby-alphasapphire": {
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        },
        "x-y": {
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        }
      },
      "generation-vii": {
        "icons": {
          "front_default": string,
          "front_female": null
        },
        "ultra-sun-ultra-moon": {
          "front_default": string,
          "front_female": null,
          "front_shiny": string,
          "front_shiny_female": null
        }
      },
      "generation-viii": {
        "icons": {
          "front_default": string,
          "front_female": null
        }
      }
    }
  },
  "cries": {
    "latest": string,
    "legacy": string
  },
  "stats": {
      "base_stat": number,
      "effort": number,
      "stat": {
        "name": string,
        "url": string
      }
  }[];
  "types": {
      "slot": number,
      "type": {
        "name": string,
        "url": string
      }
  }[];
  "past_types": {
      "generation": {
        "name": string,
        "url": string
      },
      "types": {
          "slot": number,
          "type": {
            "name": string,
            "url": string
          }
      }[];
  }[];
  "past_abilities": {
      "generation": {
        "name": string,
        "url": string
      },
      "abilities": {
          "ability": null,
          "is_hidden": true,
          "slot": number
      }[];
  }[];
}